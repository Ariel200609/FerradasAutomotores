function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
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
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _overload_yield(value, kind) {
    this.v = value;
    this.k = kind;
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
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
import { expect, test } from 'vitest';
import { readFileAsWebStream } from '../../fs-webstream/readFileAsWebStream.js';
import { decodeText } from '../../it-utils/decodeText.js';
import { toArray } from '../../it-utils/toArray.js';
import { streamToAsyncIterator } from '../../utils/streamToAsyncIterator.js';
import { untar } from '../untar.js';
function extract(file) {
    return _wrap_async_generator(function() {
        var fileStream, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, _value1, header, body, content, err;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    fileStream = readFileAsWebStream(file);
                    _iteratorAbruptCompletion = false, _didIteratorError = false;
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        8,
                        9,
                        14
                    ]);
                    _iterator = _async_iterator(streamToAsyncIterator(untar(fileStream)));
                    _state.label = 2;
                case 2:
                    return [
                        4,
                        _await_async_generator(_iterator.next())
                    ];
                case 3:
                    if (!(_iteratorAbruptCompletion = !(_step = _state.sent()).done)) return [
                        3,
                        7
                    ];
                    _value = _step.value;
                    _value1 = _sliced_to_array(_value, 2), header = _value1[0], body = _value1[1];
                    return [
                        4,
                        _await_async_generator(toArray(decodeText(streamToAsyncIterator(body))))
                    ];
                case 4:
                    content = _state.sent();
                    return [
                        4,
                        [
                            header.name,
                            {
                                content: content,
                                type: header.type
                            }
                        ]
                    ];
                case 5:
                    _state.sent();
                    _state.label = 6;
                case 6:
                    _iteratorAbruptCompletion = false;
                    return [
                        3,
                        2
                    ];
                case 7:
                    return [
                        3,
                        14
                    ];
                case 8:
                    err = _state.sent();
                    _didIteratorError = true;
                    _iteratorError = err;
                    return [
                        3,
                        14
                    ];
                case 9:
                    _state.trys.push([
                        9,
                        ,
                        12,
                        13
                    ]);
                    if (!(_iteratorAbruptCompletion && _iterator.return != null)) return [
                        3,
                        11
                    ];
                    return [
                        4,
                        _await_async_generator(_iterator.return())
                    ];
                case 10:
                    _state.sent();
                    _state.label = 11;
                case 11:
                    return [
                        3,
                        13
                    ];
                case 12:
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                    return [
                        7
                    ];
                case 13:
                    return [
                        7
                    ];
                case 14:
                    return [
                        2
                    ];
            }
        });
    })();
}
test('untar a small file', function() {
    return _async_to_generator(function() {
        var values, _;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _ = Object.fromEntries;
                    return [
                        4,
                        toArray(extract("".concat(import.meta.dirname, "/fixtures/small.tar")))
                    ];
                case 1:
                    values = _.apply(Object, [
                        _state.sent()
                    ]);
                    expect(values).toEqual({
                        'a.txt': {
                            content: [
                                'a'
                            ],
                            type: 'file'
                        },
                        'b.txt': {
                            content: [
                                'b'
                            ],
                            type: 'file'
                        },
                        'c/': {
                            content: [],
                            type: 'directory'
                        },
                        'c/d/': {
                            content: [],
                            type: 'directory'
                        },
                        'c/d/e/': {
                            content: [],
                            type: 'directory'
                        },
                        'c/d/e/f.txt': {
                            content: [
                                'f'
                            ],
                            type: 'file'
                        },
                        'c/g.txt': {
                            content: [
                                'g'
                            ],
                            type: 'file'
                        }
                    });
                    return [
                        2
                    ];
            }
        });
    })();
});
