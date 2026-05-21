import { ResolvedCommand } from '../../../baseCommands.js';
export default class EnvAddCommand extends ResolvedCommand<typeof EnvAddCommand> {
    static needs: readonly ["deployedStack", "blueprint"];
    static summary: string;
    static description: string;
    static args: {
        name: import("@oclif/core/interfaces").Arg<string, Record<string, unknown>>;
        key: import("@oclif/core/interfaces").Arg<string, Record<string, unknown>>;
        value: import("@oclif/core/interfaces").Arg<string, Record<string, unknown>>;
    };
    static examples: string[];
    run(): Promise<Record<string, unknown> | undefined>;
}
