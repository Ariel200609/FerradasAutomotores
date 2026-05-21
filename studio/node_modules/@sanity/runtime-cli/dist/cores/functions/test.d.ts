import type { ReadBlueprintResult } from '../../actions/blueprints/blueprint.js';
import type { CoreConfig, CoreResult } from '../index.js';
export interface FunctionTestOptions extends CoreConfig {
    blueprint: ReadBlueprintResult;
    args: {
        name: string | undefined;
    };
    flags: {
        data?: string;
        event?: string;
        file?: string;
        timeout?: number;
        api?: string;
        dataset?: string;
        'project-id'?: string;
        'organization-id'?: string;
        'document-id'?: string;
        'with-user-token'?: boolean;
        'data-before'?: string;
        'data-after'?: string;
        'file-before'?: string;
        'file-after'?: string;
        'document-id-before'?: string;
        'document-id-after'?: string;
        'media-library-id'?: string;
    };
    error: (message: string, options: object) => void;
    helpText: string;
}
export declare function functionTestCore(options: FunctionTestOptions): Promise<CoreResult>;
