import { default as boxen } from "boxen";
import { Options as BoxenOptions } from "boxen";
import { Boxes } from "boxen";
import { CLIError } from "@oclif/core/errors";
import { CustomBorderStyle } from "boxen";
import * as inquirer from "@inquirer/prompts";
import { default as logSymbols } from "log-symbols";
import { Separator } from "@inquirer/prompts";
import { Spacing } from "boxen";
import { Spinner } from "ora";
import { default as spinner } from "ora";
import { Ora as SpinnerInstance } from "ora";
import { Options as SpinnerOptions } from "ora";
import { oraPromise as spinnerPromise } from "ora";
import { PromiseOptions as SpinnerPromiseOptions } from "ora";

export { boxen };

export { BoxenOptions };

export { Boxes };

export declare const checkbox: typeof inquirer.checkbox;

declare const confirm_2: typeof inquirer.confirm;
export { confirm_2 as confirm };

export { CustomBorderStyle };

export declare const editor: typeof inquirer.editor;

export declare const expand: typeof inquirer.expand;

export declare const input: typeof inquirer.input;

export { logSymbols };

/**
 * Error thrown when a prompt is attempted in a non-interactive environment
 * (e.g., CI, non-TTY, piped stdin). Callers can catch this specific error
 * to provide appropriate fallback behavior.
 *
 * Extends `CLIError` to suppress stack traces in user-facing output.
 */
export declare class NonInteractiveError extends CLIError {
  constructor(promptName: string);
}

export declare const number: typeof inquirer.number;

export declare const password: typeof inquirer.password;

export declare const rawlist: typeof inquirer.rawlist;

export declare const search: typeof inquirer.search;

export declare const select: typeof inquirer.select;

export { Separator };

export { Spacing };

export { Spinner };

export { spinner };

export { SpinnerInstance };

export { SpinnerOptions };

export { spinnerPromise };

export { SpinnerPromiseOptions };

export {};
