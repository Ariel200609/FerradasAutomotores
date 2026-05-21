import type { ReadBlueprintResult } from '../../actions/blueprints/blueprint.js';
import type { AuthParams, ScopeType, Stack } from '../../utils/types.js';
import type { CoreConfig, CoreResult } from '../index.js';
export interface BlueprintDeployOptions extends CoreConfig {
    auth: AuthParams;
    stackId: string;
    scopeType: ScopeType;
    scopeId: string;
    deployedStack: Stack;
    blueprint: ReadBlueprintResult;
    flags: {
        'fn-installer'?: string;
        'no-wait'?: boolean;
        'new-stack-name'?: string;
        message?: string;
        verbose?: boolean;
    };
}
export declare function blueprintDeployCore(options: BlueprintDeployOptions): Promise<CoreResult>;
