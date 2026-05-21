import type { AssetPrepResult, FunctionResource, InstallerType } from '../types.js';
export declare function prepareAsset({ resource, }: {
    resource: FunctionResource;
}, { installer }?: {
    installer?: InstallerType;
}): Promise<AssetPrepResult>;
