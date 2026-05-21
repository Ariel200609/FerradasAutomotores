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
function _await_async_generator(value) {
    return new _overload_yield(value, 0);
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
import arrify from 'arrify';
import { endpoints } from '../fetch-utils/endpoints.js';
import { fetchAsyncIterator } from '../fetch-utils/fetchStream.js';
import { toFetchOptions } from '../fetch-utils/sanityRequestOptions.js';
import { bufferThroughFile } from '../fs-webstream/bufferThroughFile.js';
import { concatStr } from '../it-utils/concatStr.js';
import { decodeText, parseJSON } from '../it-utils/index.js';
import { lastValueFrom } from '../it-utils/lastValueFrom.js';
import { mapAsync } from '../it-utils/mapAsync.js';
import { parse, stringify } from '../it-utils/ndjson.js';
import { tap } from '../it-utils/tap.js';
import { fromExportEndpoint, safeJsonParser } from '../sources/fromExportEndpoint.js';
import { asyncIterableToStream } from '../utils/asyncIterableToStream.js';
import { streamToAsyncIterator } from '../utils/streamToAsyncIterator.js';
import { collectMigrationMutations } from './collectMigrationMutations.js';
import { DEFAULT_MUTATION_CONCURRENCY, MAX_MUTATION_CONCURRENCY, MUTATION_ENDPOINT_MAX_BODY_SIZE } from './constants.js';
import { applyFilters } from './utils/applyFilters.js';
import { batchMutations } from './utils/batchMutations.js';
import { createContextClient } from './utils/createContextClient.js';
import { createFilteredDocumentsClient } from './utils/createFilteredDocumentsClient.js';
import { createBufferFile } from './utils/getBufferFile.js';
import { toSanityMutations } from './utils/toSanityMutations.js';
/**
 * @public
 */ export function toFetchOptionsIterable(apiConfig, mutations) {
    return _wrap_async_generator(function() {
        var _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, transaction, _apiConfig_apiHost, err;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _iteratorAbruptCompletion = false, _didIteratorError = false;
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        7,
                        8,
                        13
                    ]);
                    _iterator = _async_iterator(mutations);
                    _state.label = 2;
                case 2:
                    return [
                        4,
                        _await_async_generator(_iterator.next())
                    ];
                case 3:
                    if (!(_iteratorAbruptCompletion = !(_step = _state.sent()).done)) return [
                        3,
                        6
                    ];
                    _value = _step.value;
                    transaction = _value;
                    return [
                        4,
                        toFetchOptions({
                            apiHost: (_apiConfig_apiHost = apiConfig.apiHost) !== null && _apiConfig_apiHost !== void 0 ? _apiConfig_apiHost : 'api.sanity.io',
                            apiVersion: apiConfig.apiVersion,
                            body: JSON.stringify(transaction),
                            endpoint: endpoints.data.mutate(apiConfig.dataset, {
                                autoGenerateArrayKeys: true,
                                returnIds: true,
                                visibility: 'async'
                            }),
                            projectId: apiConfig.projectId,
                            tag: 'sanity.migration.mutate',
                            token: apiConfig.token
                        })
                    ];
                case 4:
                    _state.sent();
                    _state.label = 5;
                case 5:
                    _iteratorAbruptCompletion = false;
                    return [
                        3,
                        2
                    ];
                case 6:
                    return [
                        3,
                        13
                    ];
                case 7:
                    err = _state.sent();
                    _didIteratorError = true;
                    _iteratorError = err;
                    return [
                        3,
                        13
                    ];
                case 8:
                    _state.trys.push([
                        8,
                        ,
                        11,
                        12
                    ]);
                    if (!(_iteratorAbruptCompletion && _iterator.return != null)) return [
                        3,
                        10
                    ];
                    return [
                        4,
                        _await_async_generator(_iterator.return())
                    ];
                case 9:
                    _state.sent();
                    _state.label = 10;
                case 10:
                    return [
                        3,
                        12
                    ];
                case 11:
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                    return [
                        7
                    ];
                case 12:
                    return [
                        7
                    ];
                case 13:
                    return [
                        2
                    ];
            }
        });
    })();
}
/**
 * @public
 */ export function run(config, migration) {
    return _async_to_generator(function() {
        var _ref, _config_onProgress, stats, filteredDocuments, _tmp, abortController, createReader, _tmp1, client, filteredDocumentsClient, context, documents, mutations, concurrency, batches, submit, commits, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, result, _config_onProgress1, err;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    stats = {
                        completedTransactions: [],
                        currentTransactions: [],
                        documents: 0,
                        mutations: 0,
                        pending: 0,
                        queuedBatches: 0
                    };
                    _tmp = [
                        migration
                    ];
                    return [
                        4,
                        fromExportEndpoint(_object_spread({}, config.api, migration.documentTypes !== undefined && {
                            documentTypes: migration.documentTypes
                        }))
                    ];
                case 1:
                    filteredDocuments = applyFilters.apply(void 0, _tmp.concat([
                        parse.apply(void 0, [
                            decodeText.apply(void 0, [
                                streamToAsyncIterator.apply(void 0, [
                                    _state.sent()
                                ])
                            ]),
                            {
                                parse: safeJsonParser
                            }
                        ])
                    ]));
                    abortController = new AbortController();
                    _tmp1 = [
                        asyncIterableToStream(stringify(filteredDocuments))
                    ];
                    return [
                        4,
                        createBufferFile()
                    ];
                case 2:
                    createReader = bufferThroughFile.apply(void 0, _tmp1.concat([
                        _state.sent(),
                        {
                            signal: abortController.signal
                        }
                    ]));
                    client = createContextClient(_object_spread_props(_object_spread({}, config.api), {
                        requestTagPrefix: 'sanity.migration',
                        useCdn: false
                    }));
                    filteredDocumentsClient = createFilteredDocumentsClient(createReader);
                    context = {
                        client: client,
                        dryRun: false,
                        filtered: filteredDocumentsClient
                    };
                    documents = function documents() {
                        return tap(parse(decodeText(streamToAsyncIterator(createReader())), {
                            parse: safeJsonParser
                        }), function() {
                            var _config_onProgress;
                            (_config_onProgress = config.onProgress) === null || _config_onProgress === void 0 ? void 0 : _config_onProgress.call(config, _object_spread_props(_object_spread({}, stats), {
                                documents: ++stats.documents
                            }));
                        });
                    };
                    mutations = tap(collectMigrationMutations(migration, documents, context), function(muts) {
                        var _config_onProgress;
                        stats.currentTransactions = arrify(muts);
                        (_config_onProgress = config.onProgress) === null || _config_onProgress === void 0 ? void 0 : _config_onProgress.call(config, _object_spread_props(_object_spread({}, stats), {
                            mutations: ++stats.mutations
                        }));
                    });
                    concurrency = (_ref = config === null || config === void 0 ? void 0 : config.concurrency) !== null && _ref !== void 0 ? _ref : DEFAULT_MUTATION_CONCURRENCY;
                    if (concurrency > MAX_MUTATION_CONCURRENCY) {
                        throw new Error("Concurrency exceeds maximum allowed value (".concat(MAX_MUTATION_CONCURRENCY, ")"));
                    }
                    batches = tap(batchMutations(toSanityMutations(mutations), MUTATION_ENDPOINT_MAX_BODY_SIZE), function() {
                        var _config_onProgress;
                        (_config_onProgress = config.onProgress) === null || _config_onProgress === void 0 ? void 0 : _config_onProgress.call(config, _object_spread_props(_object_spread({}, stats), {
                            queuedBatches: ++stats.queuedBatches
                        }));
                    });
                    submit = function submit(opts) {
                        return _async_to_generator(function() {
                            return _ts_generator(this, function(_state) {
                                switch(_state.label){
                                    case 0:
                                        return [
                                            4,
                                            fetchAsyncIterator(opts)
                                        ];
                                    case 1:
                                        return [
                                            2,
                                            lastValueFrom.apply(void 0, [
                                                parseJSON.apply(void 0, [
                                                    concatStr.apply(void 0, [
                                                        decodeText.apply(void 0, [
                                                            _state.sent()
                                                        ])
                                                    ])
                                                ])
                                            ])
                                        ];
                                }
                            });
                        })();
                    };
                    return [
                        4,
                        mapAsync(toFetchOptionsIterable(config.api, batches), function(opts) {
                            var _config_onProgress;
                            (_config_onProgress = config.onProgress) === null || _config_onProgress === void 0 ? void 0 : _config_onProgress.call(config, _object_spread_props(_object_spread({}, stats), {
                                pending: ++stats.pending
                            }));
                            return submit(opts);
                        }, concurrency)
                    ];
                case 3:
                    commits = _state.sent();
                    _iteratorAbruptCompletion = false, _didIteratorError = false;
                    _state.label = 4;
                case 4:
                    _state.trys.push([
                        4,
                        9,
                        10,
                        15
                    ]);
                    _iterator = _async_iterator(commits);
                    _state.label = 5;
                case 5:
                    return [
                        4,
                        _iterator.next()
                    ];
                case 6:
                    if (!(_iteratorAbruptCompletion = !(_step = _state.sent()).done)) return [
                        3,
                        8
                    ];
                    _value = _step.value;
                    result = _value;
                    stats.completedTransactions.push(result);
                    (_config_onProgress1 = config.onProgress) === null || _config_onProgress1 === void 0 ? void 0 : _config_onProgress1.call(config, _object_spread({}, stats));
                    _state.label = 7;
                case 7:
                    _iteratorAbruptCompletion = false;
                    return [
                        3,
                        5
                    ];
                case 8:
                    return [
                        3,
                        15
                    ];
                case 9:
                    err = _state.sent();
                    _didIteratorError = true;
                    _iteratorError = err;
                    return [
                        3,
                        15
                    ];
                case 10:
                    _state.trys.push([
                        10,
                        ,
                        13,
                        14
                    ]);
                    if (!(_iteratorAbruptCompletion && _iterator.return != null)) return [
                        3,
                        12
                    ];
                    return [
                        4,
                        _iterator.return()
                    ];
                case 11:
                    _state.sent();
                    _state.label = 12;
                case 12:
                    return [
                        3,
                        14
                    ];
                case 13:
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                    return [
                        7
                    ];
                case 14:
                    return [
                        7
                    ];
                case 15:
                    (_config_onProgress = config.onProgress) === null || _config_onProgress === void 0 ? void 0 : _config_onProgress.call(config, _object_spread_props(_object_spread({}, stats), {
                        done: true
                    }));
                    // Cancel export/buffer stream, it's not needed anymore
                    abortController.abort();
                    return [
                        2
                    ];
            }
        });
    })();
}
