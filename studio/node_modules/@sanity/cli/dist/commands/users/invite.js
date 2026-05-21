import { Args, Flags } from '@oclif/core';
import { SanityCommand, subdebug } from '@sanity/cli-core';
import { input, select } from '@sanity/cli-core/ux';
import { validateEmail } from '../../actions/users/validateEmail.js';
import { promptForProject } from '../../prompts/promptForProject.js';
import { getProjectRoles, inviteUser } from '../../services/projects.js';
import { getProjectIdFlag } from '../../util/sharedFlags.js';
const QUOTA_ERROR_MESSAGE = 'Project is already at user quota, add billing details to the project in order to allow overage charges.';
const usersInviteDebug = subdebug('users:invite');
export class UsersInviteCommand extends SanityCommand {
    static args = {
        email: Args.string({
            description: 'Email address to invite',
            required: false
        })
    };
    static description = 'Invite a new user to the project';
    static examples = [
        {
            command: '<%= config.bin %> <%= command.id %>',
            description: 'Invite a new user to the project (prompt for details)'
        },
        {
            command: '<%= config.bin %> <%= command.id %> pippi@sanity.io',
            description: 'Send a new user invite to the email "pippi@sanity.io", prompt for role'
        },
        {
            command: '<%= config.bin %> <%= command.id %> pippi@sanity.io --role administrator',
            description: 'Send a new user invite to the email "pippi@sanity.io", as administrator'
        },
        {
            command: '<%= config.bin %> <%= command.id %> pippi@sanity.io --project-id abc123',
            description: 'Invite a user to a specific project'
        }
    ];
    static flags = {
        ...getProjectIdFlag({
            description: 'Project ID to invite user to',
            semantics: 'override'
        }),
        role: Flags.string({
            description: 'Role to invite the user as',
            required: false
        })
    };
    static hiddenAliases = [
        'user:invite'
    ];
    async run() {
        const { email: selectedEmail } = this.args;
        const { role: selectedRole } = this.flags;
        const projectId = await this.getProjectId({
            fallback: ()=>promptForProject({
                    requiredPermissions: [
                        {
                            grant: 'read',
                            permission: 'sanity.project.roles'
                        },
                        {
                            grant: 'invite',
                            permission: 'sanity.project.members'
                        }
                    ]
                })
        });
        let roles;
        try {
            roles = (await getProjectRoles(projectId)).filter((role)=>role.appliesToUsers);
        } catch (error) {
            usersInviteDebug('Error fetching roles', error);
            this.error('Error fetching roles', {
                exit: 1
            });
        }
        const email = selectedEmail || await this.promptForEmail();
        const roleSelection = selectedRole || await this.promptForRole(roles);
        const role = roles.find(({ name })=>name.toLowerCase() === roleSelection.toLowerCase());
        if (!role) {
            this.error(`Role name "${roleSelection}" not found. Available roles: ${roles.map((r)=>r.name).join(', ')}`, {
                exit: 1
            });
        }
        try {
            await inviteUser({
                email,
                projectId,
                role: role.name
            });
            this.log(`Invitation sent to ${email}`);
        } catch (error) {
            usersInviteDebug(`Error inviting user`, error);
            if (error.statusCode === 402) {
                this.error(QUOTA_ERROR_MESSAGE, {
                    exit: 1
                });
            }
            this.error(`Error inviting user`, {
                exit: 1
            });
        }
    }
    async promptForEmail() {
        return input({
            message: 'Email to invite:',
            transformer: (val)=>val.trim(),
            validate: validateEmail
        });
    }
    async promptForRole(roles) {
        return select({
            choices: roles.map((role)=>({
                    name: `${role.title} (${role.description || 'No description'})`,
                    value: role.name
                })),
            message: 'Which role should the user have?'
        });
    }
}

//# sourceMappingURL=invite.js.map