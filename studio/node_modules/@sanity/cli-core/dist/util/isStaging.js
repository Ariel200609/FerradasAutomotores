/**
 * Checks if the environment is staging.
 *
 * @returns True if the environment is staging, false otherwise
 * @internal
 */ export function isStaging() {
    return process.env.SANITY_INTERNAL_ENV === 'staging';
}

//# sourceMappingURL=isStaging.js.map