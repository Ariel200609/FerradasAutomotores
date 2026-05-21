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
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { describe, expect, test } from 'vitest';
import { firstValueFrom } from '../../it-utils/firstValueFrom.js';
import { decodeText, parse } from '../../it-utils/index.js';
import { lastValueFrom } from '../../it-utils/lastValueFrom.js';
import { asyncIterableToStream } from '../../utils/asyncIterableToStream.js';
import { streamToAsyncIterator } from '../../utils/streamToAsyncIterator.js';
import { bufferThroughFile } from '../bufferThroughFile.js';
var sleep = function sleep(ms) {
    return new Promise(function(resolve) {
        return setTimeout(resolve, ms);
    });
};
var id = 0;
var getTestBufferFileName = function getTestBufferFileName() {
    return path.join(import.meta.dirname, '.tmp', "buffer-".concat(id++, ".ndjson"));
};
describe('using primary stream', function() {
    test('stops buffering when the consumer is done', function() {
        return _async_to_generator(function() {
            var encoder, bufferFile, abortController, createReader, fileBufferStream, lines, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, chunk, err, bufferFileSize;
            function gen() {
                return _wrap_async_generator(function() {
                    var n;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                n = 0;
                                _state.label = 1;
                            case 1:
                                if (!(n < 100)) return [
                                    3,
                                    7
                                ];
                                return [
                                    4,
                                    encoder.encode('{"foo": '.concat(n, ","))
                                ];
                            case 2:
                                _state.sent();
                                // simulate a bit of delay in the producer (which is often the case)
                                // oxlint-disable-next-line no-await-in-loop
                                return [
                                    4,
                                    _await_async_generator(sleep(1))
                                ];
                            case 3:
                                _state.sent();
                                return [
                                    4,
                                    encoder.encode('"bar": '.concat(n, ', "baz": ').concat(n, "}"))
                                ];
                            case 4:
                                _state.sent();
                                return [
                                    4,
                                    encoder.encode('\n')
                                ];
                            case 5:
                                _state.sent();
                                _state.label = 6;
                            case 6:
                                n++;
                                return [
                                    3,
                                    1
                                ];
                            case 7:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        encoder = new TextEncoder();
                        bufferFile = getTestBufferFileName();
                        abortController = new AbortController();
                        createReader = bufferThroughFile(asyncIterableToStream(gen()), bufferFile, {
                            keepFile: true,
                            signal: abortController.signal
                        });
                        fileBufferStream = createReader();
                        lines = [];
                        _iteratorAbruptCompletion = false, _didIteratorError = false;
                        _state.label = 1;
                    case 1:
                        _state.trys.push([
                            1,
                            7,
                            8,
                            13
                        ]);
                        _iterator = _async_iterator(parse(decodeText(streamToAsyncIterator(fileBufferStream))));
                        _state.label = 2;
                    case 2:
                        return [
                            4,
                            _iterator.next()
                        ];
                    case 3:
                        if (!(_iteratorAbruptCompletion = !(_step = _state.sent()).done)) return [
                            3,
                            6
                        ];
                        _value = _step.value;
                        chunk = _value;
                        lines.push(chunk);
                        if (lines.length === 3) {
                            // we only pick 3 lines and break out of the iteration. This should stop the buffering
                            return [
                                3,
                                6
                            ];
                        }
                        // simulate a slow consumer
                        // (the bufferThroughFile stream should still continue to write to the file as fast as possible)
                        return [
                            4,
                            sleep(10)
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
                            _iterator.return()
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
                        expect(lines).toEqual([
                            {
                                bar: 0,
                                baz: 0,
                                foo: 0
                            },
                            {
                                bar: 1,
                                baz: 1,
                                foo: 1
                            },
                            {
                                bar: 2,
                                baz: 2,
                                foo: 2
                            }
                        ]);
                        // Note: the stream needs to be explicitly aborted, otherwise the source stream will run to completion
                        // would be nice if there was a way to "unref()" the file handle to prevent it from blocking the process,
                        // but I don't think there is
                        abortController.abort();
                        return [
                            4,
                            stat(bufferFile)
                        ];
                    case 14:
                        bufferFileSize = _state.sent().size;
                        expect(bufferFileSize).toBeGreaterThan(90);
                        // but not the full 100 lines
                        expect(bufferFileSize).toBeLessThan(3270);
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('it runs to completion if consumer needs it', function() {
        return _async_to_generator(function() {
            var encoder, bufferFile, controller, createReader, fileBufferStream, lines, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, chunk, err;
            function gen() {
                return _wrap_async_generator(function() {
                    var n;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                n = 0;
                                _state.label = 1;
                            case 1:
                                if (!(n < 100)) return [
                                    3,
                                    7
                                ];
                                return [
                                    4,
                                    encoder.encode('{"foo": '.concat(n, ","))
                                ];
                            case 2:
                                _state.sent();
                                // simulate a bit of delay in the producer (which is often the case)
                                return [
                                    4,
                                    _await_async_generator(sleep(1))
                                ];
                            case 3:
                                _state.sent();
                                return [
                                    4,
                                    encoder.encode('"bar": '.concat(n, ', "baz": ').concat(n, "}"))
                                ];
                            case 4:
                                _state.sent();
                                return [
                                    4,
                                    encoder.encode('\n')
                                ];
                            case 5:
                                _state.sent();
                                _state.label = 6;
                            case 6:
                                n++;
                                return [
                                    3,
                                    1
                                ];
                            case 7:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        encoder = new TextEncoder();
                        bufferFile = getTestBufferFileName();
                        controller = new AbortController();
                        createReader = bufferThroughFile(asyncIterableToStream(gen()), bufferFile, {
                            keepFile: true,
                            signal: controller.signal
                        });
                        fileBufferStream = createReader();
                        lines = [];
                        _iteratorAbruptCompletion = false, _didIteratorError = false;
                        _state.label = 1;
                    case 1:
                        _state.trys.push([
                            1,
                            6,
                            7,
                            12
                        ]);
                        _iterator = _async_iterator(parse(decodeText(streamToAsyncIterator(fileBufferStream))));
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
                        chunk = _value;
                        if (lines.length < 3) {
                            // in contrast to the test above, we don't break out of the iteration early, but let it run to completion
                            lines.push(chunk);
                        }
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
                        expect(lines).toEqual([
                            {
                                bar: 0,
                                baz: 0,
                                foo: 0
                            },
                            {
                                bar: 1,
                                baz: 1,
                                foo: 1
                            },
                            {
                                bar: 2,
                                baz: 2,
                                foo: 2
                            }
                        ]);
                        return [
                            4,
                            stat(bufferFile)
                        ];
                    case 13:
                        // This asserts that buffer file contains all the yielded lines
                        expect.apply(void 0, [
                            _state.sent().size
                        ]).toBe(3270);
                        return [
                            2
                        ];
                }
            });
        })();
    });
});
describe('using secondary stream', function() {
    test('stops buffering when the consumer is done', function() {
        return _async_to_generator(function() {
            var encoder, bufferFile, abortController, createReader, fileBufferStream, lines, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, chunk, _, _tmp, err;
            function gen() {
                return _wrap_async_generator(function() {
                    var n;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                n = 0;
                                _state.label = 1;
                            case 1:
                                if (!(n < 100)) return [
                                    3,
                                    6
                                ];
                                return [
                                    4,
                                    encoder.encode('{"foo": '.concat(n, ","))
                                ];
                            case 2:
                                _state.sent();
                                // simulate a bit of delay in the producer (which is often the case)
                                return [
                                    4,
                                    encoder.encode('"bar": '.concat(n, ', "baz": ').concat(n, "}"))
                                ];
                            case 3:
                                _state.sent();
                                return [
                                    4,
                                    encoder.encode('\n')
                                ];
                            case 4:
                                _state.sent();
                                _state.label = 5;
                            case 5:
                                n++;
                                return [
                                    3,
                                    1
                                ];
                            case 6:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        encoder = new TextEncoder();
                        bufferFile = getTestBufferFileName();
                        abortController = new AbortController();
                        createReader = bufferThroughFile(asyncIterableToStream(gen()), bufferFile, {
                            keepFile: true,
                            signal: abortController.signal
                        });
                        fileBufferStream = createReader();
                        lines = [];
                        _iteratorAbruptCompletion = false, _didIteratorError = false;
                        _state.label = 1;
                    case 1:
                        _state.trys.push([
                            1,
                            7,
                            8,
                            13
                        ]);
                        _iterator = _async_iterator(parse(decodeText(streamToAsyncIterator(fileBufferStream))));
                        _state.label = 2;
                    case 2:
                        return [
                            4,
                            _iterator.next()
                        ];
                    case 3:
                        if (!(_iteratorAbruptCompletion = !(_step = _state.sent()).done)) return [
                            3,
                            6
                        ];
                        _value = _step.value;
                        chunk = _value;
                        _ = lines.push;
                        _tmp = [
                            chunk
                        ];
                        return [
                            4,
                            lastValueFrom(parse(decodeText(streamToAsyncIterator(createReader()))))
                        ];
                    case 4:
                        _.apply(lines, _tmp.concat([
                            _state.sent()
                        ]));
                        if (lines.length === 6) {
                            return [
                                3,
                                6
                            ];
                        }
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
                            _iterator.return()
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
                        abortController.abort();
                        expect(lines).toEqual([
                            {
                                bar: 0,
                                baz: 0,
                                foo: 0
                            },
                            {
                                bar: 99,
                                baz: 99,
                                foo: 99
                            },
                            {
                                bar: 1,
                                baz: 1,
                                foo: 1
                            },
                            {
                                bar: 99,
                                baz: 99,
                                foo: 99
                            },
                            {
                                bar: 2,
                                baz: 2,
                                foo: 2
                            },
                            {
                                bar: 99,
                                baz: 99,
                                foo: 99
                            }
                        ]);
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('ends when the primary stream completes', function() {
        return _async_to_generator(function() {
            var encoder, bufferFile, createReader, primary, first, last;
            function gen() {
                return _wrap_async_generator(function() {
                    var n;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                n = 0;
                                _state.label = 1;
                            case 1:
                                if (!(n < 100)) return [
                                    3,
                                    6
                                ];
                                return [
                                    4,
                                    encoder.encode('{"foo": '.concat(n, ","))
                                ];
                            case 2:
                                _state.sent();
                                return [
                                    4,
                                    encoder.encode('"bar": '.concat(n, ', "baz": ').concat(n, "}"))
                                ];
                            case 3:
                                _state.sent();
                                return [
                                    4,
                                    encoder.encode('\n')
                                ];
                            case 4:
                                _state.sent();
                                _state.label = 5;
                            case 5:
                                n++;
                                return [
                                    3,
                                    1
                                ];
                            case 6:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        encoder = new TextEncoder();
                        bufferFile = getTestBufferFileName();
                        createReader = bufferThroughFile(asyncIterableToStream(gen()), bufferFile);
                        primary = createReader();
                        first = firstValueFrom(parse(decodeText(streamToAsyncIterator(primary))));
                        last = lastValueFrom(parse(decodeText(streamToAsyncIterator(createReader()))));
                        return [
                            4,
                            first
                        ];
                    case 1:
                        expect.apply(void 0, [
                            _state.sent()
                        ]).toEqual({
                            bar: 0,
                            baz: 0,
                            foo: 0
                        });
                        return [
                            4,
                            primary.cancel()
                        ];
                    case 2:
                        _state.sent();
                        return [
                            4,
                            last
                        ];
                    case 3:
                        expect.apply(void 0, [
                            _state.sent()
                        ]).toEqual({
                            bar: 99,
                            baz: 99,
                            foo: 99
                        });
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('throws if a new stream is created after abortion', function() {
        return _async_to_generator(function() {
            var encoder, bufferFile, controller, createReader, primary, first;
            function gen() {
                return _wrap_async_generator(function() {
                    var n;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                n = 0;
                                _state.label = 1;
                            case 1:
                                if (!(n < 100)) return [
                                    3,
                                    6
                                ];
                                return [
                                    4,
                                    encoder.encode('{"foo": '.concat(n, ","))
                                ];
                            case 2:
                                _state.sent();
                                return [
                                    4,
                                    encoder.encode('"bar": '.concat(n, ', "baz": ').concat(n, "}"))
                                ];
                            case 3:
                                _state.sent();
                                return [
                                    4,
                                    encoder.encode('\n')
                                ];
                            case 4:
                                _state.sent();
                                _state.label = 5;
                            case 5:
                                n++;
                                return [
                                    3,
                                    1
                                ];
                            case 6:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        encoder = new TextEncoder();
                        bufferFile = getTestBufferFileName();
                        controller = new AbortController();
                        createReader = bufferThroughFile(asyncIterableToStream(gen()), bufferFile, {
                            keepFile: true,
                            signal: controller.signal
                        });
                        primary = createReader();
                        return [
                            4,
                            firstValueFrom(parse(decodeText(streamToAsyncIterator(primary))))
                        ];
                    case 1:
                        first = _state.sent();
                        expect(first).toEqual({
                            bar: 0,
                            baz: 0,
                            foo: 0
                        });
                        return [
                            4,
                            primary.cancel()
                        ];
                    case 2:
                        _state.sent();
                        controller.abort();
                        return [
                            4,
                            expect(function() {
                                return lastValueFrom(parse(decodeText(streamToAsyncIterator(createReader()))));
                            }).rejects.toThrowErrorMatchingInlineSnapshot('[Error: Cannot create new buffered readers on aborted stream]')
                        ];
                    case 3:
                        _state.sent();
                        return [
                            2
                        ];
                }
            });
        })();
    });
});
describe('cleanup', function() {
    test('cleans up the file after cancel', function() {
        return _async_to_generator(function() {
            var encoder, bufferFile, controller, createReader, reader, first;
            function gen() {
                return _wrap_async_generator(function() {
                    var n;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                n = 0;
                                _state.label = 1;
                            case 1:
                                if (!(n < 100)) return [
                                    3,
                                    6
                                ];
                                return [
                                    4,
                                    encoder.encode('{"foo": '.concat(n, ","))
                                ];
                            case 2:
                                _state.sent();
                                return [
                                    4,
                                    encoder.encode('"bar": '.concat(n, ', "baz": ').concat(n, "}"))
                                ];
                            case 3:
                                _state.sent();
                                return [
                                    4,
                                    encoder.encode('\n')
                                ];
                            case 4:
                                _state.sent();
                                _state.label = 5;
                            case 5:
                                n++;
                                return [
                                    3,
                                    1
                                ];
                            case 6:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        encoder = new TextEncoder();
                        bufferFile = getTestBufferFileName();
                        controller = new AbortController();
                        createReader = bufferThroughFile(asyncIterableToStream(gen()), bufferFile, {
                            signal: controller.signal
                        });
                        reader = createReader();
                        return [
                            4,
                            firstValueFrom(parse(decodeText(streamToAsyncIterator(reader))))
                        ];
                    case 1:
                        first = _state.sent();
                        expect(first).toEqual({
                            bar: 0,
                            baz: 0,
                            foo: 0
                        });
                        return [
                            4,
                            reader.cancel()
                        ];
                    case 2:
                        _state.sent();
                        return [
                            4,
                            sleep(10)
                        ];
                    case 3:
                        _state.sent();
                        return [
                            4,
                            expect(stat(bufferFile)).rejects.toThrow(/ENOENT|EPERM/)
                        ];
                    case 4:
                        _state.sent();
                        return [
                            2
                        ];
                }
            });
        })();
    });
    test('cleans up after the abortController aborts', function() {
        return _async_to_generator(function() {
            var encoder, bufferFile, controller, createReader, firstReader, first, second;
            function gen() {
                return _wrap_async_generator(function() {
                    var n;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                n = 0;
                                _state.label = 1;
                            case 1:
                                if (!(n < 100)) return [
                                    3,
                                    6
                                ];
                                return [
                                    4,
                                    encoder.encode('{"foo": '.concat(n, ","))
                                ];
                            case 2:
                                _state.sent();
                                return [
                                    4,
                                    encoder.encode('"bar": '.concat(n, ', "baz": ').concat(n, "}"))
                                ];
                            case 3:
                                _state.sent();
                                return [
                                    4,
                                    encoder.encode('\n')
                                ];
                            case 4:
                                _state.sent();
                                _state.label = 5;
                            case 5:
                                n++;
                                return [
                                    3,
                                    1
                                ];
                            case 6:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        encoder = new TextEncoder();
                        bufferFile = getTestBufferFileName();
                        controller = new AbortController();
                        createReader = bufferThroughFile(asyncIterableToStream(gen()), bufferFile, {
                            signal: controller.signal
                        });
                        firstReader = createReader();
                        return [
                            4,
                            firstValueFrom(parse(decodeText(streamToAsyncIterator(firstReader))))
                        ];
                    case 1:
                        first = _state.sent();
                        expect(first).toEqual({
                            bar: 0,
                            baz: 0,
                            foo: 0
                        });
                        return [
                            4,
                            lastValueFrom(parse(decodeText(streamToAsyncIterator(firstReader))))
                        ];
                    case 2:
                        second = _state.sent();
                        expect(second).toEqual({
                            bar: 99,
                            baz: 99,
                            foo: 99
                        });
                        controller.abort();
                        return [
                            4,
                            sleep(10)
                        ];
                    case 3:
                        _state.sent();
                        return [
                            4,
                            expect(stat(bufferFile)).rejects.toThrow('ENOENT')
                        ];
                    case 4:
                        _state.sent();
                        return [
                            2
                        ];
                }
            });
        })();
    });
});
