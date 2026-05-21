import { getGlobalCliClient } from '@sanity/cli-core';
export const CORS_API_VERSION = 'v2025-08-14';
export async function createCorsOrigin({ allowCredentials, origin, projectId }) {
    const client = await getGlobalCliClient({
        apiVersion: CORS_API_VERSION,
        requireUser: true
    });
    return client.request({
        body: {
            allowCredentials,
            origin
        },
        maxRedirects: 0,
        method: 'POST',
        uri: `/projects/${projectId}/cors`
    });
}
export async function deleteCorsOrigin({ originId, projectId }) {
    const client = await getGlobalCliClient({
        apiVersion: CORS_API_VERSION,
        requireUser: true
    });
    return client.request({
        method: 'DELETE',
        uri: `/projects/${projectId}/cors/${originId}`
    });
}
export async function listCorsOrigins(projectId) {
    const client = await getGlobalCliClient({
        apiVersion: CORS_API_VERSION,
        requireUser: true
    });
    return client.request({
        uri: `/projects/${projectId}/cors`
    });
}

//# sourceMappingURL=cors.js.map