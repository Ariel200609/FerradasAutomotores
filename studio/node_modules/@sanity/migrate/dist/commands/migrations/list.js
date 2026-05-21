function _assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
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
function _instanceof(left, right) {
    "@swc/helpers - instanceof";
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
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
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
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
import { styleText } from 'node:util';
import { SanityCommand, subdebug } from '@sanity/cli-core';
import { Table } from 'console-table-printer';
import { resolveMigrations } from '../../actions/migration/resolveMigrations.js';
var listMigrationDebug = subdebug('migration:list');
export var ListMigrationCommand = /*#__PURE__*/ function(SanityCommand) {
    "use strict";
    _inherits(ListMigrationCommand, SanityCommand);
    function ListMigrationCommand() {
        _class_call_check(this, ListMigrationCommand);
        return _call_super(this, ListMigrationCommand, arguments);
    }
    _create_class(ListMigrationCommand, [
        {
            key: "run",
            value: function run() {
                return _async_to_generator(function() {
                    var _ref, workDir, migrations, table, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, definedMigration, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    this.getProjectRoot()
                                ];
                            case 1:
                                _ref = _state.sent(), workDir = _ref.directory;
                                _state.label = 2;
                            case 2:
                                _state.trys.push([
                                    2,
                                    4,
                                    ,
                                    5
                                ]);
                                return [
                                    4,
                                    resolveMigrations(workDir)
                                ];
                            case 3:
                                migrations = _state.sent();
                                if (migrations.length === 0) {
                                    this.log('No migrations found in migrations folder of the project');
                                    this.log("\nRun ".concat(styleText('green', '`sanity migration create <NAME>`'), " to create a new migration"));
                                    return [
                                        2
                                    ];
                                }
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
                                    title: "Found ".concat(migrations.length, " migrations in project")
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
                                listMigrationDebug("Successfully listed ".concat(migrations.length, " migrations"));
                                return [
                                    3,
                                    5
                                ];
                            case 4:
                                error = _state.sent();
                                if (error.code === 'ENOENT') {
                                    this.log('No migrations folder found in the project');
                                    this.log("\nRun ".concat(styleText('green', '`sanity migration create <NAME>`'), " to create a new migration"));
                                    return [
                                        2
                                    ];
                                }
                                listMigrationDebug('Failed to list migrations:', error);
                                this.error("List migrations failed: ".concat(_instanceof(error, Error) ? error.message : String(error)), {
                                    exit: 1
                                });
                                return [
                                    3,
                                    5
                                ];
                            case 5:
                                return [
                                    2
                                ];
                        }
                    });
                }).call(this);
            }
        }
    ]);
    return ListMigrationCommand;
}(SanityCommand);
_define_property(ListMigrationCommand, "description", 'List available migrations');
_define_property(ListMigrationCommand, "examples", [
    {
        command: '<%= config.bin %> <%= command.id %>',
        description: 'List all available migrations in the project'
    }
]);
_define_property(ListMigrationCommand, "hiddenAliases", [
    'migration:list'
]);
