import { ResolvedCommand } from '../../../baseCommands.js';
export default class EnvListCommand extends ResolvedCommand<typeof EnvListCommand> {
    static needs: readonly ["deployedStack", "blueprint"];
    static summary: string;
    static description: string;
    static args: {
        name: import("@oclif/core/interfaces").Arg<string, Record<string, unknown>>;
    };
    static examples: string[];
    run(): Promise<Record<string, unknown> | undefined>;
}
