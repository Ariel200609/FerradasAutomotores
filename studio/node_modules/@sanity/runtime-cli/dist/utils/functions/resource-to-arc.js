import { stat } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { cwd } from 'node:process';
export async function convertResourceToArcFormat(resource, transpiled) {
    if (!resource.src) {
        throw Error('Missing `resource.src` property');
    }
    // Get stats from file
    const stats = await stat(resolve(cwd(), resource.src));
    // Convert resource.src to arc file path format
    const srcPath = resource.src?.split(sep).join('/');
    const entryDir = stats.isFile() ? srcPath.substring(0, srcPath.lastIndexOf('/')) : srcPath;
    const functionPath = transpiled ? `${entryDir}/.build/function-${resource.name}` : entryDir;
    return `@app
hydrate-function

@events
${resource.name}
  src ${functionPath}
`;
}
