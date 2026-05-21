import { confirm, input, Separator, select } from '@inquirer/prompts';
import { createEmptyStack, listStacks } from '../../actions/blueprints/stacks.js';
import { groupProjectsByOrganization } from '../../actions/sanity/projects.js';
import { styleText } from '../style-text.js';
import { niceId } from './presenters.js';
// --- Wizard infrastructure ---
export const BACK = Symbol('back');
/**
 * Runs a sequence of prompt steps with back-navigation support.
 * Each step can return BACK to go to the previous non-skipped step.
 * When going back, stale results from the current step onward are cleared.
 */
async function runWizard(steps) {
    const results = {};
    let i = 0;
    while (i < steps.length) {
        const step = steps[i];
        if (step.shouldSkip?.(results)) {
            i++;
            continue;
        }
        const answer = await step.prompt(results);
        if (answer === BACK) {
            if (i === 0) {
                // Cannot go back from the first step; re-prompt it
                continue;
            }
            // Walk back to the previous non-skipped step
            do {
                i--;
            } while (i > 0 && steps[i].shouldSkip?.(results));
            // Erase 2 lines: the "← Back" answer line and the previous step's
            // answered prompt. Back is only offered on steps where the previous
            // step rendered a prompt, so this is always correct.
            process.stdout.write('\x1b[1A\x1b[2K\x1b[1A\x1b[2K');
            // Clear stale results from this step forward
            for (let j = i; j < steps.length; j++) {
                delete results[steps[j].key];
            }
            continue;
        }
        results[step.key] = answer;
        i++;
    }
    return results;
}
/**
 * Appends a "Back" choice to a list of select choices.
 * Skipped for the first step in a wizard (nowhere to go back to).
 */
function withBackChoice(choices, allowBack) {
    if (!allowBack)
        return choices;
    return [
        ...choices,
        { name: styleText('dim', '\u2190 Back'), value: BACK, description: 'Return to previous step' },
    ];
}
// --- Standalone prompts ---
export async function promptForBlueprintType() {
    return await select({
        message: 'Choose a Blueprint file type:',
        choices: [
            { name: 'TypeScript', value: 'ts' },
            { name: 'JavaScript', value: 'js' },
            { name: 'JSON', value: 'json' },
        ],
        default: 'ts',
    });
}
// --- Composable prompt functions for scope selection ---
/**
 * Fetches organizations and prompts the user to pick one (if multiple).
 * Returns the selected organization along with its projects.
 */
export async function promptForOrganization({ token, knownOrganizationId, logger, allowBack = false, }) {
    const spinner = logger.ora('Loading organizations...').start();
    const { ok, error, organizations } = await groupProjectsByOrganization({ token, logger });
    spinner.stop();
    if (!ok) {
        throw new Error(error ?? 'Unknown error listing organizations');
    }
    if (organizations.length === 0) {
        throw new Error('No Sanity organizations found. Use `npx sanity init` to create a project.');
    }
    let picked;
    let wasPrompted = false;
    if (organizations.length > 1) {
        wasPrompted = true;
        const orgChoices = organizations.map(({ organization, projects }) => {
            const projectCount = projects?.length ?? 0;
            return {
                name: `"${organization.name}" ${niceId(organization.id)}`,
                value: organization.id,
                description: `${projectCount} ${projectCount === 1 ? 'project' : 'projects'}`,
            };
        });
        const pickedOrgId = await select({
            message: 'Which organization would you like to use?',
            choices: withBackChoice(orgChoices, allowBack),
            default: knownOrganizationId,
        });
        if (pickedOrgId === BACK)
            return BACK;
        const pickedOrg = organizations.find((o) => o.organization.id === pickedOrgId);
        if (!pickedOrg) {
            throw new Error('No organization found with the given ID');
        }
        picked = pickedOrg;
    }
    else {
        picked = organizations[0];
        logger(`Using organization "${picked.organization.name}" ${niceId(picked.organization.id)}`);
    }
    return {
        organization: picked.organization,
        projects: picked.projects ?? [],
        wasPrompted,
    };
}
/**
 * Asks the user whether to scope a Blueprint to an organization or a project.
 */
export async function promptForScope({ allowBack = false, hasProjects = true, } = {}) {
    const choices = [
        {
            name: 'Organization',
            value: 'organization',
            description: 'Manage resources across all projects in the organization',
        },
        {
            name: 'Project',
            value: 'project',
            description: 'Manage resources within a single project',
            disabled: hasProjects ? false : '(no projects in this organization)',
        },
    ];
    const answer = await select({
        message: 'How would you like to scope your Blueprint?',
        choices: withBackChoice(choices, allowBack),
        default: 'organization',
    });
    return answer;
}
/**
 * Prompts the user to pick a project from a pre-fetched list of projects.
 * Use after promptForOrganization when the user chose project scope.
 */
export async function promptForProjectInOrg({ projects, knownProjectId, logger, allowBack = false, }) {
    if (projects.length === 0) {
        throw new Error('No projects found in this organization.');
    }
    const projectChoices = projects.map(({ displayName, id: projectId }) => ({
        name: `"${displayName}" ${niceId(projectId)}`,
        value: projectId,
    }));
    let pickedProjectId;
    if (projectChoices.length === 1 && !allowBack) {
        // Single-project confirm only when not in wizard (wizard has Back for navigation)
        const onlyProject = projectChoices[0];
        const confirmed = await confirm({
            message: `Found 1 project in this organization. Use ${onlyProject.name}?`,
            default: true,
        });
        if (confirmed) {
            pickedProjectId = onlyProject.value;
            logger?.(`Using project ${onlyProject.name}`);
        }
        else {
            throw new Error('No project selected');
        }
    }
    else {
        const answer = await select({
            message: 'Choose a Sanity project:',
            choices: withBackChoice(projectChoices, allowBack),
            default: knownProjectId,
        });
        if (answer === BACK)
            return BACK;
        pickedProjectId = answer;
    }
    const pickedProject = projects.find((p) => p.id === pickedProjectId);
    if (!pickedProject)
        throw new Error('Project not found');
    return { projectId: pickedProject.id, displayName: pickedProject.displayName };
}
/**
 * Prompt the user for a Stack after scope has been determined.
 * Can create a new Stack or select an existing one.
 */
