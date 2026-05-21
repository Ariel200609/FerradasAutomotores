function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
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
import { isIndexSegment, isIndexTuple, isKeySegment } from '@sanity/types';
// copy/paste of `pathToString` from 'sanity' to prevent circular imports
function pathToString(path) {
    if (!Array.isArray(path)) {
        throw new TypeError('Path is not an array');
    }
    var target = '';
    var i = 0;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = path[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var segment = _step.value;
            if (isIndexSegment(segment)) {
                target = "".concat(target, "[").concat(segment, "]");
            } else if (isKeySegment(segment) && segment._key) {
                target = "".concat(target, '[_key=="').concat(segment._key, '"]');
            } else if (isIndexTuple(segment)) {
                var _segment = _sliced_to_array(segment, 2), from = _segment[0], to = _segment[1];
                target = "".concat(target, "[").concat(from, ":").concat(to, "]");
            } else if (typeof segment === 'string') {
                var separator = i === 0 ? '' : '.';
                target = "".concat(target).concat(separator).concat(segment);
            } else {
                throw new TypeError("Unsupported path segment `".concat(JSON.stringify(segment), "`"));
            }
            i++;
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
    return target;
}
/**
 * Recursively calculates the max length of all the keys in the given validation
 * tree respecting extra length due to indentation depth. Used to calculate the
 * padding for the rest of the tree.
 */ export var maxKeyLength = function maxKeyLength1() {
    var children = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, depth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    var max = 0;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = Object.entries(children)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = _sliced_to_array(_step.value, 2), key = _step_value[0], child = _step_value[1];
            var currentMax = Math.max(key.length + depth * 2, maxKeyLength(child.children, depth + 1));
            max = Math.max(max, currentMax);
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
    return max;
};
/**
 * Recursively formats a given tree into a printed user-friendly tree structure
 */ export var formatTree = function formatTree1(param) {
    var getMessage = param.getMessage, tmp = param.getNodes, getLeaves = tmp === void 0 ? function(param) {
        var nodes = param.nodes;
        return nodes;
    } : tmp, _param_indent = param.indent, indent = _param_indent === void 0 ? '' : _param_indent, _param_node = param.node, node = _param_node === void 0 ? {} : _param_node, paddingLength = param.paddingLength;
    var entries = Object.entries(node);
    return entries.map(function(param, index) {
        var _param = _sliced_to_array(param, 2), key = _param[0], child = _param[1];
        var isLast = index === entries.length - 1;
        var nextIndent = "".concat(indent).concat(isLast ? '  ' : '│ ');
        var leaves = getLeaves(child);
        var nested = formatTree({
            getMessage: getMessage,
            getNodes: getLeaves,
            indent: nextIndent,
            node: child.children,
            paddingLength: paddingLength
        });
        if (!(leaves === null || leaves === void 0 ? void 0 : leaves.length)) {
            var current = "".concat(indent).concat(isLast ? '└' : '├', "─ ").concat(key);
            return [
                current,
                nested
            ].filter(Boolean).join('\n');
        }
        var first = leaves[0];
        var rest = leaves.slice(1);
        if (!first) return '';
        var firstPadding = '.'.repeat(paddingLength - indent.length - key.length);
        var elbow = isLast ? '└' : '├';
        var subsequentPadding = ' '.repeat(paddingLength - indent.length + 2);
        var firstMessage = "".concat(indent).concat(elbow, "─ ").concat(key, " ").concat(firstPadding, " ").concat(getMessage(first));
        var subsequentMessages = rest.map(function(marker) {
            return "".concat(nextIndent).concat(subsequentPadding, " ").concat(getMessage(marker));
        }).join('\n');
        var current1 = [
            firstMessage,
            subsequentMessages
        ].filter(Boolean).join('\n');
        return [
            current1,
            nested
        ].filter(Boolean).join('\n');
    }).join('\n');
};
/**
 * Converts a set of markers with paths into a tree of markers where the paths
 * are embedded in the tree
 */ export function convertToTree(nodes) {
    var root = {};
    // add the markers to the tree
    function addNode(node) {
        var tree = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : root;
        // if we've traversed the whole path
        if (node.path.length === 0) {
            if (!tree.nodes) tree.nodes = []; // ensure markers is defined
            // then add the marker to the front
            tree.nodes.push(node);
            return;
        }
        var current = node.path[0];
        var rest = node.path.slice(1);
        if (!current) return;
        var key = pathToString([
            current
        ]);
        // ensure the current node has children and the next node
        if (!tree.children) tree.children = {};
        if (!(key in tree.children)) tree.children[key] = {};
        addNode(_object_spread_props(_object_spread({}, node), {
            path: rest
        }), tree.children[key]);
    }
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var node = _step.value;
            addNode(node);
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
    return root;
}
