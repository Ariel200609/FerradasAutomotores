/**
 * Runtime-detectable package managers (excludes 'manual' which is a UI-only choice).
 */
export declare type DetectedPackageManager = "bun" | "npm" | "pnpm" | "yarn";

/**
 * Return the CLI invocation command for the detected (or provided) package manager.
 *
 * @param options - Optional `bin` (defaults to `'sanity'`) and `userAgent` override.
 * @returns A string like `"npx sanity"`, `"pnpm exec sanity"`, etc.
 */
export declare function getBinCommand(options?: {
  bin?: string;
  userAgent?: string;
}): string;

/**
 * Convenience wrapper that reads `process.env.npm_config_user_agent` and returns
 * the detected package manager.
 */
export declare function getRunningPackageManager():
  | DetectedPackageManager
  | undefined;

/**
 * Extract the yarn major version from a `npm_config_user_agent` string.
 *
 * @param ua - User-agent string. Defaults to `process.env.npm_config_user_agent`.
 * @returns The major version number, or `undefined` if yarn isn't detected.
 */
export declare function getYarnMajorVersion(ua?: string): number | undefined;

export {};
