import type { BlueprintConfig, CoreResult } from '../index.js';
export interface BlueprintDestroyOptions extends BlueprintConfig {
    flags: {
        force?: boolean;
        'project-id'?: string;
        'organization-id'?: string;
        stack?: string;
        'no-wait'?: boolean;
        verbose?: boolean;
    };
}
export declare function blueprintDestroyCore(options: BlueprintDestroyOptions): Promise<CoreResult>;
