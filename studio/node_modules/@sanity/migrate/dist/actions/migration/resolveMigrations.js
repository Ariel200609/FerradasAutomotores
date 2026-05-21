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
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { MIGRATION_SCRIPT_EXTENSIONS, MIGRATIONS_DIRECTORY } from '../../utils/migration/constants.js';
import { isLoadableMigrationScript, resolveMigrationScript } from '../../utils/migration/resolveMigrationScript.js';
/**
 * Removes migration script extensions from a filename
 *
 * @param fileName - The filename to process
 * @returns The filename without the extension
 * @internal
 */ function removeMigrationScriptExtension(fileName) {
    // Remove `.ts`, `.js` etc from the end of a filename
    var ext = MIGRATION_SCRIPT_EXTENSIONS.find(function(e) {
        return fileName.endsWith(".".concat(e));
    });
    return ext ? path.basename(fileName, ".".concat(ext)) : fileName;
}
/**
 * Resolves all migrations in the studio working directory
 *
 * @param workDir - The studio working directory
 * @returns Array of migrations and their respective paths
 * @internal
 */ export function resolveMigrations(workDir) {
    return _async_to_generator(function() {
        var migrationsDir, migrationEntries, migrations, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, entry, entryName, candidates, _iteratorNormalCompletion1, _didIteratorError1, _iteratorError1, _iterator1, _step1, candidate, err;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    migrationsDir = path.join(workDir, MIGRATIONS_DIRECTORY);
                    return [
                        4,
                        readdir(migrationsDir, {
                            withFileTypes: true
                        })
                    ];
                case 1:
                    migrationEntries = _state.sent();
                    migrations = [];
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    _state.label = 2;
                case 2:
                    _state.trys.push([
                        2,
                        7,
                        8,
                        9
                    ]);
                    _iterator = migrationEntries[Symbol.iterator]();
                    _state.label = 3;
                case 3:
                    if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                        3,
                        6
                    ];
                    entry = _step.value;
                    entryName = entry.isDirectory() ? entry.name : removeMigrationScriptExtension(entry.name);
                    return [
                        4,
                        resolveMigrationScript(workDir, entryName)
                    ];
                case 4:
                    candidates = _state.sent();
                    _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                    try {
                        for(_iterator1 = candidates[Symbol.iterator](); !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                            candidate = _step1.value;
                            if (isLoadableMigrationScript(candidate)) {
                                migrations.push({
                                    id: entryName,
                                    migration: candidate.mod.default
                                });
                            }
                        }
                    } catch (err) {
                        _didIteratorError1 = true;
                        _iteratorError1 = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                                _iterator1.return();
                            }
                        } finally{
                            if (_didIteratorError1) {
                                throw _iteratorError1;
                            }
                        }
                    }
                    _state.label = 5;
                case 5:
                    _iteratorNormalCompletion = true;
                    return [
                        3,
                        3
                    ];
                case 6:
                    return [
                        3,
                        9
                    ];
                case 7:
                    err = _state.sent();
                    _didIteratorError = true;
                    _iteratorError = err;
                    return [
                        3,
                        9
                    ];
                case 8:
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
                case 9:
                    return [
                        2,
                        migrations
                    ];
            }
        });
    })();
}
