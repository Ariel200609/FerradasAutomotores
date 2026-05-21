import { getGlobalCliClient } from '@sanity/cli-core';
export const ORGANIZATIONS_API_VERSION = 'v2025-05-14';
/**
 * List all organizations the user has access to
 */ export async function listOrganizations(query) {
    const client = await getGlobalCliClient({
        apiVersion: ORGANIZATIONS_API_VERSION,
        requireUser: true
    });
    return client.request({
        query,
        uri: '/organizations'
    });
}
/**
 * Create a new organization
 */ export async function createOrganization(name) {
    const client = await getGlobalCliClient({
        apiVersion: ORGANIZATIONS_API_VERSION,
        requireUser: true
    });
    return client.request({
        body: {
            name
        },
        method: 'post',
        uri: '/organizations'
    });
}
/**
 * Get organization grants for a specific organization
 */ export async function getOrganizationGrants(organizationId) {
    const client = await getGlobalCliClient({
        apiVersion: ORGANIZATIONS_API_VERSION,
        requireUser: true
    });
    return client.request({
        uri: `/organizations/${organizationId}/grants`
    });
}

//# sourceMappingURL=organizations.js.map