function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
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
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
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
/**
 * Copied over from uint8array-extras to sort out ESM build issues. Should be replaced with imports from that module eventually
 */ var objectToString = Object.prototype.toString;
var uint8ArrayStringified = '[object Uint8Array]';
function isUint8Array(value) {
    if (!value) {
        return false;
    }
    if (value.constructor === Uint8Array) {
        return true;
    }
    return objectToString.call(value) === uint8ArrayStringified;
}
function assertUint8Array(value) {
    if (!isUint8Array(value)) {
        throw new TypeError("Expected `Uint8Array`, got `".concat(typeof value === "undefined" ? "undefined" : _type_of(value), "`"));
    }
}
export function concatUint8Arrays(arrays, totalLength) {
    if (arrays.length === 0) {
        return new Uint8Array(0);
    }
    totalLength !== null && totalLength !== void 0 ? totalLength : totalLength = arrays.reduce(function(accumulator, currentValue) {
        return accumulator + currentValue.length;
    }, 0);
    var returnValue = new Uint8Array(totalLength);
    var offset = 0;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = arrays[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var array = _step.value;
            assertUint8Array(array);
            returnValue.set(array, offset);
            offset += array.length;
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
    return returnValue;
}
export function areUint8ArraysEqual(a, b) {
    assertUint8Array(a);
    assertUint8Array(b);
    if (a === b) {
        return true;
    }
    if (a.length !== b.length) {
        return false;
    }
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = a.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = _sliced_to_array(_step.value, 2), index = _step_value[0], element = _step_value[1];
            if (element !== b[index]) {
                return false;
            }
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
    return true;
}
