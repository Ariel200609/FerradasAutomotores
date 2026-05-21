declare function pathIsEmpty(dir: string): Promise<boolean>;
declare function expandHome(filePath: string): string;
declare function absolutify(dir: string): string;
export { absolutify, expandHome, pathIsEmpty };