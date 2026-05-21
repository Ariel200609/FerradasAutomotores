// Extracted from https://github.com/mafintosh/tar-stream/blob/master/headers.js
// Converted to TypeScript and removed reliance on Node Buffers
import { areUint8ArraysEqual } from '../uint8arrays/index.js';
var ZERO_OFFSET = '0'.codePointAt(0);
var USTAR_MAGIC = new Uint8Array([
    0x75,
    0x73,
    0x74,
    0x61,
    0x72,
    0x00
]) // ustar\x00
;
var GNU_MAGIC = new Uint8Array([
    0x75,
    0x73,
    0x74,
    0x61,
    0x72,
    0x20
]) // ustar\x20
;
var GNU_VER = new Uint8Array([
    0x20,
    0x00
]);
var MAGIC_OFFSET = 257;
var VERSION_OFFSET = 263;
export function decode(buf, filenameEncoding, allowUnknownFormat) {
    var typeflag = buf[156] === 0 ? 0 : buf[156] - ZERO_OFFSET;
    var name = decodeStr(buf, 0, 100, filenameEncoding);
    var mode = decodeOct(buf, 100, 8);
    var uid = decodeOct(buf, 108, 8);
    var gid = decodeOct(buf, 116, 8);
    var size = decodeOct(buf, 124, 12);
    var mtime = decodeOct(buf, 136, 12);
    var type = toType(typeflag);
    var linkname = buf[157] === 0 ? null : decodeStr(buf, 157, 100, filenameEncoding);
    var uname = decodeStr(buf, 265, 32);
    var gname = decodeStr(buf, 297, 32);
    var devmajor = decodeOct(buf, 329, 8);
    var devminor = decodeOct(buf, 337, 8);
    var c = cksum(buf);
    // checksum is still initial value if header was null.
    if (c === 8 * 32) return null;
    // valid checksum
    if (c !== decodeOct(buf, 148, 8)) {
        throw new Error('Invalid tar header. Maybe the tar is corrupted or it needs to be gunzipped?');
    }
    if (isUSTAR(buf)) {
        // ustar (posix) format.
        // prepend prefix, if present.
        if (buf[345]) name = "".concat(decodeStr(buf, 345, 155, filenameEncoding), "/").concat(name);
    } else if (isGNU(buf)) {
    // 'gnu'/'oldgnu' format. Similar to ustar, but has support for incremental and
    // multi-volume tarballs.
    } else if (!allowUnknownFormat) {
        throw new Error('Invalid tar header: unknown format.');
    }
    return {
        devmajor: devmajor,
        devminor: devminor,
        gid: gid,
        gname: gname,
        linkname: linkname,
        mode: mode,
        mtime: mtime ? new Date(1000 * mtime) : null,
        name: name,
        size: size,
        type: type,
        uid: uid,
        uname: uname
    };
}
function isUSTAR(buf) {
    return areUint8ArraysEqual(USTAR_MAGIC, buf.subarray(MAGIC_OFFSET, MAGIC_OFFSET + 6));
}
function isGNU(buf) {
    return areUint8ArraysEqual(GNU_MAGIC, buf.subarray(MAGIC_OFFSET, MAGIC_OFFSET + 6)) && areUint8ArraysEqual(GNU_VER, buf.subarray(VERSION_OFFSET, VERSION_OFFSET + 2));
}
function clamp(index, len, defaultValue) {
    if (typeof index !== 'number') return defaultValue;
    index = Math.trunc(index); // Coerce to integer.
    if (index >= len) return len;
    if (index >= 0) return index;
    index += len;
    if (index >= 0) return index;
    return 0;
}
function toType(flag) {
    switch(flag){
        case 0:
            {
                return 'file';
            }
        case 1:
            {
                return 'link';
            }
        case 2:
            {
                return 'symlink';
            }
        case 3:
            {
                return 'character-device';
            }
        case 4:
            {
                return 'block-device';
            }
        case 5:
            {
                return 'directory';
            }
        case 6:
            {
                return 'fifo';
            }
        case 7:
            {
                return 'contiguous-file';
            }
        case 27:
            {
                return 'gnu-long-link-path';
            }
        case 28:
        case 30:
            {
                return 'gnu-long-path';
            }
        case 55:
            {
                return 'pax-global-header';
            }
        case 72:
            {
                return 'pax-header';
            }
        default:
            {
                return null;
            }
    }
}
function indexOf(block, num, offset, end) {
    for(; offset < end; offset++){
        if (block[offset] === num) return offset;
    }
    return end;
}
function cksum(block) {
    var sum = 8 * 32;
    for(var i = 0; i < 148; i++)sum += block[i];
    for(var j = 156; j < 512; j++)sum += block[j];
    return sum;
}
/* Copied from the node-tar repo and modified to meet
 * tar-stream coding standard.
 *
 * Source: https://github.com/npm/node-tar/blob/51b6627a1f357d2eb433e7378e5f05e83b7aa6cd/lib/header.js#L349
 */ function parse256(buf) {
    // first byte MUST be either 80 or FF
    // 80 for positive, FF for 2's comp
    var positive;
    if (buf[0] === 0x80) positive = true;
    else if (buf[0] === 0xff) positive = false;
    else return null;
    // build up a base-256 tuple from the least sig to the highest
    var tuple = [];
    var i;
    for(i = buf.length - 1; i > 0; i--){
        var byte = buf[i];
        if (positive) tuple.push(byte);
        else tuple.push(0xff - byte);
    }
    var sum = 0;
    var l = tuple.length;
    for(i = 0; i < l; i++){
        sum += tuple[i] * Math.pow(256, i);
    }
    return positive ? sum : -1 * sum;
}
var decoders = {};
var getCachedDecoder = function getCachedDecoder(encoding) {
    if (!(encoding in decoders)) {
        decoders[encoding] = new TextDecoder(encoding);
    }
    return decoders[encoding];
};
function toString(uint8) {
    var encoding = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'utf8';
    return getCachedDecoder(encoding).decode(uint8);
}
function decodeOct(val, offset, length) {
    val = val.subarray(offset, offset + length);
    offset = 0;
    // If prefixed with 0x80 then parse as a base-256 integer
    if (val[offset] & 0x80) {
        return parse256(val);
    }
    // Older versions of tar can prefix with spaces
    while(offset < val.length && val[offset] === 32)offset++;
    var end = clamp(indexOf(val, 32, offset, val.length), val.length, val.length);
    while(offset < end && val[offset] === 0)offset++;
    if (end === offset) return 0;
    return Number.parseInt(toString(val.subarray(offset, end)), 8);
}
function decodeStr(val, offset, length, encoding) {
    return toString(val.subarray(offset, indexOf(val, 0, offset, offset + length)), encoding);
}
