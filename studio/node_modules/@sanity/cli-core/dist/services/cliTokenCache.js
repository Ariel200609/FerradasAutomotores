/**
 * Module-level cache for the CLI auth token, shared between
 * `getCliToken` (reads/writes) and `setCliUserConfig` (invalidates).
 *
 * Extracted into its own module to avoid a circular dependency
 * between `cliUserConfig.ts` and `getCliToken.ts`.
 */ let cachedToken;
export function getCachedToken() {
    return cachedToken;
}
export function setCachedToken(token) {
    cachedToken = token;
}
/**
 * Clear the in-process token cache so the next `getCliToken()` call
 * re-reads from disk or the environment.
 *
 * Called automatically by `setCliUserConfig('authToken', ...)`.
 *
 * @internal
 */ export function clearCliTokenCache() {
    cachedToken = undefined;
}

//# sourceMappingURL=cliTokenCache.js.map