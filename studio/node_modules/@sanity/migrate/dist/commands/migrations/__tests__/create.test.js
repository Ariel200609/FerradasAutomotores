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
import { access, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { findProjectRoot } from '@sanity/cli-core';
import { testCommand } from '@sanity/cli-test';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { CreateMigrationCommand } from '../create.js';
var mocks = vi.hoisted(function() {
    return {
        confirm: vi.fn(),
        input: vi.fn(),
        select: vi.fn()
    };
});
var mockTemplates = vi.hoisted(function() {
    return {
        minimalAdvanced: vi.fn(),
        minimalSimple: vi.fn(),
        renameField: vi.fn(),
        renameType: vi.fn(),
        stringToPTE: vi.fn()
    };
});
vi.mock('node:fs');
vi.mock('node:fs/promises', function() {
    return {
        access: vi.fn(),
        mkdir: vi.fn(),
        writeFile: vi.fn()
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
                            confirm: mocks.confirm,
                            input: mocks.input,
                            select: mocks.select
                        })
                    ];
            }
        });
    })();
});
var mockProjectRoot = vi.hoisted(function() {
    return {
        directory: '/test/path',
        path: '/test/path/sanity.config.ts',
        type: 'studio'
    };
});
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
                            findProjectRoot: vi.fn().mockResolvedValue(mockProjectRoot)
                        })
                    ];
            }
        });
    })();
});
var defaultMocks = {
    cliConfig: {
        api: {
            projectId: 'test-project'
        }
    },
    projectRoot: mockProjectRoot
};
vi.mock('../../../actions/migration/templates/index.js', function() {
    return mockTemplates;
});
var mockConfirm = mocks.confirm;
var mockFindProjectRoot = vi.mocked(findProjectRoot);
var mockInput = mocks.input;
var mockSelect = mocks.select;
var mockAccess = vi.mocked(access);
var mockMkdir = vi.mocked(mkdir);
var mockWriteFile = vi.mocked(writeFile);
describe('#migration:create', function() {
    afterEach(function() {
        vi.clearAllMocks();
    });
    test('prompts user to enter title when no title argument is provided', function() {
        return _async_to_generator(function() {
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            testCommand(CreateMigrationCommand, [], {
                                mocks: defaultMocks
                            })
                        ];
                    case 1:
                        _state.sent();
                        expect(mockInput).toHaveBeenCalledWith({
                            message: 'Title of migration (e.g. "Rename field from location to address")',
                            validate: expect.any(Function)
                        });
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('skips title prompt when title is provided', function() {
        return _async_to_generator(function() {
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            testCommand(CreateMigrationCommand, [
                                'Migration Title'
                            ], {
                                mocks: defaultMocks
                            })
                        ];
                    case 1:
                        _state.sent();
                        expect(mockInput).toHaveBeenCalledWith({
                            message: 'Type of documents to migrate. You can add multiple types separated by comma (optional)'
                        });
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('errors gracefully if findProjectRoot fails', function() {
        return _async_to_generator(function() {
            var error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        mockFindProjectRoot.mockRejectedValueOnce(new Error('No project root found'));
                        return [
                            4,
                            testCommand(CreateMigrationCommand, [
                                'Migration Title'
                            ], {
                                mocks: defaultMocks
                            })
                        ];
                    case 1:
                        error = _state.sent().error;
                        expect(error === null || error === void 0 ? void 0 : error.message).toContain('No project root found');
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('prompts user for type of documents for migration after a valid migration name has been entered', function() {
        return _async_to_generator(function() {
            var _mockInput_mock_calls_;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        mockInput.mockResolvedValueOnce('Migration Title');
                        return [
                            4,
                            testCommand(CreateMigrationCommand, [], {
                                mocks: defaultMocks
                            })
                        ];
                    case 1:
                        _state.sent();
                        expect((_mockInput_mock_calls_ = mockInput.mock.calls[1]) === null || _mockInput_mock_calls_ === void 0 ? void 0 : _mockInput_mock_calls_[0]).toStrictEqual({
                            message: 'Type of documents to migrate. You can add multiple types separated by comma (optional)'
                        });
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('prompts user for template selection after migration name and optional document types', function() {
        return _async_to_generator(function() {
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        mockInput.mockResolvedValueOnce('document-1, document-2, document-3');
                        return [
                            4,
                            testCommand(CreateMigrationCommand, [
                                'Migration Title'
                            ], {
                                mocks: defaultMocks
                            })
                        ];
                    case 1:
                        _state.sent();
                        expect(mockSelect).toHaveBeenCalledWith({
                            choices: [
                                {
                                    name: 'Minimalistic migration to get you started',
                                    value: 'Minimalistic migration to get you started'
                                },
                                {
                                    name: 'Rename an object type',
                                    value: 'Rename an object type'
                                },
                                {
                                    name: 'Rename a field',
                                    value: 'Rename a field'
                                },
                                {
                                    name: 'Convert string field to Portable Text',
                                    value: 'Convert string field to Portable Text'
                                },
                                {
                                    name: 'Advanced template using async iterators providing more fine grained control',
                                    value: 'Advanced template using async iterators providing more fine grained control'
                                }
                            ],
                            message: 'Select a template'
                        });
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('creates directory when it does not exist', function() {
        return _async_to_generator(function() {
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        mockInput.mockResolvedValueOnce('document-1, document-2, document-3');
                        mockSelect.mockResolvedValue('Rename a field');
                        mockAccess.mockRejectedValue(new Error('ENOENT: no such file or directory'));
                        return [
                            4,
                            testCommand(CreateMigrationCommand, [
                                'Migration Title'
                            ], {
                                mocks: defaultMocks
                            })
                        ];
                    case 1:
                        _state.sent();
                        expect(mockMkdir).toHaveBeenCalledWith(expect.stringContaining(path.join('test', 'path', 'migrations', 'migration-title')), {
                            recursive: true
                        });
                        expect(mockConfirm).not.toHaveBeenCalled();
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('prompts the user to overwrite when directory already exists', function() {
        return _async_to_generator(function() {
            var _ref, _mockConfirm_mock_calls__, _mockConfirm_mock_calls_, confirmMessage;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        mockInput.mockResolvedValueOnce('document-1, document-2, document-3');
                        mockSelect.mockResolvedValue('Rename a field');
                        mockAccess.mockResolvedValue();
                        mockConfirm.mockResolvedValue(true);
                        return [
                            4,
                            testCommand(CreateMigrationCommand, [
                                'My Migration'
                            ], {
                                mocks: defaultMocks
                            })
                        ];
                    case 1:
                        _state.sent();
                        expect(mockConfirm).toHaveBeenCalledWith({
                            default: false,
                            message: expect.stringContaining('already exists. Overwrite?')
                        });
                        confirmMessage = (_ref = (_mockConfirm_mock_calls_ = mockConfirm.mock.calls[0]) === null || _mockConfirm_mock_calls_ === void 0 ? void 0 : (_mockConfirm_mock_calls__ = _mockConfirm_mock_calls_[0]) === null || _mockConfirm_mock_calls__ === void 0 ? void 0 : _mockConfirm_mock_calls__.message) !== null && _ref !== void 0 ? _ref : '';
                        expect(confirmMessage).toContain(path.join('test', 'path', 'migrations', 'my-migration'));
                        expect(mockMkdir).toHaveBeenCalled();
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('does not create directory when user declines overwrite', function() {
        return _async_to_generator(function() {
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        mockInput.mockResolvedValueOnce('document-1, document-2, document-3');
                        mockSelect.mockResolvedValue('Rename a field');
                        mockAccess.mockResolvedValue();
                        mockConfirm.mockResolvedValue(false);
                        return [
                            4,
                            testCommand(CreateMigrationCommand, [
                                'My Migration'
                            ], {
                                mocks: defaultMocks
                            })
                        ];
                    case 1:
                        _state.sent();
                        expect(mockConfirm).toHaveBeenCalled();
                        expect(mockMkdir).not.toHaveBeenCalled();
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('creates directory after user confirms overwrite', function() {
        return _async_to_generator(function() {
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        mockInput.mockResolvedValueOnce('document-1, document-2, document-3');
                        mockSelect.mockResolvedValue('Rename a field');
                        mockAccess.mockResolvedValue();
                        mockConfirm.mockResolvedValue(true);
                        return [
                            4,
                            testCommand(CreateMigrationCommand, [
                                'My Migration'
                            ], {
                                mocks: defaultMocks
                            })
                        ];
                    case 1:
                        _state.sent();
                        expect(mockConfirm).toHaveBeenCalled();
                        expect(mockMkdir).toHaveBeenCalledWith(expect.stringContaining(path.join('test', 'path', 'migrations', 'my-migration')), {
                            recursive: true
                        });
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('exits gracefully when directory creation fails', function() {
        return _async_to_generator(function() {
            var error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        mockInput.mockResolvedValueOnce('document-1, document-2, document-3');
                        mockSelect.mockResolvedValue('Rename a field');
                        mockAccess.mockResolvedValue();
                        mockMkdir.mockRejectedValue(new Error('Permission denied'));
                        return [
                            4,
                            testCommand(CreateMigrationCommand, [
                                'My Migration'
                            ], {
                                mocks: defaultMocks
                            })
                        ];
                    case 1:
                        error = _state.sent().error;
                        expect(error).toBeDefined();
                        expect(error === null || error === void 0 ? void 0 : error.message).toContain('Failed to create migration directory: Permission denied');
                        expect(mockWriteFile).not.toHaveBeenCalled();
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('output migration instructions after migrations folder has been created', function() {
        return _async_to_generator(function() {
            var stdout;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        mockInput.mockResolvedValueOnce('document-1, document-2, document-3');
                        mockSelect.mockResolvedValue('Rename a field');
                        mockAccess.mockResolvedValue();
                        mockMkdir.mockResolvedValue('test/path/migrations/my-migration');
                        return [
                            4,
                            testCommand(CreateMigrationCommand, [
                                'My Migration'
                            ], {
                                mocks: defaultMocks
                            })
                        ];
                    case 1:
                        stdout = _state.sent().stdout;
                        expect(mockWriteFile).toHaveBeenCalled();
                        expect(stdout).toContain('Migration created!');
                        expect(stdout).toContain(path.join('test', 'path', 'migrations', 'my-migration', 'index.ts'));
                        expect(stdout).toContain('sanity migration run my-migration');
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('creates minimalSimple template in migration folder when user selects it', function() {
        return _async_to_generator(function() {
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        mockInput.mockResolvedValueOnce('document-1, document-2, document-3');
                        mockSelect.mockResolvedValue('Minimalistic migration to get you started');
                        mockAccess.mockResolvedValue();
                        mockMkdir.mockResolvedValue('test/path/migrations/my-migration');
                        return [
                            4,
                            testCommand(CreateMigrationCommand, [
                                'My Migration'
                            ], {
                                mocks: defaultMocks
                            })
                        ];
                    case 1:
                        _state.sent();
                        expect(mockTemplates.minimalSimple).toHaveBeenCalled();
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('creates renameType template in migration folder when user selects it', function() {
        return _async_to_generator(function() {
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        mockInput.mockResolvedValueOnce('document-1, document-2, document-3');
                        mockSelect.mockResolvedValue('Rename an object type');
                        mockAccess.mockResolvedValue();
                        mockMkdir.mockResolvedValue('test/path/migrations/my-migration');
                        return [
                            4,
                            testCommand(CreateMigrationCommand, [
                                'My Migration'
                            ], {
                                mocks: defaultMocks
                            })
                        ];
                    case 1:
                        _state.sent();
                        expect(mockTemplates.renameType).toHaveBeenCalled();
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('creates renameField template in migration folder when user selects it', function() {
        return _async_to_generator(function() {
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        mockInput.mockResolvedValueOnce('document-1, document-2, document-3');
                        mockSelect.mockResolvedValue('Rename a field');
                        mockAccess.mockResolvedValue();
                        mockMkdir.mockResolvedValue('test/path/migrations/my-migration');
                        return [
                            4,
                            testCommand(CreateMigrationCommand, [
                                'My Migration'
                            ], {
                                mocks: defaultMocks
                            })
                        ];
                    case 1:
                        _state.sent();
                        expect(mockTemplates.renameField).toHaveBeenCalled();
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('creates stringToPTE template in migration folder when user selects it', function() {
        return _async_to_generator(function() {
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        mockInput.mockResolvedValueOnce('document-1, document-2, document-3');
                        mockSelect.mockResolvedValue('Convert string field to Portable Text');
                        mockAccess.mockResolvedValue();
                        mockMkdir.mockResolvedValue('test/path/migrations/my-migration');
                        return [
                            4,
                            testCommand(CreateMigrationCommand, [
                                'My Migration'
                            ], {
                                mocks: defaultMocks
                            })
                        ];
                    case 1:
                        _state.sent();
                        expect(mockTemplates.stringToPTE).toHaveBeenCalled();
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('creates minimalAdvanced template in migration folder when user selects it', function() {
        return _async_to_generator(function() {
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        mockInput.mockResolvedValueOnce('document-1, document-2, document-3');
                        mockSelect.mockResolvedValue('Advanced template using async iterators providing more fine grained control');
                        mockAccess.mockResolvedValue();
                        mockMkdir.mockResolvedValue('test/path/migrations/my-migration');
                        return [
                            4,
                            testCommand(CreateMigrationCommand, [
                                'My Migration'
                            ], {
                                mocks: defaultMocks
                            })
                        ];
                    case 1:
                        _state.sent();
                        expect(mockTemplates.minimalAdvanced).toHaveBeenCalled();
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('exits gracefully when writing the template to the directory fails', function() {
        return _async_to_generator(function() {
            var _ref, error, stdout;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        mockInput.mockResolvedValueOnce('document-1, document-2, document-3');
                        mockSelect.mockResolvedValue('Advanced template using async iterators providing more fine grained control');
                        mockAccess.mockResolvedValue();
                        mockMkdir.mockResolvedValue('test/path/migrations/my-migration');
                        mockWriteFile.mockRejectedValue(new Error('Permission denied'));
                        return [
                            4,
                            testCommand(CreateMigrationCommand, [
                                'My Migration'
                            ], {
                                mocks: defaultMocks
                            })
                        ];
                    case 1:
                        _ref = _state.sent(), error = _ref.error, stdout = _ref.stdout;
                        expect(error).toBeDefined();
                        expect(error === null || error === void 0 ? void 0 : error.message).toContain('Failed to create migration file: Permission denied');
                        expect(stdout).toBe('');
                        return [
                            2
                        ];
                }
            });
        })();
    });
});
