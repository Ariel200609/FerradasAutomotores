function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _async_iterator(iterable) {
    var method, async, sync, retry = 2;
    for("undefined" != typeof Symbol && (async = Symbol.asyncIterator, sync = Symbol.iterator); retry--;){
        if (async && null != (method = iterable[async])) return method.call(iterable);
        if (sync && null != (method = iterable[sync])) return new AsyncFromSyncIterator(method.call(iterable));
        async = "@@asyncIterator", sync = "@@iterator";
    }
    throw new TypeError("Object is not async iterable");
}
function AsyncFromSyncIterator(s) {
    function AsyncFromSyncIteratorContinuation(r) {
        if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object."));
        var done = r.done;
        return Promise.resolve(r.value).then(function(value) {
            return {
                value: value,
                done: done
            };
        });
    }
    return AsyncFromSyncIterator = function(s) {
        this.s = s, this.n = s.next;
    }, AsyncFromSyncIterator.prototype = {
        s: null,
        n: null,
        next: function() {
            return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments));
        },
        return: function(value) {
            var ret = this.s.return;
            return void 0 === ret ? Promise.resolve({
                value: value,
                done: !0
            }) : AsyncFromSyncIteratorContinuation(ret.apply(this.s, arguments));
        },
        throw: function(value) {
            var thr = this.s.return;
            return void 0 === thr ? Promise.reject(value) : AsyncFromSyncIteratorContinuation(thr.apply(this.s, arguments));
        }
    }, new AsyncFromSyncIterator(s);
}
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
function _call_super(_this, derived, args) {
    derived = _get_prototype_of(derived);
    return _possible_constructor_return(_this, _is_native_reflect_construct() ? Reflect.construct(derived, args || [], _get_prototype_of(_this).constructor) : derived.apply(_this, args));
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
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
function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _set_prototype_of(subClass, superClass);
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _possible_constructor_return(self, call) {
    if (call && (_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized(self);
}
function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of(o, p);
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function _is_native_reflect_construct() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (_is_native_reflect_construct = function() {
        return !!result;
    })();
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
import { styleText } from 'node:util';
import { Args, Flags } from '@oclif/core';
import { getProjectCliClient, SanityCommand, subdebug } from '@sanity/cli-core';
import { confirm, spinner } from '@sanity/cli-core/ux';
import { Table } from 'console-table-printer';
import { getMigrationRootDirectory } from '../../actions/migration/getMigrationRootDirectory.js';
import { resolveMigrations } from '../../actions/migration/resolveMigrations.js';
import { DEFAULT_MUTATION_CONCURRENCY, MAX_MUTATION_CONCURRENCY } from '../../runner/constants.js';
import { dryRun } from '../../runner/dryRun.js';
import { run } from '../../runner/run.js';
import { DEFAULT_API_VERSION, MIGRATIONS_DIRECTORY } from '../../utils/migration/constants.js';
import { ensureApiVersionFormat } from '../../utils/migration/ensureApiVersionFormat.js';
import { prettyFormat } from '../../utils/migration/prettyMutationFormatter.js';
import { isLoadableMigrationScript, resolveMigrationScript } from '../../utils/migration/resolveMigrationScript.js';
var runMigrationDebug = subdebug('migration:run');
export var RunMigrationCommand = /*#__PURE__*/ function(SanityCommand) {
    "use strict";
    _inherits(RunMigrationCommand, SanityCommand);
    function RunMigrationCommand() {
        _class_call_check(this, RunMigrationCommand);
        return _call_super(this, RunMigrationCommand, arguments);
    }
    _create_class(RunMigrationCommand, [
        {
            key: "run",
            value: function run1() {
                return _async_to_generator(function() {
                    var _flags_apiversion, _cliConfig_api, _ref, args, flags, cliConfig, projectId, datasetFromConfig, workDir, id, migrationsDirectoryPath, fromExport, dry, dataset, project, apiVersion, migrations, table, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, definedMigration, candidates, resolvedScripts, script, mod, migration, concurrency, projectClient, projectConfig, apiConfig, spin;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    this.parse(RunMigrationCommand)
                                ];
                            case 1:
                                _ref = _state.sent(), args = _ref.args, flags = _ref.flags;
                                return [
                                    4,
                                    this.getCliConfig()
                                ];
                            case 2:
                                cliConfig = _state.sent();
                                return [
                                    4,
                                    this.getProjectId()
                                ];
                            case 3:
                                projectId = _state.sent();
                                datasetFromConfig = (_cliConfig_api = cliConfig.api) === null || _cliConfig_api === void 0 ? void 0 : _cliConfig_api.dataset;
                                return [
                                    4,
                                    getMigrationRootDirectory(this.output)
                                ];
                            case 4:
                                workDir = _state.sent();
                                id = args.id;
                                migrationsDirectoryPath = path.join(workDir, MIGRATIONS_DIRECTORY);
                                fromExport = flags['from-export'];
                                dry = flags['dry-run'];
                                dataset = flags.dataset;
                                project = flags.project;
                                apiVersion = ensureApiVersionFormat((_flags_apiversion = flags['api-version']) !== null && _flags_apiversion !== void 0 ? _flags_apiversion : DEFAULT_API_VERSION);
                                if (dataset && !project || project && !dataset) {
                                    this.error('If either --dataset or --project is provided, both must be provided', {
                                        exit: 1
                                    });
                                }
                                if (!project && !projectId) {
                                    this.error('sanity.cli.js does not contain a project identifier ("api.projectId") and no --project option was provided.', {
                                        exit: 1
                                    });
                                }
                                if (!dataset && !datasetFromConfig) {
                                    this.error('sanity.cli.js does not contain a dataset identifier ("api.dataset") and no --dataset option was provided.', {
                                        exit: 1
                                    });
                                }
                                if (!!id) return [
                                    3,
                                    6
                                ];
                                this.warn(styleText('red', 'Error: Migration ID must be provided'));
                                return [
                                    4,
                                    resolveMigrations(workDir)
                                ];
                            case 5:
                                migrations = _state.sent();
                                table = new Table({
                                    columns: [
                                        {
                                            alignment: 'left',
                                            name: 'id',
                                            title: 'ID'
                                        },
                                        {
                                            alignment: 'left',
                                            name: 'title',
                                            title: 'Title'
                                        }
                                    ],
                                    title: "Migrations found in project"
                                });
                                _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                                try {
                                    for(_iterator = migrations[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                        definedMigration = _step.value;
                                        table.addRow({
                                            id: definedMigration.id,
                                            title: definedMigration.migration.title
                                        });
                                    }
                                } catch (err) {
                                    _didIteratorError = true;
                                    _iteratorError = err;
                                } finally{
                                    try {
                                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                                            _iterator.return();
                                        }
                                    } finally{
                                        if (_didIteratorError) {
                                            throw _iteratorError;
                                        }
                                    }
                                }
                                table.printTable();
                                this.log('\nRun `sanity migration run <ID>` to run a migration');
                                this.exit(1);
                                _state.label = 6;
                            case 6:
                                return [
                                    4,
                                    resolveMigrationScript(workDir, id)
                                ];
                            case 7:
                                candidates = _state.sent();
                                resolvedScripts = candidates.filter(function(candidate) {
                                    return isLoadableMigrationScript(candidate);
                                });
                                if (resolvedScripts.length > 1) {
                                    // todo: consider prompt user about which one to run? note: it's likely a mistake if multiple files resolve to the same name
                                    this.error('Found multiple migrations for "'.concat(id, '" in ').concat(styleText('cyan', migrationsDirectoryPath), ": \n - ").concat(candidates.map(function(candidate) {
                                        return path.relative(migrationsDirectoryPath, candidate.absolutePath);
                                    }).join('\n - ')), {
                                        exit: 1
                                    });
                                }
                                script = resolvedScripts[0];
                                if (!script) {
                                    this.error('No migration found for "'.concat(id, '" in ').concat(styleText('cyan', migrationsDirectoryPath), ". Make sure that the migration file exists and exports a valid migration as its default export.\n\n Tried the following files:\n - ").concat(candidates.map(function(candidate) {
                                        return path.relative(migrationsDirectoryPath, candidate.absolutePath);
                                    }).join('\n - ')), {
                                        exit: 1
                                    });
                                }
                                mod = script.mod;
                                if ('up' in mod || 'down' in mod) {
                                    // todo: consider adding support for up/down as separate named exports
                                    // For now, make sure we reserve the names for future use
                                    this.error('Only "up" migrations are supported at this time, please use a default export', {
                                        exit: 1
                                    });
                                }
                                migration = mod.default;
                                if (fromExport && !dry) {
                                    this.error('Can only dry run migrations from a dataset export file', {
                                        exit: 1
                                    });
                                }
                                concurrency = flags.concurrency;
                                if (concurrency !== undefined) {
                                    if (concurrency > MAX_MUTATION_CONCURRENCY) {
                                        this.error("Concurrency exceeds the maximum allowed value of ".concat(MAX_MUTATION_CONCURRENCY), {
                                            exit: 1
                                        });
                                    }
                                    if (concurrency < 1) {
                                        this.error("Concurrency must be a positive number, got ".concat(concurrency), {
                                            exit: 1
                                        });
                                    }
                                }
                                return [
                                    4,
                                    getProjectCliClient({
                                        apiVersion: apiVersion,
                                        projectId: project !== null && project !== void 0 ? project : projectId,
                                        requireUser: true
                                    })
                                ];
                            case 8:
                                projectClient = _state.sent();
                                projectConfig = projectClient.config();
                                apiConfig = {
                                    apiHost: projectConfig.apiHost,
                                    apiVersion: apiVersion,
                                    dataset: dataset !== null && dataset !== void 0 ? dataset : datasetFromConfig,
                                    projectId: project !== null && project !== void 0 ? project : projectId,
                                    token: projectConfig.token
                                };
                                if (dry) {
                                    this.dryRunHandler(id, migration, apiConfig, fromExport);
                                    return [
                                        2
                                    ];
                                }
                                this.log("\n".concat(styleText([
                                    'yellow',
                                    'bold'
                                ], 'Note: During migrations, your webhooks stay active.')));
                                this.log("To adjust them, launch the management interface with ".concat(styleText('cyan', 'sanity manage'), ", navigate to the API settings, and toggle the webhooks before and after the migration as needed.\n"));
                                if (!flags.confirm) return [
                                    3,
                                    10
                                ];
                                return [
                                    4,
                                    this.promptConfirmMigrate(apiConfig)
                                ];
                            case 9:
                                _state.sent();
                                _state.label = 10;
                            case 10:
                                spin = spinner('Running migration "'.concat(id, '"')).start();
                                return [
                                    4,
                                    run({
                                        api: apiConfig,
                                        concurrency: concurrency,
                                        onProgress: this.createProgress(spin, flags, id, dry, apiConfig, migration)
                                    }, migration)
                                ];
                            case 11:
                                _state.sent();
                                spin.stop();
                                return [
                                    2
                                ];
                        }
                    });
                }).call(this);
            }
        },
        {
            key: "createProgress",
            value: function createProgress(progressSpinner, flags, id, dry, apiConfig, migration) {
                return function onProgress(progress) {
                    if (!flags.progress) {
                        progressSpinner.stop();
                        return;
                    }
                    if (progress.done) {
                        progressSpinner.text = 'Migration "'.concat(id, '" completed.\n\n  Project id:  ').concat(styleText('bold', apiConfig.projectId), "\n  Dataset:     ").concat(styleText('bold', apiConfig.dataset), "\n\n  ").concat(progress.documents, " documents processed.\n  ").concat(progress.mutations, " mutations generated.\n  ").concat(styleText('green', String(progress.completedTransactions.length)), " transactions committed.");
                        progressSpinner.stopAndPersist({
                            symbol: styleText('green', '✔')
                        });
                        return;
                    }
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(var _iterator = [
                            null
                        ].concat(_to_consumable_array(progress.currentTransactions))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var transaction = _step.value;
                            var _ref;
                            var _migration_documentTypes;
                            progressSpinner.text = 'Running migration "'.concat(id, '" ').concat(dry ? 'in dry mode...' : '...', "\n\n  Project id:     ").concat(styleText('bold', apiConfig.projectId), "\n  Dataset:        ").concat(styleText('bold', apiConfig.dataset), "\n  Document type:  ").concat(styleText('bold', (_ref = (_migration_documentTypes = migration.documentTypes) === null || _migration_documentTypes === void 0 ? void 0 : _migration_documentTypes.join(',')) !== null && _ref !== void 0 ? _ref : ''), "\n\n  ").concat(progress.documents, " documents processed…\n  ").concat(progress.mutations, " mutations generated…\n  ").concat(styleText('blue', String(progress.pending)), " requests pending…\n  ").concat(styleText('green', String(progress.completedTransactions.length)), " transactions committed.\n\n  ").concat(transaction && !progress.done ? "\xbb ".concat(prettyFormat({
                                indentSize: 2,
                                migration: migration,
                                subject: transaction
                            })) : '');
                            progressSpinner.stopAndPersist({
                                symbol: styleText('green', '✔')
                            });
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                };
            }
        },
        {
            key: "dryRunHandler",
            value: function dryRunHandler(id, migration, apiConfig, fromExport) {
                return _async_to_generator(function() {
                    var _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, mutation, err;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                this.log('Running migration "'.concat(id, '" in dry mode'));
                                if (fromExport) {
                                    this.log("Using export ".concat(styleText('cyan', fromExport)));
                                }
                                this.log();
                                this.log("Project id:  ".concat(styleText('bold', apiConfig.projectId)));
                                this.log("Dataset:     ".concat(styleText('bold', apiConfig.dataset)));
                                _iteratorAbruptCompletion = false, _didIteratorError = false;
                                _state.label = 1;
                            case 1:
                                _state.trys.push([
                                    1,
                                    6,
                                    7,
                                    12
                                ]);
                                _iterator = _async_iterator(dryRun({
                                    api: apiConfig,
                                    exportPath: fromExport
                                }, migration));
                                _state.label = 2;
                            case 2:
                                return [
                                    4,
                                    _iterator.next()
                                ];
                            case 3:
                                if (!(_iteratorAbruptCompletion = !(_step = _state.sent()).done)) return [
                                    3,
                                    5
                                ];
                                _value = _step.value;
                                mutation = _value;
                                if (!mutation) return [
                                    3,
                                    4
                                ];
                                this.log();
                                this.log(prettyFormat({
                                    migration: migration,
                                    subject: mutation
                                }));
                                _state.label = 4;
                            case 4:
                                _iteratorAbruptCompletion = false;
                                return [
                                    3,
                                    2
                                ];
                            case 5:
                                return [
                                    3,
                                    12
                                ];
                            case 6:
                                err = _state.sent();
                                _didIteratorError = true;
                                _iteratorError = err;
                                return [
                                    3,
                                    12
                                ];
                            case 7:
                                _state.trys.push([
                                    7,
                                    ,
                                    10,
                                    11
                                ]);
                                if (!(_iteratorAbruptCompletion && _iterator.return != null)) return [
                                    3,
                                    9
                                ];
                                return [
                                    4,
                                    _iterator.return()
                                ];
                            case 8:
                                _state.sent();
                                _state.label = 9;
                            case 9:
                                return [
                                    3,
                                    11
                                ];
                            case 10:
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                                return [
                                    7
                                ];
                            case 11:
                                return [
                                    7
                                ];
                            case 12:
                                return [
                                    2
                                ];
                        }
                    });
                }).call(this);
            }
        },
        {
            key: "promptConfirmMigrate",
            value: function promptConfirmMigrate(apiConfig) {
                return _async_to_generator(function() {
                    var response;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    confirm({
                                        message: "This migration will run on the ".concat(styleText([
                                            'yellow',
                                            'bold'
                                        ], apiConfig.dataset), " dataset in ").concat(styleText([
                                            'yellow',
                                            'bold'
                                        ], apiConfig.projectId), " project. Are you sure?")
                                    })
                                ];
                            case 1:
                                response = _state.sent();
                                if (!response) {
                                    runMigrationDebug('User aborted migration');
                                    this.exit(1);
                                }
                                return [
                                    2
                                ];
                        }
                    });
                }).call(this);
            }
        }
    ]);
    return RunMigrationCommand;
}(SanityCommand);
_define_property(RunMigrationCommand, "args", {
    id: Args.string({
        description: 'ID',
        required: false
    })
});
_define_property(RunMigrationCommand, "description", 'Run a migration against a dataset');
_define_property(RunMigrationCommand, "examples", [
    {
        command: '<%= config.bin %> <%= command.id %> <id>',
        description: 'dry run the migration'
    },
    {
        command: '<%= config.bin %> <%= command.id %> <id> --no-dry-run --project xyz --dataset staging',
        description: 'execute the migration against a dataset'
    },
    {
        command: '<%= config.bin %> <%= command.id %> <id> --from-export=production.tar.gz --no-dry-run --project xyz --dataset staging',
        description: 'execute the migration using a dataset export as the source'
    }
]);
_define_property(RunMigrationCommand, "flags", {
    'api-version': Flags.string({
        description: "API version to use when migrating. Defaults to ".concat(DEFAULT_API_VERSION, ".")
    }),
    concurrency: Flags.integer({
        default: DEFAULT_MUTATION_CONCURRENCY,
        description: "How many mutation requests to run in parallel. Must be between 1 and ".concat(MAX_MUTATION_CONCURRENCY, ". Default: ").concat(DEFAULT_MUTATION_CONCURRENCY, ".")
    }),
    confirm: Flags.boolean({
        allowNo: true,
        default: true,
        description: 'Prompt for confirmation before running the migration (default: true). Use --no-confirm to skip.'
    }),
    dataset: Flags.string({
        description: 'Dataset to migrate. Defaults to the dataset configured in your Sanity CLI config.'
    }),
    'dry-run': Flags.boolean({
        allowNo: true,
        default: true,
        description: 'By default the migration runs in dry mode. Use --no-dry-run to migrate dataset.'
    }),
    'from-export': Flags.string({
        description: 'Use a local dataset export as source for migration instead of calling the Sanity API. Note: this is only supported for dry runs.'
    }),
    progress: Flags.boolean({
        allowNo: true,
        default: true,
        description: 'Display progress during migration (default: true). Use --no-progress to hide output.'
    }),
    project: Flags.string({
        description: 'Project ID of the dataset to migrate. Defaults to the projectId configured in your Sanity CLI config.'
    })
});
_define_property(RunMigrationCommand, "hiddenAliases", [
    'migration:run'
]);
