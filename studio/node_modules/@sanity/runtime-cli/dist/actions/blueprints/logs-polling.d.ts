import type { Logger } from '../../utils/logger.js';
import type { AuthParams, BlueprintLog } from '../../utils/types.js';
export declare const LOG_POLL_INTERVAL_MS = 725;
export interface LogPollingConfig {
    stackId: string;
    operationId?: string;
    knownIds?: string[];
    auth: AuthParams;
    showBanner?: boolean;
    verbose?: boolean;
    log: Logger;
    onActivity?: () => void;
    onLogEntry?: (log: BlueprintLog) => void;
}
/**
 * Polls the logs list endpoint at a fixed interval and displays new entries.
 * Deduplicates by log ID so no dependency on server timestamps.
 * @returns A cleanup function that stops polling
 */
export declare function setupLogPolling(config: LogPollingConfig): () => void;
