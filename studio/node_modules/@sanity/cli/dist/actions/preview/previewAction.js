import { gracefulServerDeath } from '../../server/gracefulServerDeath.js';
import { startPreviewServer } from '../../server/previewServer.js';
import { getPreviewServerConfig } from './getPreviewServerConfig.js';
export async function previewAction(options) {
    const { cliConfig, flags, outDir, workDir } = options;
    const config = getPreviewServerConfig({
        cliConfig,
        flags,
        rootDir: outDir,
        workDir
    });
    try {
        const server = await startPreviewServer(config);
        return server;
    } catch (err) {
        throw gracefulServerDeath('preview', config.httpHost, config.httpPort, err);
    }
}

//# sourceMappingURL=previewAction.js.map