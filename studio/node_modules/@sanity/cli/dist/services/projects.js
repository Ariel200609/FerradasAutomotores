import { debug, getGlobalCliClient, getProjectCliClient } from '@sanity/cli-core';
export const PROJECTS_API_VERSION = '2025-09-22';
export const CREATE_PROJECT_API_VERSION = 'v2025-05-14';
/**
 * Create a new Sanity project
 */ export async function createProject(options) {
    const client = await getGlobalCliClient({
        apiVersion: CREATE_PROJECT_API_VERSION,
        requireUser: true
    });
    try {
        const response = await client.request({
            body: {
                ...options,
                metadata: {
                    ...options?.metadata,
                    integration: 'cli'
                }
            },
            method: 'POST',
            uri: '/projects'
        });
        return {
            displayName: options.displayName || '',
            projectId: response.projectId || response.id
        };
    } catch (err) {
        debug('Error creating project', err);
        throw err;
    }
}
export async function getProjectById(projectId) {
    const client = await getProjectCliClient({
        apiVersion: PROJECTS_API_VERSION,
        projectId,
        requireUser: true
    });
    return client.projects.getById(projectId);
}
export async function getProjectRoles(projectId) {
    const client = await getGlobalCliClient({
        apiVersion: PROJECTS_API_VERSION,
        requireUser: true
    });
    return client.request({
        uri: `/projects/${projectId}/roles`
    });
}
export async function inviteUser({ email, projectId, role }) {
    const client = await getGlobalCliClient({
        apiVersion: PROJECTS_API_VERSION,
        requireUser: true
    });
    return client.request({
        body: {
            email,
            role
        },
        maxRedirects: 0,
        method: 'POST',
        uri: `/invitations/project/${projectId}`,
        useGlobalApi: true
    });
}
export async function listProjects({ onlyExplicitMembership = true } = {}) {
    const client = await getGlobalCliClient({
        apiVersion: PROJECTS_API_VERSION,
        requireUser: true
    });
    return client.projects.list({
        onlyExplicitMembership
    });
}
export async function getProjectInvites(projectId) {
    const client = await getGlobalCliClient({
        apiVersion: PROJECTS_API_VERSION,
        requireUser: true
    });
    return client.request({
        uri: `/invitations/project/${projectId}`
    });
}
export async function updateProjectInitializedAt(projectId) {
    const client = await getProjectCliClient({
        apiVersion: PROJECTS_API_VERSION,
        projectId,
        requireUser: true
    });
    const project = await client.request({
        uri: `/projects/${projectId}`
    });
    if (!project?.metadata?.cliInitializedAt) {
        await client.request({
            body: {
                metadata: {
                    cliInitializedAt: new Date().toISOString()
                }
            },
            method: 'PATCH',
            uri: `/projects/${projectId}`
        });
    }
}
export async function updateProjectInitalTemplate(projectId, templateName) {
    const client = await getProjectCliClient({
        apiVersion: PROJECTS_API_VERSION,
        projectId,
        requireUser: true
    });
    await client.request({
        body: {
            metadata: {
                initialTemplate: templateName
            }
        },
        method: 'PATCH',
        uri: `/projects/${projectId}`
    });
}

//# sourceMappingURL=projects.js.map