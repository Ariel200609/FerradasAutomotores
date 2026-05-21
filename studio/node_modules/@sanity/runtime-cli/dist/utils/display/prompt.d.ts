import type { Project } from '../../actions/sanity/projects.js';
import type { Logger } from '../logger.js';
import type { ScopeType } from '../types.js';
export declare const BACK: unique symbol;
export type Back = typeof BACK;
export declare function promptForBlueprintType(): Promise<string>;
/**
 * Fetches organizations and prompts the user to pick one (if multiple).
 * Returns the selected organization along with its projects.
 */
export declare function promptForOrganization({ token, knownOrganizationId, logger, allowBack, }: {
    token: string;
    knownOrganizationId?: string;
    logger: Logger;
    allowBack?: boolean;
}): Promise<{
    organization: {
        id: string;
        name: string;
    };
    projects: Project[];
    wasPrompted: boolean;
} | Back>;
/**
 * Asks the user whether to scope a Blueprint to an organization or a project.
 */
export declare function promptForScope({ allowBack, hasProjects, }?: {
    allowBack?: boolean;
    hasProjects?: boolean;
}): Promise<ScopeType | Back>;
/**
 * Prompts the user to pick a project from a pre-fetched list of projects.
 * Use after promptForOrganization when the user chose project scope.
 */
export declare function promptForProjectInOrg({ projects, knownProjectId, logger, allowBack, }: {
    projects: Project[];
    knownProjectId?: string;
    logger?: Logger;
    allowBack?: boolean;
}): Promise<{
    projectId: string;
    displayName: string;
} | Back>;
/**
 * Prompt the user for a Stack after scope has been determined.
 * Can create a new Stack or select an existing one.
 */
export declare function promptForStack({ scopeType, scopeId, token, logger, allowBack, }: {
    scopeType: ScopeType;
    scopeId: string;
    token: string;
    logger: Logger;
    allowBack?: boolean;
}): Promise<{
    stackId: string;
    name: string;
} | Back>;
/**
 * Full wizard: Organization -> Scope -> Project (if project-scoped) -> Stack.
 * Supports back-navigation between steps.
 */
export declare function runScopeAndStackWizard({ token, knownOrganizationId, knownProjectId, logger, }: {
    token: string;
    knownOrganizationId?: string;
    knownProjectId?: string;
    logger: Logger;
}): Promise<{
    scopeType: ScopeType;
    scopeId: string;
    displayName: string;
    stackId: string;
    stackName: string;
}>;
