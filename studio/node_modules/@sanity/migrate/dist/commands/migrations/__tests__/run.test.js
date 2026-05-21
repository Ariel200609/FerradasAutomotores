function _async_generator(gen) {
    var front, back;
    function send(key, arg) {
        return new Promise(function(resolve, reject) {
            var request = {
                key: key,
                arg: arg,
                resolve: resolve,
                reject: reject,
                next: null
            };
            if (back) back = back.next = request;
            else {
                front = back = request;
                resume(key, arg);
            }
        });
    }
    function resume(key, arg) {
        try {
            var result = gen[key](arg);
            var value = result.value;
            var overloaded = value instanceof _overload_yield;
            Promise.resolve(overloaded ? value.v : value).then(function(arg) {
                if (overloaded) {
                    var nextKey = key === "return" ? "return" : "next";
                    if (!value.k || arg.done) return resume(nextKey, arg);
                    else arg = gen[nextKey](arg).value;
                }
                settle(result.done ? "return" : "normal", arg);
            }, function(err) {
                resume("throw", err);
            });
        } catch (err) {
            settle("throw", err);
        }
    }
    function settle(type, value) {
        switch(type){
            case "return":
                front.resolve({
                    value: value,
                    done: true
                });
                break;
            case "throw":
                front.reject(value);
                break;
            default:
                front.resolve({
                    value: value,
                    done: false
                });
                break;
        }
        front = front.next;
        if (front) resume(front.key, front.arg);
        else back = null;
    }
    this._invoke = send;
    if (typeof gen.return !== "function") this.return = undefined;
}
_async_generator.prototype[typeof Symbol === "function" && Symbol.asyncIterator || "@@asyncIterator"] = function() {
    return this;
};
_async_generator.prototype.next = function(arg) {
    return this._invoke("next", arg);
};
_async_generator.prototype.throw = function(arg) {
    return this._invoke("throw", arg);
};
_async_generator.prototype.return = function(arg) {
    return this._invoke("return", arg);
};
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
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _overload_yield(value, kind) {
    this.v = value;
    this.k = kind;
}
function _wrap_async_generator(fn) {
    return function() {
        return new _async_generator(fn.apply(this, arguments));
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
import { testCommand } from '@sanity/cli-test';
import { afterEach, beforeAll, beforeEach, describe, expect, test, vi } from 'vitest';
import { RunMigrationCommand } from '../run.js';
var mocks = vi.hoisted(function() {
    return {
        confirm: vi.fn(),
        dryRun: vi.fn(),
        readdir: vi.fn(),
        resolveMigrationScript: vi.fn(),
        run: vi.fn()
    };
});
vi.mock('node:fs/promises', function() {
    return {
        readdir: mocks.readdir
    };
});
vi.mock('@sanity/cli-core/ux', function(importOriginal) {
    return _async_to_generator(function() {
        var actual;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        importOriginal()
                    ];
                case 1:
                    actual = _state.sent();
                    return [
                        2,
                        _object_spread_props(_object_spread({}, actual), {
                            confirm: mocks.confirm
                        })
                    ];
            }
        });
    })();
});
var mockProjectRoot = vi.hoisted(function() {
    return {
        directory: '/test/project',
        path: '/test/project/sanity.config.ts',
        type: 'studio'
    };
});
var defaultMocks = {
    cliConfig: {
        api: {
            projectId: 'test-project'
        }
    },
    projectRoot: mockProjectRoot
};
vi.mock('@sanity/cli-core', function() {
    return _async_to_generator(function() {
        var actual;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        vi.importActual('@sanity/cli-core')
                    ];
                case 1:
                    actual = _state.sent();
                    return [
                        2,
                        _object_spread_props(_object_spread({}, actual), {
                            findProjectRoot: vi.fn().mockResolvedValue(mockProjectRoot),
                            getProjectCliClient: vi.fn().mockResolvedValue({
                                config: vi.fn().mockReturnValue({
                                    apiHost: 'https://api.sanity.io',
                                    apiVersion: 'v2024-01-29',
                                    dataset: 'production',
                                    projectId: 'test-project',
                                    token: 'mock-token'
                                })
                            })
                        })
                    ];
            }
        });
    })();
});
vi.mock(import('../../../runner/dryRun.js'), function() {
    return {
        dryRun: mocks.dryRun
    };
});
vi.mock(import('../../../runner/run.js'), function() {
    return {
        run: mocks.run
    };
});
vi.mock(import('../../../utils/migration/resolveMigrationScript.js'), function(importOriginal) {
    return _async_to_generator(function() {
        var actual;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        importOriginal()
                    ];
                case 1:
                    actual = _state.sent();
                    return [
                        2,
                        _object_spread_props(_object_spread({}, actual), {
                            resolveMigrationScript: mocks.resolveMigrationScript
                        })
                    ];
            }
        });
    })();
});
var mockConfirm = mocks.confirm;
var mockDryRun = mocks.dryRun;
var mockReaddir = mocks.readdir;
var mockResolveMigrationScript = mocks.resolveMigrationScript;
var mockRun = mocks.run;
describe('#migration:run', function() {
    beforeAll(function() {
        mockReaddir.mockResolvedValue([
            {
                isDirectory: function isDirectory() {
                    return false;
                },
                name: 'my-migration.js'
            }
        ]);
        mockResolveMigrationScript.mockResolvedValue([
            {
                absolutePath: '/test/project/migrations/my-migration.js',
                mod: {
                    default: {
                        documentTypes: [
                            'article'
                        ],
                        migrate: vi.fn(),
                        title: 'My Migration'
                    }
                },
                relativePath: 'migrations/my-migration.js'
            }
        ]);
    });
    beforeEach(function() {
        mockDryRun.mockImplementation(function() {
            return _wrap_async_generator(function() {
                return _ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            return [
                                4,
                                {
                                    id: 'RDP0avd8MWK480sF2ok0FJ',
                                    patches: [
                                        {
                                            op: {
                                                type: 'setIfMissing',
                                                value: undefined
                                            },
                                            path: [
                                                'creator'
                                            ]
                                        }
                                    ],
                                    type: 'patch'
                                }
                            ];
                        case 1:
                            _state.sent();
                            return [
                                4,
                                {
                                    id: 'RDP0avd8MWK480sF2ok0FJ',
                                    patches: [
                                        {
                                            op: {
                                                type: 'unset'
                                            },
                                            path: [
                                                'author'
                                            ]
                                        }
                                    ],
                                    type: 'patch'
                                }
                            ];
                        case 2:
                            _state.sent();
                            return [
                                2
                            ];
                    }
                });
            })();
        });
    });
    afterEach(function() {
        vi.clearAllMocks();
    });
    test('errors when user only enters projectId flag', function() {
        return _async_to_generator(function() {
            var _error_oclif, error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            testCommand(RunMigrationCommand, [
                                'my-migration',
                                '--project',
                                'test-project'
                            ], {
                                mocks: defaultMocks
                            })
                        ];
                    case 1:
                        error = _state.sent().error;
                        expect(error === null || error === void 0 ? void 0 : error.message).toContain('If either --dataset or --project is provided, both must be provided');
                        expect(error === null || error === void 0 ? void 0 : (_error_oclif = error.oclif) === null || _error_oclif === void 0 ? void 0 : _error_oclif.exit).toBe(1);
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('errors when user only enters dataset flag', function() {
        return _async_to_generator(function() {
            var _error_oclif, error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            testCommand(RunMigrationCommand, [
                                'my-migration',
                                '--dataset',
                                'production'
                            ], {
                                mocks: defaultMocks
                            })
                        ];
                    case 1:
                        error = _state.sent().error;
                        expect(error === null || error === void 0 ? void 0 : error.message).toContain('If either --dataset or --project is provided, both must be provided');
                        expect(error === null || error === void 0 ? void 0 : (_error_oclif = error.oclif) === null || _error_oclif === void 0 ? void 0 : _error_oclif.exit).toBe(1);
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('errors when no projectId flag is passed or available from config', function() {
        return _async_to_generator(function() {
            var _error_oclif, error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            testCommand(RunMigrationCommand, [
                                'my-migration'
                            ], {
                                mocks: _object_spread_props(_object_spread({}, defaultMocks), {
                                    cliConfig: {
                                        api: {
                                            dataset: 'production',
                                            projectId: undefined
                                        }
                                    }
                                })
                            })
                        ];
                    case 1:
                        error = _state.sent().error;
                        expect(error === null || error === void 0 ? void 0 : error.message).toContain('Unable to determine project ID');
                        expect(error === null || error === void 0 ? void 0 : (_error_oclif = error.oclif) === null || _error_oclif === void 0 ? void 0 : _error_oclif.exit).toBe(1);
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('errors when no dataset flag is passed or available from config', function() {
        return _async_to_generator(function() {
            var _error_oclif, error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            testCommand(RunMigrationCommand, [
                                'my-migration'
                            ], {
                                mocks: _object_spread_props(_object_spread({}, defaultMocks), {
                                    cliConfig: {
                                        api: {
                                            dataset: undefined,
                                            projectId: 'test-project'
                                        }
                                    }
                                })
                            })
                        ];
                    case 1:
                        error = _state.sent().error;
                        expect(error === null || error === void 0 ? void 0 : error.message).toContain('sanity.cli.js does not contain a dataset identifier ("api.dataset") and no --dataset option was provided.');
                        expect(error === null || error === void 0 ? void 0 : (_error_oclif = error.oclif) === null || _error_oclif === void 0 ? void 0 : _error_oclif.exit).toBe(1);
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('shows warning when user does not provide migration id', function() {
        return _async_to_generator(function() {
            var _error_oclif, _ref, error, stderr, stdout;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            testCommand(RunMigrationCommand, [], {
                                mocks: _object_spread_props(_object_spread({}, defaultMocks), {
                                    cliConfig: {
                                        api: {
                                            dataset: 'production',
                                            projectId: 'test-project'
                                        }
                                    }
                                })
                            })
                        ];
                    case 1:
                        _ref = _state.sent(), error = _ref.error, stderr = _ref.stderr, stdout = _ref.stdout;
                        expect(stderr).toContain('Migration ID must be provided');
                        expect(stdout).toContain('my-migration');
                        expect(stdout).toContain('My Migration');
                        expect(stdout).toContain('ID');
                        expect(stdout).toContain('Title');
                        expect(stdout).toContain('Run `sanity migration run <ID>` to run a migration');
                        expect(error === null || error === void 0 ? void 0 : (_error_oclif = error.oclif) === null || _error_oclif === void 0 ? void 0 : _error_oclif.exit).toBe(1);
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('shows error if more than one migration have the same name', function() {
        return _async_to_generator(function() {
            var _error_oclif, error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        mockReaddir.mockResolvedValue([
                            {
                                isDirectory: function isDirectory() {
                                    return false;
                                },
                                name: 'rename-tags.js'
                            },
                            {
                                isDirectory: function isDirectory() {
                                    return false;
                                },
                                name: 'rename-tags.js'
                            }
                        ]);
                        mockResolveMigrationScript.mockResolvedValueOnce([
                            {
                                absolutePath: '/test/project/migrations/rename-tags.js',
                                mod: {
                                    default: {
                                        migrate: vi.fn(),
                                        title: 'Rename tags to categories'
                                    }
                                },
                                relativePath: 'migrations/rename-tags.js'
                            },
                            {
                                absolutePath: '/test/project/migrations/rename-tags.js',
                                mod: {
                                    default: {
                                        migrate: vi.fn(),
                                        title: 'Rename tags to categories'
                                    }
                                },
                                relativePath: 'migrations/rename-tags.js'
                            }
                        ]);
                        return [
                            4,
                            testCommand(RunMigrationCommand, [
                                'rename-tags'
                            ], {
                                mocks: _object_spread_props(_object_spread({}, defaultMocks), {
                                    cliConfig: {
                                        api: {
                                            dataset: 'production',
                                            projectId: 'test-project'
                                        }
                                    }
                                })
                            })
                        ];
                    case 1:
                        error = _state.sent().error;
                        expect(error === null || error === void 0 ? void 0 : error.message).toContain('Found multiple migrations for "rename-tags"');
                        expect(error === null || error === void 0 ? void 0 : (_error_oclif = error.oclif) === null || _error_oclif === void 0 ? void 0 : _error_oclif.exit).toBe(1);
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('shows error if there is no script attached to migration', function() {
        return _async_to_generator(function() {
            var _error_oclif, error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        mockResolveMigrationScript.mockResolvedValueOnce([]);
                        return [
                            4,
                            testCommand(RunMigrationCommand, [
                                'my-migration'
                            ], {
                                mocks: _object_spread_props(_object_spread({}, defaultMocks), {
                                    cliConfig: {
                                        api: {
                                            dataset: 'production',
                                            projectId: 'test-project'
                                        }
                                    }
                                })
                            })
                        ];
                    case 1:
                        error = _state.sent().error;
                        expect(error === null || error === void 0 ? void 0 : error.message).toContain('No migration found for "my-migration"');
                        expect(error === null || error === void 0 ? void 0 : (_error_oclif = error.oclif) === null || _error_oclif === void 0 ? void 0 : _error_oclif.exit).toBe(1);
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('shows error if the migration script contains up in mod property', function() {
        return _async_to_generator(function() {
            var _error_oclif, error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        mockResolveMigrationScript.mockResolvedValueOnce([
                            {
                                absolutePath: '/test/project/migrations/my-migration.ts',
                                mod: {
                                    default: {
                                        migrate: vi.fn(),
                                        title: 'My migration'
                                    },
                                    up: vi.fn()
                                },
                                relativePath: 'migrations/my-migration.ts'
                            }
                        ]);
                        return [
                            4,
                            testCommand(RunMigrationCommand, [
                                'my-migration'
                            ], {
                                mocks: _object_spread_props(_object_spread({}, defaultMocks), {
                                    cliConfig: {
                                        api: {
                                            dataset: 'production',
                                            projectId: 'test-project'
                                        }
                                    }
                                })
                            })
                        ];
                    case 1:
                        error = _state.sent().error;
                        expect(error === null || error === void 0 ? void 0 : error.message).toContain('Only "up" migrations are supported at this time');
                        expect(error === null || error === void 0 ? void 0 : (_error_oclif = error.oclif) === null || _error_oclif === void 0 ? void 0 : _error_oclif.exit).toBe(1);
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('shows error if the migration script contains down in mod property', function() {
        return _async_to_generator(function() {
            var _error_oclif, error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        mockResolveMigrationScript.mockResolvedValueOnce([
                            {
                                absolutePath: '/test/project/migrations/my-migration.ts',
                                mod: {
                                    default: {
                                        migrate: vi.fn(),
                                        title: 'My migration'
                                    },
                                    down: vi.fn()
                                },
                                relativePath: 'migrations/my-migration.ts'
                            }
                        ]);
                        return [
                            4,
                            testCommand(RunMigrationCommand, [
                                'my-migration'
                            ], {
                                mocks: _object_spread_props(_object_spread({}, defaultMocks), {
                                    cliConfig: {
                                        api: {
                                            dataset: 'production',
                                            projectId: 'test-project'
                                        }
                                    }
                                })
                            })
                        ];
                    case 1:
                        error = _state.sent().error;
                        expect(error === null || error === void 0 ? void 0 : error.message).toContain('Only "up" migrations are supported at this time');
                        expect(error === null || error === void 0 ? void 0 : (_error_oclif = error.oclif) === null || _error_oclif === void 0 ? void 0 : _error_oclif.exit).toBe(1);
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('shows error if from-export and no-dry-run flags are passed', function() {
        return _async_to_generator(function() {
            var _error_oclif, error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            testCommand(RunMigrationCommand, [
                                'my-migration',
                                '--from-export',
                                'production.tar.gz',
                                '--no-dry-run'
                            ], {
                                mocks: _object_spread_props(_object_spread({}, defaultMocks), {
                                    cliConfig: {
                                        api: {
                                            dataset: 'production',
                                            projectId: 'test-project'
                                        }
                                    }
                                })
                            })
                        ];
                    case 1:
                        error = _state.sent().error;
                        expect(error === null || error === void 0 ? void 0 : error.message).toContain('Can only dry run migrations from a dataset export file');
                        expect(error === null || error === void 0 ? void 0 : (_error_oclif = error.oclif) === null || _error_oclif === void 0 ? void 0 : _error_oclif.exit).toBe(1);
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('shows error if concurrency flag is passed with value greater than the max concurrency value', function() {
        return _async_to_generator(function() {
            var _error_oclif, error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            testCommand(RunMigrationCommand, [
                                'my-migration',
                                '--concurrency',
                                '11'
                            ], {
                                mocks: _object_spread_props(_object_spread({}, defaultMocks), {
                                    cliConfig: {
                                        api: {
                                            dataset: 'production',
                                            projectId: 'test-project'
                                        }
                                    }
                                })
                            })
                        ];
                    case 1:
                        error = _state.sent().error;
                        expect(error === null || error === void 0 ? void 0 : error.message).toContain('Concurrency exceeds the maximum allowed value of 10');
                        expect(error === null || error === void 0 ? void 0 : (_error_oclif = error.oclif) === null || _error_oclif === void 0 ? void 0 : _error_oclif.exit).toBe(1);
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('shows error if concurrency flag is passed with 0', function() {
        return _async_to_generator(function() {
            var _error_oclif, error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            testCommand(RunMigrationCommand, [
                                'my-migration',
                                '--concurrency',
                                '0'
                            ], {
                                mocks: _object_spread_props(_object_spread({}, defaultMocks), {
                                    cliConfig: {
                                        api: {
                                            dataset: 'production',
                                            projectId: 'test-project'
                                        }
                                    }
                                })
                            })
                        ];
                    case 1:
                        error = _state.sent().error;
                        expect(error === null || error === void 0 ? void 0 : error.message).toContain('Concurrency must be a positive number, got 0');
                        expect(error === null || error === void 0 ? void 0 : (_error_oclif = error.oclif) === null || _error_oclif === void 0 ? void 0 : _error_oclif.exit).toBe(1);
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('runs dry run migration by default', function() {
        return _async_to_generator(function() {
            var stdout;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            testCommand(RunMigrationCommand, [
                                'my-migration'
                            ], {
                                mocks: _object_spread_props(_object_spread({}, defaultMocks), {
                                    cliConfig: {
                                        api: {
                                            dataset: 'production',
                                            projectId: 'test-project'
                                        }
                                    }
                                })
                            })
                        ];
                    case 1:
                        stdout = _state.sent().stdout;
                        expect(stdout).toContain('Running migration "my-migration" in dry mode');
                        expect(stdout).toContain('Project id:  test-project');
                        expect(stdout).toContain('Dataset:     production');
                        expect(stdout).toContain("[patch] [article] RDP0avd8MWK480sF2ok0FJ");
                        expect(stdout).toContain("creator ....................... setIfMissing(undefined)");
                        expect(stdout).toContain("[patch] [article] RDP0avd8MWK480sF2ok0FJ");
                        expect(stdout).toContain("author ........................ unset()");
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('runs dry run migration from export', function() {
        return _async_to_generator(function() {
            var stdout;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            testCommand(RunMigrationCommand, [
                                'my-migration',
                                '--from-export',
                                'production.tar.gz'
                            ], {
                                mocks: _object_spread_props(_object_spread({}, defaultMocks), {
                                    cliConfig: {
                                        api: {
                                            dataset: 'production',
                                            projectId: 'test-project'
                                        }
                                    }
                                })
                            })
                        ];
                    case 1:
                        stdout = _state.sent().stdout;
                        expect(stdout).toContain('Running migration "my-migration" in dry mode');
                        expect(stdout).toContain('Using export production.tar.gz');
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('errors when users passes no-dry-run flag and says no to confirm prompt', function() {
        return _async_to_generator(function() {
            var _ref, _mockConfirm_mock_calls__, _mockConfirm_mock_calls_, _error_oclif, error, confirmMessage;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        mockConfirm.mockResolvedValueOnce(false);
                        return [
                            4,
                            testCommand(RunMigrationCommand, [
                                'my-migration',
                                '--no-dry-run'
                            ], {
                                mocks: _object_spread_props(_object_spread({}, defaultMocks), {
                                    cliConfig: {
                                        api: {
                                            dataset: 'production',
                                            projectId: 'test-project'
                                        }
                                    }
                                })
                            })
                        ];
                    case 1:
                        error = _state.sent().error;
                        expect(mockConfirm).toHaveBeenCalledWith({
                            message: expect.stringContaining('Are you sure?')
                        });
                        // Verify the message contains the key info (may be wrapped in ANSI codes on some Node versions)
                        confirmMessage = (_ref = (_mockConfirm_mock_calls_ = mockConfirm.mock.calls[0]) === null || _mockConfirm_mock_calls_ === void 0 ? void 0 : (_mockConfirm_mock_calls__ = _mockConfirm_mock_calls_[0]) === null || _mockConfirm_mock_calls__ === void 0 ? void 0 : _mockConfirm_mock_calls__.message) !== null && _ref !== void 0 ? _ref : '';
                        expect(confirmMessage).toContain('production');
                        expect(confirmMessage).toContain('test-project');
                        expect(error === null || error === void 0 ? void 0 : (_error_oclif = error.oclif) === null || _error_oclif === void 0 ? void 0 : _error_oclif.exit).toBe(1);
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('successfully calls migration when user confirms yes', function() {
        return _async_to_generator(function() {
            var _ref, stderr, stdout;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        mockConfirm.mockResolvedValueOnce(true);
                        mockRun.mockImplementation(function(config) {
                            return _async_to_generator(function() {
                                return _ts_generator(this, function(_state) {
                                    if (config.onProgress) {
                                        config.onProgress({
                                            completedTransactions: [
                                                {
                                                    id: 'tx-1',
                                                    mutations: []
                                                }
                                            ],
                                            currentTransactions: [],
                                            documents: 100,
                                            done: true,
                                            mutations: 50,
                                            pending: 0
                                        });
                                    }
                                    return [
                                        2
                                    ];
                                });
                            })();
                        });
                        return [
                            4,
                            testCommand(RunMigrationCommand, [
                                'my-migration',
                                '--no-dry-run'
                            ], {
                                mocks: _object_spread_props(_object_spread({}, defaultMocks), {
                                    cliConfig: {
                                        api: {
                                            dataset: 'production',
                                            projectId: 'test-project'
                                        }
                                    }
                                })
                            })
                        ];
                    case 1:
                        _ref = _state.sent(), stderr = _ref.stderr, stdout = _ref.stdout;
                        expect(stdout).toContain('Note: During migrations, your webhooks stay active.');
                        expect(stdout).toContain('To adjust them, launch the management interface with sanity manage, navigate to the API settings, and toggle the webhooks before and after the migration as needed.');
                        expect(stderr).toContain('Running migration "my-migration"');
                        expect(stderr).toContain('Migration "my-migration" completed');
                        expect(stderr).toContain('Project id:  test-project');
                        expect(stderr).toContain('Dataset:     production');
                        expect(stderr).toContain('100 documents processed');
                        expect(stderr).toContain('50 mutations generated');
                        expect(stderr).toContain('1 transactions committed');
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('shows progress updates while migration is running', function() {
        return _async_to_generator(function() {
            var stderr;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        mockConfirm.mockResolvedValueOnce(true);
                        mockRun.mockImplementation(function(config) {
                            return _async_to_generator(function() {
                                return _ts_generator(this, function(_state) {
                                    if (config.onProgress) {
                                        config.onProgress({
                                            completedTransactions: [],
                                            currentTransactions: [
                                                {
                                                    id: 'tx-1',
                                                    mutations: [],
                                                    type: 'transaction'
                                                }
                                            ],
                                            documents: 50,
                                            done: false,
                                            mutations: 25,
                                            pending: 5
                                        });
                                    }
                                    return [
                                        2
                                    ];
                                });
                            })();
                        });
                        return [
                            4,
                            testCommand(RunMigrationCommand, [
                                'my-migration',
                                '--no-dry-run'
                            ], {
                                mocks: _object_spread_props(_object_spread({}, defaultMocks), {
                                    cliConfig: {
                                        api: {
                                            dataset: 'production',
                                            projectId: 'test-project'
                                        }
                                    }
                                })
                            })
                        ];
                    case 1:
                        stderr = _state.sent().stderr;
                        expect(stderr).toContain('Running migration "my-migration"');
                        expect(stderr).toContain('Project id:');
                        expect(stderr).toContain('test-project');
                        expect(stderr).toContain('Dataset:');
                        expect(stderr).toContain('production');
                        expect(stderr).toContain('Document type:');
                        expect(stderr).toContain('article');
                        expect(stderr).toContain('50 documents processed…');
                        expect(stderr).toContain('25 mutations generated…');
                        expect(stderr).toContain('5 requests pending…');
                        expect(stderr).toContain('0 transactions committed.');
                        expect(stderr).toContain('» [transaction] tx-1');
                        return [
                            2
                        ];
                }
            });
        })();
    });
});
