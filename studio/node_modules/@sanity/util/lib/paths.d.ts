import { Path, PathSegment } from "@sanity/types";
declare const FOCUS_TERMINATOR = "$";
declare function get<R>(obj: unknown, path: Path | string): R | undefined;
declare function get<R>(obj: unknown, path: Path | string, defaultValue: R): R;
declare function pathFor(path: Path): Path;
declare function isEqual(path: Path, otherPath: Path): boolean;
declare function numEqualSegments(path: Path, otherPath: Path): number;
declare function isSegmentEqual(segmentA: PathSegment, segmentB: PathSegment): boolean;
declare function hasFocus(focusPath: Path, path: Path): boolean;
declare function hasItemFocus(focusPath: Path, item: PathSegment): boolean;
declare function isExpanded(segment: PathSegment, focusPath: Path): boolean;
declare function startsWith(prefix: Path, path: Path): boolean;
declare function trimLeft(prefix: Path, path: Path): Path;
declare function trimRight(suffix: Path, path: Path): Path;
declare function trimChildPath(path: Path, childPath: Path): Path;
declare function toString(path: Path): string;
declare function _resolveKeyedPath(value: unknown, path: Path): Path;
/**
 * Takes a value and a path that may include numeric indices and attempts to replace numeric indices with keyed paths
 *
 * @param value - any json value
 * @param path - a Path that may include numeric indices
 * @returns a path where numeric indices has been replaced by keyed segments (e.g. `{_key: <key>}`)
 * Will do as good attempt as possible, but in case of missing array items, it will return the best possible match:
 * - `resolveKeyedPath([0, 'bar'], [])` will return [] since array has no value at index 0
 * - `resolveKeyedPath([0, 'foo'], [{_key: 'xyz', 'foo': 'bar'}, {_key: 'abc'}])` will return `[{_key: 'xyz'}, 'foo']` since array has no value at index 0
 * - `resolveKeyedPath([0, 'foo', 'bar'], [{_key: 'xyz'}])` will return `[{_key: 'xyz'}, 'foo', 'bar']` since array has no value at index 0
 * Object keys will be preserved as-is, e.g. `resolveKeyedPath(['foo', 'bar'], undefined)` will return `['foo', 'bar']`
 */
declare function resolveKeyedPath(value: unknown, path: Path): Path;
declare function fromString(path: string): Path;
export { FOCUS_TERMINATOR, _resolveKeyedPath, fromString, get, hasFocus, hasItemFocus, isEqual, isExpanded, isSegmentEqual, numEqualSegments, pathFor, resolveKeyedPath, startsWith, toString, trimChildPath, trimLeft, trimRight };