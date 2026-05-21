import { getGlobalCliClient } from '@sanity/cli-core';
const TOKENS_API_VERSION = 'v2025-08-18';
/**
 * Add a token to a project
 * @param options - The options for adding a token to a project
 * @returns A promise that resolves to the token response
 *
 * @internal
 */ export async function createToken(options) {
    const { label, projectId, roleName } = options;
    const client = await getGlobalCliClient({
        apiVersion: TOKENS_API_VERSION,
        requireUser: true
    });
    return client.request({
        body: {
            label,
            roleName
        },
        method: 'POST',
        uri: `/projects/${projectId}/tokens`
    });
}
/**
 * Delete a token from a project
 * @param options - The options for deleting a token from a project
 * @returns A promise that resolves when the token is deleted
 *
 * @internal
 */ export async function deleteToken(options) {
    const { projectId, tokenId } = options;
    const client = await getGlobalCliClient({
        apiVersion: TOKENS_API_VERSION,
        requireUser: true
    });
    return client.request({
        method: 'DELETE',
        uri: `/projects/${projectId}/tokens/${tokenId}`
    });
}
/**
 * Get all tokens for a project
 * @param projectId - The project ID
 * @returns A promise that resolves to an array of tokens
 *
 * @internal
 */ export async function getTokens(projectId) {
    const client = await getGlobalCliClient({
        apiVersion: TOKENS_API_VERSION,
        requireUser: true
    });
    return client.request({
        uri: `/projects/${projectId}/tokens`
    });
}
/**
 * Get all roles for a project
 * @param projectId - The project ID
 * @returns A promise that resolves to an array of project roles
 *
 * @internal
 */ export async function getTokenRoles(projectId) {
    const client = await getGlobalCliClient({
        apiVersion: TOKENS_API_VERSION,
        requireUser: true
    });
    return client.request({
        uri: `/projects/${projectId}/roles`
    });
}

//# sourceMappingURL=tokens.js.map