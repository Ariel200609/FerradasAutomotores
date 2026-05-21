import type { FunctionResource, InstallerType } from '../types.js';
export declare function resolveResourceDependencies(resource: FunctionResource, { transpiled, installer, }: {
    transpiled: boolean;
    installer?: InstallerType;
}): Promise<void>;
