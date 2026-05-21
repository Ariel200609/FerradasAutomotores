import { fileURLToPath, pathToFileURL } from 'node:url';
import { createJiti } from 'jiti';
import { subdebug } from '../debug.js';
const debug = subdebug('importModule');
/**
 * Imports a module using jiti and returns its exports.
 * This is a thin wrapper around tsx to allow swapping out the underlying implementation in the future if needed.
 *
 * @param filePath - Path to the module to import.
 * @param options - Options for the importModule function.
 * @returns The exported module.
 *
 * @internal
 */ export async function importModule(filePath, options = {}) {
    const { default: returnDefault = true, tsconfigPath } = options;
    const jiti = createJiti(import.meta.url, {
        debug: debug.enabled,
        tsconfigPaths: typeof tsconfigPath === 'string' ? tsconfigPath : true
    });
    const fileURL = typeof filePath === 'string' ? pathToFileURL(filePath) : filePath;
    debug(`Loading module: ${fileURLToPath(fileURL)}`, {
        tsconfigPath
    });
    const jitiOptions = {};
    // If the default option is true, add it to the jiti options
    if (returnDefault) {
        jitiOptions.default = true;
    }
    return jiti.import(fileURLToPath(fileURL), jitiOptions);
}

//# sourceMappingURL=importModule.js.map