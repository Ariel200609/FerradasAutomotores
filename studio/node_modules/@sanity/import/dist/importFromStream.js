import os from 'node:os';
import path from 'node:path';
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import createDebug from 'debug';
import gunzipMaybe from 'gunzip-maybe';
import tar from 'tar-fs';
import { glob } from 'tinyglobby';
import { getJsonStreamer } from './util/getJsonStreamer.js';
import { isTar } from './util/isTar.js';
const debug = createDebug('sanity:import:stream');
// StreamRouter handles the peek functionality and routes to appropriate handler
class StreamRouter extends Transform {
    firstChunk = null;
    isTarFile = false;
    jsonDocuments = [];
    options;
    outputPath;
    targetStream = null;
    constructor(outputPath, options){
        super();
        this.outputPath = outputPath;
        this.options = options;
    }
    get documents() {
        return this.jsonDocuments;
    }
    get isTar() {
        return this.isTarFile;
    }
    _flush(callback) {
        if (this.targetStream) {
            this.targetStream.end();
            this.targetStream.on('finish', callback);
            this.targetStream.on('error', callback);
        } else {
            callback();
        }
    }
    _transform(chunk, _encoding, callback) {
        if (!this.firstChunk) {
            this.firstChunk = chunk;
            // Determine file type from first chunk
            if (isTar(chunk)) {
                debug('Stream is a tarball, extracting to %s', this.outputPath);
                this.isTarFile = true;
                // tar.extract returns a writable stream for extracting files
                this.targetStream = tar.extract(this.outputPath);
            } else {
                debug('Stream is an ndjson file, streaming JSON');
                this.isTarFile = false;
                const jsonStreamer = getJsonStreamer({
                    allowReplacementCharacters: this.options.allowReplacementCharacters
                });
                this.targetStream = jsonStreamer;
                // Collect documents as they're parsed
                jsonStreamer.on('data', (doc)=>{
                    this.jsonDocuments.push(doc);
                });
            }
            // Set up error handling
            if (this.targetStream) {
                this.targetStream.on('error', (err)=>{
                    this.emit('error', err);
                });
            }
        }
        if (this.targetStream) {
            const written = this.targetStream.write(chunk);
            if (written) {
                callback();
            } else {
                this.targetStream.once('drain', callback);
            }
        } else {
            callback(new Error('Target stream not initialized'));
        }
    }
}
export async function importFromStream(stream, options, importers) {
    const slugDate = new Date().toISOString().replaceAll(/[^a-z0-9]/gi, '-').toLowerCase();
    const outputPath = path.join(os.tmpdir(), `sanity-import-${slugDate}`);
    debug('Importing from stream');
    const router = new StreamRouter(outputPath, options);
    try {
        // gunzipMaybe is an untyped library
        await pipeline(stream, gunzipMaybe(), router);
        if (router.isTar) {
            return await findAndImportFromTar(outputPath, options, importers);
        }
        return await importers.fromArray(router.documents, options);
    } catch (err) {
        throw err instanceof Error ? err : new Error(String(err));
    }
}
async function findAndImportFromTar(outputPath, options, importers) {
    debug('Tarball extracted, looking for ndjson');
    const files = await glob([
        '**/*.ndjson'
    ], {
        absolute: true,
        cwd: outputPath,
        deep: 2
    });
    if (files.length === 0) {
        throw new Error('ndjson-file not found in tarball');
    }
    const importBaseDir = path.dirname(files[0]);
    return importers.fromFolder(importBaseDir, {
        ...options,
        deleteOnComplete: true
    }, importers);
}

//# sourceMappingURL=importFromStream.js.map