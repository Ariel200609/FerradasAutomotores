export function isInteractive() {
    return Boolean(process.stdin.isTTY) && process.env.TERM !== 'dumb' && !('CI' in process.env);
}

//# sourceMappingURL=isInteractive.js.map