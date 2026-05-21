import { getGlobalCliClient } from '@sanity/cli-core';
import { MEDIA_LIBRARY_ASSET_ASPECT_TYPE_NAME } from '@sanity/types';
export const MEDIA_LIBRARY_API_VERSION = 'v2025-02-19';
async function getMediaLibraryClient() {
    return getGlobalCliClient({
        apiVersion: MEDIA_LIBRARY_API_VERSION,
        requireUser: true
    });
}
/**
 * Delete an aspect from a media library
 * @param options - The options for deleting an aspect
 * @returns A promise that resolves to the deletion response
 *
 * @internal
 */ export async function deleteAspect(options) {
    const { aspectName, mediaLibraryId } = options;
    const client = await getMediaLibraryClient();
    return client.request({
        body: {
            mutations: [
                {
                    delete: {
                        params: {
                            id: aspectName,
                            type: MEDIA_LIBRARY_ASSET_ASPECT_TYPE_NAME
                        },
                        query: `*[_type == $type && _id == $id]`
                    }
                }
            ]
        },
        method: 'POST',
        uri: `/media-libraries/${mediaLibraryId}/mutate`
    });
}
/**
 * Get a list of media libraries for a project
 * @param projectId - The project ID
 * @returns A promise that resolves to the media libraries
 *
 * @internal
 */ export async function getMediaLibraries(projectId) {
    const client = await getMediaLibraryClient();
    const response = await client.request({
        method: 'GET',
        query: {
            projectId
        },
        uri: `/media-libraries`
    });
    return response.data.filter((library)=>library.status === 'active');
}
/**
 * Deploy one or more aspects to a media library
 * @param options - The options for deploying aspects
 * @returns A promise that resolves to the deployment response
 *
 * @internal
 */ export async function deployAspects(options) {
    const { aspects, mediaLibraryId } = options;
    const client = await getMediaLibraryClient();
    return client.request({
        body: {
            mutations: aspects.map((aspect)=>({
                    createOrReplace: aspect
                }))
        },
        method: 'POST',
        uri: `/media-libraries/${mediaLibraryId}/mutate`
    });
}

//# sourceMappingURL=mediaLibraries.js.map