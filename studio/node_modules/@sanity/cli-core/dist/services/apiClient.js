import { styleText } from 'node:util';
import { createClient, requester as defaultRequester, isHttpError } from '@sanity/client';
import { generateHelpUrl } from '../util/generateHelpUrl.js';
import { getCliToken } from './getCliToken.js';
const apiHosts = {
    staging: 'https://api.sanity.work'
};
const CLI_REQUEST_TAG_PREFIX = 'sanity.cli';
/**
 * Create a "global" (unscoped) Sanity API client.
 *
 * @public
 *
 * @param options - The options to use for the client.
 * @returns Promise that resolves to a configured Sanity API client.
 */ export async function getGlobalCliClient({ requireUser, token: providedToken, unauthenticated, ...config }) {
    const requester = defaultRequester.clone();
    requester.use(authErrors());
    const sanityEnv = process.env.SANITY_INTERNAL_ENV || 'production';
    const apiHost = apiHosts[sanityEnv];
    // Use the provided token if set, otherwise fall back to the stored CLI token (unless unauthenticated)
    const token = providedToken || (unauthenticated ? undefined : await getCliToken());
    // If the token is not set and requireUser is true, throw an error
    if (!token && requireUser) {
        throw new Error('You must login first - run "sanity login"');
    }
    return createClient({
        ...apiHost ? {
            apiHost
        } : {},
        // Suppress browser token warning since we mock browser environment in workers
        ignoreBrowserTokenWarning: true,
        requester,
        requestTagPrefix: CLI_REQUEST_TAG_PREFIX,
        token,
        useCdn: false,
        useProjectHostname: false,
        ...config
    });
}
/**
 * Create a "project" (scoped) Sanity API client.
 *
 * @public
 *
 * @param options - The options to use for the client.
 * @returns Promise that resolves to a configured Sanity API client.
 */ export async function getProjectCliClient({ requireUser, token: providedToken, ...config }) {
    const requester = defaultRequester.clone();
    requester.use(authErrors());
    const sanityEnv = process.env.SANITY_INTERNAL_ENV || 'production';
    const apiHost = apiHosts[sanityEnv];
    // Use the provided token if it is set, otherwise get the token from the config file
    const token = providedToken || await getCliToken();
    // If the token is not set and requireUser is true, throw an error
    if (!token && requireUser) {
        throw new Error('You must login first - run "sanity login"');
    }
    return createClient({
        ...apiHost ? {
            apiHost
        } : {},
        // Suppress browser token warning since we mock browser environment in workers
        ignoreBrowserTokenWarning: true,
        requester,
        requestTagPrefix: CLI_REQUEST_TAG_PREFIX,
        token,
        useCdn: false,
        useProjectHostname: true,
        ...config
    });
}
/**
 * `get-it` middleware that checks for 401 authentication errors and extends the error with more
 * helpful guidance on what to do next.
 *
 * @returns get-it middleware with `onError` handler
 * @internal
 */ function authErrors() {
    return {
        onError: (err)=>{
            if (!err || !isReqResError(err)) {
                return err;
            }
            const statusCode = isHttpError(err) && err.response.body.statusCode;
            if (statusCode === 401) {
                err.message = `${err.message}. You may need to login again with ${styleText('cyan', 'sanity login')}.\nFor more information, see ${generateHelpUrl('cli-errors')}.`;
            }
            return err;
        }
    };
}
function isReqResError(err) {
    return Object.prototype.hasOwnProperty.call(err, 'response');
}

//# sourceMappingURL=apiClient.js.map