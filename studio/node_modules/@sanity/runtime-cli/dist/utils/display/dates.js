function toDate(input) {
    return input instanceof Date ? input : new Date(input);
}
export function formatDate(input) {
    const d = toDate(input);
    if (Number.isNaN(d.getTime()))
        return '';
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}
export function formatTime(input) {
    const d = toDate(input);
    if (Number.isNaN(d.getTime()))
        return '';
    const h = String(d.getHours()).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    return `${h}:${m}:${s}`;
}
export function formatDateTime(input) {
    const d = toDate(input);
    if (Number.isNaN(d.getTime()))
        return '';
    return `${formatDate(d)} ${formatTime(d)}`;
}
export function formatDuration(startDate, endDate) {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    if (start > end)
        return 'Invalid duration';
    const durationMs = end - start;
    if (durationMs < 1000)
        return `${durationMs}ms`;
    if (durationMs < 60000)
        return `${Math.round(durationMs / 1000)}s`;
    if (durationMs < 3600000) {
        const minutes = Math.floor(durationMs / 60000);
        const seconds = Math.floor((durationMs % 60000) / 1000);
        return `${minutes}m ${seconds}s`;
    }
    const hours = Math.floor(durationMs / 3600000);
    const minutes = Math.floor((durationMs % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
}
