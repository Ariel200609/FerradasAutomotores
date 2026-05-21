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
import FIFO from 'fast-fifo';
import { concatUint8Arrays } from '../uint8arrays/index.js';
var EMPTY = new Uint8Array();
// Extracted from https://github.com/mafintosh/tar-stream/blob/master/extract.js#L8 and converted to ts
export var BufferList = /*#__PURE__*/ function() {
    "use strict";
    function BufferList() {
        _class_call_check(this, BufferList);
        _define_property(this, "buffered", 0);
        _define_property(this, "shifted", 0);
        _define_property(this, "_offset", void 0);
        _define_property(this, "queue", void 0);
        this.queue = new FIFO();
        this._offset = 0;
    }
    _create_class(BufferList, [
        {
            key: "push",
            value: function push(buffer) {
                this.buffered += buffer.byteLength;
                this.queue.push(buffer);
            }
        },
        {
            key: "shift",
            value: function shift(size) {
                if (size > this.buffered) return null;
                if (size === 0) return EMPTY;
                var chunk = this._next(size);
                if (size === chunk.byteLength) return chunk // likely case
                ;
                var chunks = [
                    chunk
                ];
                while((size -= chunk.byteLength) > 0){
                    chunk = this._next(size);
                    chunks.push(chunk);
                }
                return concatUint8Arrays(chunks);
            }
        },
        {
            key: "shiftFirst",
            value: function shiftFirst(size) {
                return this.buffered === 0 ? null : this._next(size);
            }
        },
        {
            key: "_next",
            value: function _next(size) {
                var buf = this.queue.peek();
                var rem = buf.byteLength - this._offset;
                if (size >= rem) {
                    var sub = this._offset ? buf.subarray(this._offset, buf.byteLength) : buf;
                    this.queue.shift();
                    this._offset = 0;
                    this.buffered -= rem;
                    this.shifted += rem;
                    return sub;
                }
                this.buffered -= size;
                this.shifted += size;
                return buf.subarray(this._offset, this._offset += size);
            }
        }
    ]);
    return BufferList;
}();
