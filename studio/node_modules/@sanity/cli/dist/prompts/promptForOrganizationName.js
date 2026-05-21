import { input } from '@sanity/cli-core/ux';
import { validateOrganizationName } from '../actions/organizations/validateOrganizationName.js';
export async function promptForOrganizationName(user) {
    return input({
        default: user?.name,
        message: 'Organization name:',
        validate: validateOrganizationName
    });
}

//# sourceMappingURL=promptForOrganizationName.js.map