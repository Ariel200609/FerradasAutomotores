import { ORGANIZATION_SCOPED_FUNCTION_TYPES, PROJECT_SCOPED_FUNCTION_TYPES } from '../../constants.js';
/**
 * Resolves the correct auth scope for a function API request.
 *
 * 1. explicit `project` or `organization` on the resource parameters (highest priority)
 * 2. stack's `defaultProjectId` for project-scoped function types in org-scoped stacks
 * 3. pass-through the stack's deployment scope (lowest priority)
 */
export function resolveFunctionAuth(auth, deployedStack, resource) {
    // 1. explicit resource-level scope takes highest priority
    if (typeof resource.parameters.project === 'string') {
        return { ...auth, scopeType: 'project', scopeId: resource.parameters.project };
    }
    if (typeof resource.parameters.organization === 'string') {
        return { ...auth, scopeType: 'organization', scopeId: resource.parameters.organization };
    }
    // 2. project-scoped function types: resolve a project ID or fail
    if (PROJECT_SCOPED_FUNCTION_TYPES.has(resource.type)) {
        if (auth.scopeType === 'project')
            return auth;
        if (deployedStack.defaultProjectId) {
            return { ...auth, scopeType: 'project', scopeId: deployedStack.defaultProjectId };
        }
        throw new Error(`Function "${resource.name}" (${resource.type}) requires project scope, but no project ID could be resolved. ` +
            'Set the `project` attribute on the function resource.');
    }
    // 3. Organization-scoped function types: must be in an org-scoped stack
    if (ORGANIZATION_SCOPED_FUNCTION_TYPES.has(resource.type)) {
        if (auth.scopeType === 'organization')
            return auth;
        throw new Error(`Function "${resource.name}" (${resource.type}) requires organization scope, ` +
            'but the current blueprint is project-scoped.');
    }
    // 4. Unknown type; pass it along (don't break on future types)
    return auth;
}
