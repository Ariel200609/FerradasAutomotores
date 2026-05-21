import config from '../../config.js';
import { createTracedFetch } from '../../utils/traced-fetch.js';
const { populusApiUrl } = config;
export const projectsApiPath = `${populusApiUrl}v2021-06-07/projects`;
export const orgsApiPath = `${populusApiUrl}v2021-06-07/organizations`;
export async function listProjects({ token, organizationId, logger, }) {
    const fetchFn = createTracedFetch(logger);
    const url = organizationId
        ? `${projectsApiPath}?organizationId=${encodeURIComponent(organizationId)}`
        : projectsApiPath;
    const projectsFetch = await fetchFn(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    const projects = await projectsFetch.json();
    return {
        ok: projectsFetch.ok,
        error: projectsFetch.ok ? null : projects.error?.message,
        projects,
    };
}
export async function groupProjectsByOrganization({ token, logger, }) {
    const fetchFn = createTracedFetch(logger);
    const projectsResponse = await listProjects({ token, logger });
    if (!projectsResponse.ok) {
        return {
            ok: false,
            error: projectsResponse.error,
            organizations: [],
        };
    }
    const orgsFetch = await fetchFn(orgsApiPath, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });
    if (!orgsFetch.ok) {
        return {
            ok: false,
            error: orgsFetch.statusText,
            organizations: [],
        };
    }
    const organizations = await orgsFetch.json();
    const orgsWithProjects = organizations.map(({ name, id }) => {
        const projects = projectsResponse.projects.filter((project) => project.organizationId === id);
        return { organization: { name, id }, projects };
    });
    return {
        ok: true,
        error: null,
        organizations: orgsWithProjects,
    };
}
export async function getProject({ token, scopeId, scopeType, logger, }) {
    if (scopeType !== 'project') {
        throw new Error('Scope type must be project');
    }
    const fetchFn = createTracedFetch(logger);
    const response = await fetchFn(`${projectsApiPath}/${scopeId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });
    const project = await response.json();
    return {
        ok: response.ok,
        error: response.ok ? null : project.error?.message,
        project,
    };
}
