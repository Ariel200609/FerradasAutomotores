import { type PathLike } from 'node:fs';
/**
 * Recursively calculates the total size of a folder, including all nested files and subdirectories.
 */
export declare const getFolderSize: (folder: PathLike) => number;
