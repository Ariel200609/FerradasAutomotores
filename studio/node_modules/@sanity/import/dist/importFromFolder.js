import fs from 'node:fs';
import { rm } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import createDebug from 'debug';
import { glob } from 'tinyglobby';
import { readJson } from './util/readJson.js';
const debug = createDebug('sanity:import:folder');
export async function importFromFolder(fromDir, options, importers) {
    debug('Importing from folder %s', fromDir);
    const dataFiles = await glob([
        '*.ndjson'
    ], {
        absolute: true,
        cwd: fromDir
    });
    if (dataFiles.length === 0) {
        throw new Error(`No .ndjson file found in ${fromDir}`);
    }
    if (dataFiles.length > 1) {
        throw new Error(`More than one .ndjson file found in ${fromDir} - only one is supported`);
    }
    const assetMap = await readJson(path.join(fromDir, 'assets.json')).catch(()=>({}));
    const dataFile = dataFiles[0];
    debug('Importing from file %s', dataFile);
    const stream = fs.createReadStream(dataFile);
    const images = await glob('images/*', {
        absolute: true,
        cwd: fromDir
    });
    const files = await glob('files/*', {
        absolute: true,
        cwd: fromDir
    });
    const imageAssets = images.map((imgPath)=>`image#${pathToFileURL(imgPath).href}`);
    const fileAssets = files.map((filePath)=>`file#${pathToFileURL(filePath).href}`);
    const unreferencedAssets = [
        ...imageAssets,
        ...fileAssets
    ];
    debug('Queueing %d assets', unreferencedAssets.length);
    const streamOptions = {
        ...options,
        assetMap,
        assetsBase: fromDir,
        unreferencedAssets
    };
    const result = await importers.fromStream(stream, streamOptions, importers);
    if (options.deleteOnComplete) {
        await rm(fromDir, {
            force: true,
            recursive: true
        });
    }
    return result;
}

//# sourceMappingURL=importFromFolder.js.map