/**
 * Patterns matched against ERROR/FATAL log entries during streaming operations
 * like deploy and destroy. Each entry is a [regex, suggestionFactory] tuple.
 *
 * Add new patterns here -- no other code changes required.
 */
export const HINT_PATTERNS = [
    [
        // tester
        /\[TEST\] '(.+)' TEST/,
        (match) => [`TEST SUGGESTION for '${match[1]}'.`],
    ],
    [
        // Function requires organization scope
        /must be attached to an organization scoped stack/,
        (_match, bin) => [
            `Run \`npx ${bin} blueprints promote\` to move from project to organization scope.`,
        ],
    ],
];
/**
 * Creates a collector to create suggestions
 * Use getSuggestions() after all logs are inspected
 */
export function createHintCollector(bin) {
    const collected = [];
    return {
        /** Check a log entry against hint patterns; only ERROR/FATAL levels are inspected. */
        inspectLog(log) {
            const level = log.level.toUpperCase();
            if (level !== 'ERROR' && level !== 'FATAL')
                return;
            this.inspectMessage(log.message);
        },
        inspectMessage(message) {
            for (const [pattern, factory] of HINT_PATTERNS) {
                const match = message.match(pattern);
                if (match) {
                    collected.push(...factory(match, bin));
                    break; // first matching pattern wins per entry
                }
            }
        },
        /** Return unique collected suggestions. */
        getSuggestions() {
            return [...new Set(collected)];
        },
    };
}