export async function promptForStack({ scopeType, scopeId, token, logger, allowBack = false, }) {
    if (!scopeId) {
        throw new Error(`Cannot list Stacks: no ${scopeType} ID provided. ` +
            'Provide --project-id or --organization-id, or select a scope in the wizard.');
    }
    const spinner = logger.ora('Loading Stacks...').start();
    const { ok: stacksOk, error: stacksErr, stacks, } = await listStacks({ token, scopeType, scopeId }, logger);
    spinner.stop();
    if (!stacksOk) {
        const scopeLabel = scopeType === 'organization' ? 'organization' : 'project';
        throw new Error(stacksErr || `Failed to list Stacks for ${scopeLabel} "${scopeId}".`);
    }
    const NEW_STACK_ID = 'new';
    let pickedStackId = NEW_STACK_ID;
    if (stacks.length === 0) {
        logger('No existing Stacks found. Creating a new one.');
    }
    if (stacks.length > 0) {
        const stackChoices = [
            new Separator(styleText('underline', 'Create a new Stack:')),
            { name: styleText('bold', 'New Stack'), value: NEW_STACK_ID },
            new Separator(styleText('underline', 'Use an existing Stack:')),
            ...stacks.map((s) => ({
                name: `"${s.name}" ${niceId(s.id)} ${styleText('dim', `(${s.resourceCount} ${s.resourceCount === 1 ? 'resource' : 'resources'})`)}`,
                value: s.id,
            })),
        ];
        if (allowBack) {
            stackChoices.push(new Separator(), {
                name: styleText('dim', '\u2190 Back'),
                value: BACK,
                description: 'Return to previous step',
            });
        }
        const answer = await select({
            message: 'Select a deployment Stack:',
            choices: stackChoices,
            default: NEW_STACK_ID,
        });
        if (answer === BACK)
            return BACK;
        pickedStackId = answer;
    }
    else if (allowBack) {
        const proceed = await select({
            message: 'No existing Stacks. Create a new one?',
            choices: withBackChoice([{ name: 'Yes, create a new Stack', value: 'yes' }], allowBack),
        });
        if (proceed === BACK)
            return BACK;
    }
    if (pickedStackId === NEW_STACK_ID) {
        const stackName = await input({
            message: 'Enter a name for your new Stack:',
            validate: (val) => val.length > 0 || 'Stack name is required',
        });
        const stack = await createEmptyStack({
            token,
            scopeType,
            scopeId,
            name: stackName,
            logger,
        });
        return { stackId: stack.id, name: stackName };
    }
    const pickedStack = stacks.find((s) => s.id === pickedStackId);
    if (!pickedStack)
        throw new Error('Stack not found');
    return { stackId: pickedStack.id, name: pickedStack.name };
}
/**
 * Full wizard: Organization -> Scope -> Project (if project-scoped) -> Stack.
 * Supports back-navigation between steps.
 */
export async function runScopeAndStackWizard({ token, knownOrganizationId, knownProjectId, logger, }) {
    const steps = [
        {
            key: 'organization',
            prompt: async () => {
                return await promptForOrganization({
                    token,
                    knownOrganizationId,
                    logger,
                    // First step -- no back
                });
            },
        },
        {
            key: 'scopeType',
            prompt: async (results) => {
                const orgResult = results.organization;
                return await promptForScope({
                    allowBack: orgResult.wasPrompted,
                    hasProjects: orgResult.projects.length > 0,
                });
            },
        },
        {
            key: 'project',
            shouldSkip: (results) => results.scopeType === 'organization',
            prompt: async (results) => {
                const orgResult = results.organization;
                if (!orgResult)
                    throw new Error('Organization not resolved');
                return await promptForProjectInOrg({
                    projects: orgResult.projects,
                    knownProjectId,
                    logger,
                    allowBack: true,
                });
            },
        },
        {
            key: 'stack',
            prompt: async (results) => {
                const scopeType = results.scopeType;
                if (!scopeType)
                    throw new Error('Scope type not resolved');
                let scopeId;
                if (scopeType === 'organization') {
                    const orgResult = results.organization;
                    scopeId = orgResult.organization.id;
                }
                else {
                    const project = results.project;
                    scopeId = project.projectId;
                }
                return await promptForStack({
                    scopeType,
                    scopeId,
                    token,
                    logger,
                    allowBack: true,
                });
            },
        },
    ];
    const result = await runWizard(steps);
    const orgResult = result.organization;
    const scopeType = result.scopeType;
    const stack = result.stack;
    let scopeId;
    let displayName;
    if (scopeType === 'organization') {
        scopeId = orgResult.organization.id;
        displayName = orgResult.organization.name;
    }
    else {
        const project = result.project;
        scopeId = project.projectId;
        displayName = project.displayName;
    }
    return {
        scopeType,
        scopeId,
        displayName,
        stackId: stack.stackId,
        stackName: stack.name,
    };
}
