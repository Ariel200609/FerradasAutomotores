function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _ts_generator(thisArg, body) {
    var f, y, t, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype), d = Object.defineProperty;
    return d(g, "next", {
        value: verb(0)
    }), d(g, "throw", {
        value: verb(1)
    }), d(g, "return", {
        value: verb(2)
    }), typeof Symbol === "function" && d(g, Symbol.iterator, {
        value: function() {
            return this;
        }
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
import path from 'node:path';
import { importModule, subdebug } from '@sanity/cli-core';
import { fileExists } from '../fileExists.js';
import { MIGRATION_SCRIPT_EXTENSIONS, MIGRATIONS_DIRECTORY } from './constants.js';
var debug = subdebug('migration:resolveMigrationScript');
/**
 * Resolves the potential paths to a migration script.
 * Considers the following paths (where `<ext>` is 'mjs', 'js', 'ts' or 'cjs'):
 *
 * - `<migrationsDir>/<migrationName>.<ext>`
 * - `<migrationsDir>/<migrationName>/index.<ext>`
 *
 * Note that all possible paths are returned, even if the files do not exist.
 * Check the `mod` property to see if a module could actually be loaded.
 *
 * @param workDir - Working directory of the studio
 * @param migrationName - The name of the migration directory to resolve
 * @returns An array of potential migration scripts
 * @internal
 */ export function resolveMigrationScript(workDir, migrationName) {
    return _async_to_generator(function() {
        var locations, results, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, location, _iteratorNormalCompletion1, _didIteratorError1, _iteratorError1, _iterator1, _step1, ext, relativePath, absolutePath, mod, exists, imported, err, err1, err1;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    locations = [
                        migrationName,
                        path.join(migrationName, 'index')
                    ];
                    results = [];
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        16,
                        17,
                        18
                    ]);
                    _iterator = locations[Symbol.iterator]();
                    _state.label = 2;
                case 2:
                    if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                        3,
                        15
                    ];
                    location = _step.value;
                    _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                    _state.label = 3;
                case 3:
                    _state.trys.push([
                        3,
                        12,
                        13,
                        14
                    ]);
                    _iterator1 = MIGRATION_SCRIPT_EXTENSIONS[Symbol.iterator]();
                    _state.label = 4;
                case 4:
                    if (!!(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done)) return [
                        3,
                        11
                    ];
                    ext = _step1.value;
                    relativePath = path.join(MIGRATIONS_DIRECTORY, "".concat(location, ".").concat(ext));
                    absolutePath = path.resolve(workDir, relativePath);
                    mod = void 0;
                    return [
                        4,
                        fileExists(absolutePath)
                    ];
                case 5:
                    exists = _state.sent();
                    if (!exists) {
                        return [
                            3,
                            10
                        ];
                    }
                    _state.label = 6;
                case 6:
                    _state.trys.push([
                        6,
                        8,
                        ,
                        9
                    ]);
                    debug("importing migration from ".concat(absolutePath));
                    return [
                        4,
                        importModule(absolutePath, {
                            default: false
                        })
                    ];
                case 7:
                    imported = _state.sent();
                    // Handle both ESM and CJS default exports
                    mod = imported;
                    return [
                        3,
                        9
                    ];
                case 8:
                    err = _state.sent();
                    debug("error importing migration from ".concat(absolutePath), err);
                    // Ignore MODULE_NOT_FOUND errors, but throw others
                    if (err.code !== 'MODULE_NOT_FOUND' && err.code !== 'ERR_MODULE_NOT_FOUND') {
                        throw new Error("Error loading migration: ".concat(err.message), {
                            cause: err
                        });
                    }
                    return [
                        3,
                        9
                    ];
                case 9:
                    results.push({
                        absolutePath: absolutePath,
                        mod: mod,
                        relativePath: relativePath
                    });
                    _state.label = 10;
                case 10:
                    _iteratorNormalCompletion1 = true;
                    return [
                        3,
                        4
                    ];
                case 11:
                    return [
                        3,
                        14
                    ];
                case 12:
                    err1 = _state.sent();
                    _didIteratorError1 = true;
                    _iteratorError1 = err1;
                    return [
                        3,
                        14
                    ];
                case 13:
                    try {
                        if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                            _iterator1.return();
                        }
                    } finally{
                        if (_didIteratorError1) {
                            throw _iteratorError1;
                        }
                    }
                    return [
                        7
                    ];
                case 14:
                    _iteratorNormalCompletion = true;
                    return [
                        3,
                        2
                    ];
                case 15:
                    return [
                        3,
                        18
                    ];
                case 16:
                    err1 = _state.sent();
                    _didIteratorError = true;
                    _iteratorError = err1;
                    return [
                        3,
                        18
                    ];
                case 17:
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                    return [
                        7
                    ];
                case 18:
                    return [
                        2,
                        results
                    ];
            }
        });
    })();
}
/**
 * Checks whether or not the passed resolved migration script is actually loadable (eg has a default export)
 *
 * @param script - The resolved migration script to check
 * @returns `true` if the script is loadable, `false` otherwise
 * @internal
 */ export function isLoadableMigrationScript(script) {
    if (script.mod === undefined || _type_of(script.mod.default) !== 'object' || script.mod.default === null || Array.isArray(script.mod.default)) {
        return false;
    }
    var mod = script.mod.default;
    return typeof mod.title === 'string' && mod.migrate !== undefined;
}
