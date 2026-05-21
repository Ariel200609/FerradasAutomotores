import { readdirSync, statSync } from 'node:fs';
import path from 'node:path';
/**
 * Recursively calculates the total size of a folder, including all nested files and subdirectories.
 */
export const getFolderSize = (folder) => {
    if (!statSync(folder).isDirectory()) {
        throw new Error('Provided path is not a directory');
    }
    let totalSize = 0;
    const fileEntries = readdirSync(folder);
    for (const file of fileEntries) {
        const filePath = path.join(folder.toString(), file);
        const stats = statSync(filePath);
        if (stats.isFile()) {
            totalSize += stats.size;
        }
        else if (stats.isDirectory()) {
            const recursiveSize = getFolderSize(filePath);
            totalSize += recursiveSize;
        }
    }
    return totalSize;
};
