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
import { access, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { styleText } from 'node:util';
import { Args } from '@oclif/core';
import { SanityCommand } from '@sanity/cli-core';
import { confirm, input, select } from '@sanity/cli-core/ux';
import { getMigrationRootDirectory } from '../../actions/migration/getMigrationRootDirectory.js';
import { minimalAdvanced, minimalSimple, renameField, renameType, stringToPTE } from '../../actions/migration/templates/index.js';
import { MIGRATIONS_DIRECTORY } from '../../utils/migration/constants.js';
var TEMPLATES = [
    {
        name: 'Minimalistic migration to get you started',
        template: minimalSimple
    },
    {
        name: 'Rename an object type',
        template: renameType
    },
    {
        name: 'Rename a field',
        template: renameField
    },
    {
        name: 'Convert string field to Portable Text',
        template: stringToPTE
    },
    {
        name: 'Advanced template using async iterators providing more fine grained control',
        template: minimalAdvanced
    }
];
export var CreateMigrationCommand = /*#__PURE__*/ function(SanityCommand) {
    "use strict";
    _inherits(CreateMigrationCommand, SanityCommand);
    function CreateMigrationCommand() {
        _class_call_check(this, CreateMigrationCommand);
        return _call_super(this, CreateMigrationCommand, arguments);
    }
    _create_class(CreateMigrationCommand, [
        {
            key: "run",
            value: function run() {
                return _async_to_generator(function() {
                    var args, workDir, title, types, template, renderedTemplate, sluggedName, destDir, definitionFile, dirCreated;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    this.parse(CreateMigrationCommand)
                                ];
                            case 1:
                                args = _state.sent().args;
                                return [
                                    4,
                                    getMigrationRootDirectory(this.output)
                                ];
                            case 2:
                                workDir = _state.sent();
                                return [
                                    4,
                                    this.promptForTitle(args.title)
                                ];
                            case 3:
                                title = _state.sent();
                                return [
                                    4,
                                    this.promptForDocumentTypes()
                                ];
                            case 4:
                                types = _state.sent();
                                return [
                                    4,
                                    this.promptForTemplate()
                                ];
                            case 5:
                                template = _state.sent().template;
                                renderedTemplate = (template || minimalSimple)({
                                    documentTypes: types.split(',').map(function(t) {
                                        return t.trim();
                                    }).filter(Boolean),
                                    migrationName: title
                                });
                                sluggedName = title.toLowerCase().normalize('NFD').replaceAll(RegExp("[\\u0300-\\u036F\\u0483-\\u0487\\u0591-\\u05BD\\u05BF\\u05C1-\\u05C2\\u05C4-\\u05C5\\u05C7\\u0610-\\u061A\\u064B-\\u065F\\u0670\\u06D6-\\u06DC\\u06DF-\\u06E4\\u06E7-\\u06E8\\u06EA-\\u06ED\\u0711\\u0730-\\u074A\\u07A6-\\u07B0\\u07EB-\\u07F3\\u07FD\\u0816-\\u0819\\u081B-\\u0823\\u0825-\\u0827\\u0829-\\u082D\\u0859-\\u085B\\u0897-\\u089F\\u08CA-\\u08E1\\u08E3-\\u0902\\u093A\\u093C\\u0941-\\u0948\\u094D\\u0951-\\u0957\\u0962-\\u0963\\u0981\\u09BC\\u09C1-\\u09C4\\u09CD\\u09E2-\\u09E3\\u09FE\\u0A01-\\u0A02\\u0A3C\\u0A41-\\u0A42\\u0A47-\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A70-\\u0A71\\u0A75\\u0A81-\\u0A82\\u0ABC\\u0AC1-\\u0AC5\\u0AC7-\\u0AC8\\u0ACD\\u0AE2-\\u0AE3\\u0AFA-\\u0AFF\\u0B01\\u0B3C\\u0B3F\\u0B41-\\u0B44\\u0B4D\\u0B55-\\u0B56\\u0B62-\\u0B63\\u0B82\\u0BC0\\u0BCD\\u0C00\\u0C04\\u0C3C\\u0C3E-\\u0C40\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55-\\u0C56\\u0C62-\\u0C63\\u0C81\\u0CBC\\u0CBF\\u0CC6\\u0CCC-\\u0CCD\\u0CE2-\\u0CE3\\u0D00-\\u0D01\\u0D3B-\\u0D3C\\u0D41-\\u0D44\\u0D4D\\u0D62-\\u0D63\\u0D81\\u0DCA\\u0DD2-\\u0DD4\\u0DD6\\u0E31\\u0E34-\\u0E3A\\u0E47-\\u0E4E\\u0EB1\\u0EB4-\\u0EBC\\u0EC8-\\u0ECE\\u0F18-\\u0F19\\u0F35\\u0F37\\u0F39\\u0F71-\\u0F7E\\u0F80-\\u0F84\\u0F86-\\u0F87\\u0F8D-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u102D-\\u1030\\u1032-\\u1037\\u1039-\\u103A\\u103D-\\u103E\\u1058-\\u1059\\u105E-\\u1060\\u1071-\\u1074\\u1082\\u1085-\\u1086\\u108D\\u109D\\u135D-\\u135F\\u1712-\\u1714\\u1732-\\u1733\\u1752-\\u1753\\u1772-\\u1773\\u17B4-\\u17B5\\u17B7-\\u17BD\\u17C6\\u17C9-\\u17D3\\u17DD\\u180B-\\u180D\\u180F\\u1885-\\u1886\\u18A9\\u1920-\\u1922\\u1927-\\u1928\\u1932\\u1939-\\u193B\\u1A17-\\u1A18\\u1A1B\\u1A56\\u1A58-\\u1A5E\\u1A60\\u1A62\\u1A65-\\u1A6C\\u1A73-\\u1A7C\\u1A7F\\u1AB0-\\u1ABD\\u1ABF-\\u1ADD\\u1AE0-\\u1AEB\\u1B00-\\u1B03\\u1B34\\u1B36-\\u1B3A\\u1B3C\\u1B42\\u1B6B-\\u1B73\\u1B80-\\u1B81\\u1BA2-\\u1BA5\\u1BA8-\\u1BA9\\u1BAB-\\u1BAD\\u1BE6\\u1BE8-\\u1BE9\\u1BED\\u1BEF-\\u1BF1\\u1C2C-\\u1C33\\u1C36-\\u1C37\\u1CD0-\\u1CD2\\u1CD4-\\u1CE0\\u1CE2-\\u1CE8\\u1CED\\u1CF4\\u1CF8-\\u1CF9\\u1DC0-\\u1DFF\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2CEF-\\u2CF1\\u2D7F\\u2DE0-\\u2DFF\\u302A-\\u302D\\u3099-\\u309A\\uA66F\\uA674-\\uA67D\\uA69E-\\uA69F\\uA6F0-\\uA6F1\\uA802\\uA806\\uA80B\\uA825-\\uA826\\uA82C\\uA8C4-\\uA8C5\\uA8E0-\\uA8F1\\uA8FF\\uA926-\\uA92D\\uA947-\\uA951\\uA980-\\uA982\\uA9B3\\uA9B6-\\uA9B9\\uA9BC-\\uA9BD\\uA9E5\\uAA29-\\uAA2E\\uAA31-\\uAA32\\uAA35-\\uAA36\\uAA43\\uAA4C\\uAA7C\\uAAB0\\uAAB2-\\uAAB4\\uAAB7-\\uAAB8\\uAABE-\\uAABF\\uAAC1\\uAAEC-\\uAAED\\uAAF6\\uABE5\\uABE8\\uABED\\uFB1E\\uFE00-\\uFE0F\\uFE20-\\uFE2F\\u{101FD}\\u{102E0}\\u{10376}-\\u{1037A}\\u{10A01}-\\u{10A03}\\u{10A05}-\\u{10A06}\\u{10A0C}-\\u{10A0F}\\u{10A38}-\\u{10A3A}\\u{10A3F}\\u{10AE5}-\\u{10AE6}\\u{10D24}-\\u{10D27}\\u{10D69}-\\u{10D6D}\\u{10EAB}-\\u{10EAC}\\u{10EFA}-\\u{10EFF}\\u{10F46}-\\u{10F50}\\u{10F82}-\\u{10F85}\\u{11001}\\u{11038}-\\u{11046}\\u{11070}\\u{11073}-\\u{11074}\\u{1107F}-\\u{11081}\\u{110B3}-\\u{110B6}\\u{110B9}-\\u{110BA}\\u{110C2}\\u{11100}-\\u{11102}\\u{11127}-\\u{1112B}\\u{1112D}-\\u{11134}\\u{11173}\\u{11180}-\\u{11181}\\u{111B6}-\\u{111BE}\\u{111C9}-\\u{111CC}\\u{111CF}\\u{1122F}-\\u{11231}\\u{11234}\\u{11236}-\\u{11237}\\u{1123E}\\u{11241}\\u{112DF}\\u{112E3}-\\u{112EA}\\u{11300}-\\u{11301}\\u{1133B}-\\u{1133C}\\u{11340}\\u{11366}-\\u{1136C}\\u{11370}-\\u{11374}\\u{113BB}-\\u{113C0}\\u{113CE}\\u{113D0}\\u{113D2}\\u{113E1}-\\u{113E2}\\u{11438}-\\u{1143F}\\u{11442}-\\u{11444}\\u{11446}\\u{1145E}\\u{114B3}-\\u{114B8}\\u{114BA}\\u{114BF}-\\u{114C0}\\u{114C2}-\\u{114C3}\\u{115B2}-\\u{115B5}\\u{115BC}-\\u{115BD}\\u{115BF}-\\u{115C0}\\u{115DC}-\\u{115DD}\\u{11633}-\\u{1163A}\\u{1163D}\\u{1163F}-\\u{11640}\\u{116AB}\\u{116AD}\\u{116B0}-\\u{116B5}\\u{116B7}\\u{1171D}\\u{1171F}\\u{11722}-\\u{11725}\\u{11727}-\\u{1172B}\\u{1182F}-\\u{11837}\\u{11839}-\\u{1183A}\\u{1193B}-\\u{1193C}\\u{1193E}\\u{11943}\\u{119D4}-\\u{119D7}\\u{119DA}-\\u{119DB}\\u{119E0}\\u{11A01}-\\u{11A0A}\\u{11A33}-\\u{11A38}\\u{11A3B}-\\u{11A3E}\\u{11A47}\\u{11A51}-\\u{11A56}\\u{11A59}-\\u{11A5B}\\u{11A8A}-\\u{11A96}\\u{11A98}-\\u{11A99}\\u{11B60}\\u{11B62}-\\u{11B64}\\u{11B66}\\u{11C30}-\\u{11C36}\\u{11C38}-\\u{11C3D}\\u{11C3F}\\u{11C92}-\\u{11CA7}\\u{11CAA}-\\u{11CB0}\\u{11CB2}-\\u{11CB3}\\u{11CB5}-\\u{11CB6}\\u{11D31}-\\u{11D36}\\u{11D3A}\\u{11D3C}-\\u{11D3D}\\u{11D3F}-\\u{11D45}\\u{11D47}\\u{11D90}-\\u{11D91}\\u{11D95}\\u{11D97}\\u{11EF3}-\\u{11EF4}\\u{11F00}-\\u{11F01}\\u{11F36}-\\u{11F3A}\\u{11F40}\\u{11F42}\\u{11F5A}\\u{13440}\\u{13447}-\\u{13455}\\u{1611E}-\\u{16129}\\u{1612D}-\\u{1612F}\\u{16AF0}-\\u{16AF4}\\u{16B30}-\\u{16B36}\\u{16F4F}\\u{16F8F}-\\u{16F92}\\u{16FE4}\\u{1BC9D}-\\u{1BC9E}\\u{1CF00}-\\u{1CF2D}\\u{1CF30}-\\u{1CF46}\\u{1D167}-\\u{1D169}\\u{1D17B}-\\u{1D182}\\u{1D185}-\\u{1D18B}\\u{1D1AA}-\\u{1D1AD}\\u{1D242}-\\u{1D244}\\u{1DA00}-\\u{1DA36}\\u{1DA3B}-\\u{1DA6C}\\u{1DA75}\\u{1DA84}\\u{1DA9B}-\\u{1DA9F}\\u{1DAA1}-\\u{1DAAF}\\u{1E000}-\\u{1E006}\\u{1E008}-\\u{1E018}\\u{1E01B}-\\u{1E021}\\u{1E023}-\\u{1E024}\\u{1E026}-\\u{1E02A}\\u{1E08F}\\u{1E130}-\\u{1E136}\\u{1E2AE}\\u{1E2EC}-\\u{1E2EF}\\u{1E4EC}-\\u{1E4EF}\\u{1E5EE}-\\u{1E5EF}\\u{1E6E3}\\u{1E6E6}\\u{1E6EE}-\\u{1E6EF}\\u{1E6F5}\\u{1E8D0}-\\u{1E8D6}\\u{1E944}-\\u{1E94A}\\u{E0100}-\\u{E01EF}]", "gu"), '').replaceAll(/\s+/g, '-').replaceAll(/[^a-z0-9-]/g, '');
                                destDir = path.join(workDir, MIGRATIONS_DIRECTORY, sluggedName);
                                definitionFile = path.join(destDir, 'index.ts');
                                return [
                                    4,
                                    this.createMigrationFile(destDir, definitionFile, renderedTemplate)
                                ];
                            case 6:
                                dirCreated = _state.sent();
                                if (dirCreated) {
                                    this.log();
                                    this.log("".concat(styleText('green', '✓'), " Migration created!"));
                                    this.log();
                                    this.log('Next steps:');
                                    this.log("Open ".concat(styleText('bold', definitionFile), " in your code editor and write the code for your migration."));
                                    this.log("Dry run the migration with:\n`".concat(styleText('bold', "sanity migration run ".concat(sluggedName, " --project=<projectId> --dataset <dataset> ")), "`"));
                                    this.log("Run the migration against a dataset with:\n `".concat(styleText('bold', "sanity migration run ".concat(sluggedName, " --project=<projectId> --dataset <dataset> --no-dry-run")), "`"));
                                    this.log();
                                    this.log("\uD83D\uDC49 Learn more about schema and content migrations at ".concat(styleText('bold', 'https://www.sanity.io/docs/schema-and-content-migrations')));
                                }
                                return [
                                    2
                                ];
                        }
                    });
                }).call(this);
            }
        },
        {
            key: "createMigrationFile",
            value: function createMigrationFile(destDir, definitionFile, renderedTemplate) {
                return _async_to_generator(function() {
                    var dirExists, shouldOverwrite, error, message, error1, message1;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    access(destDir).then(function() {
                                        return true;
                                    }).catch(function() {
                                        return false;
                                    })
                                ];
                            case 1:
                                dirExists = _state.sent();
                                if (!dirExists) return [
                                    3,
                                    3
                                ];
                                return [
                                    4,
                                    this.promptForOverwrite(destDir)
                                ];
                            case 2:
                                shouldOverwrite = _state.sent();
                                if (!shouldOverwrite) return [
                                    2,
                                    false
                                ];
                                _state.label = 3;
                            case 3:
                                _state.trys.push([
                                    3,
                                    5,
                                    ,
                                    6
                                ]);
                                return [
                                    4,
                                    mkdir(destDir, {
                                        recursive: true
                                    })
                                ];
                            case 4:
                                _state.sent();
                                return [
                                    3,
                                    6
                                ];
                            case 5:
                                error = _state.sent();
                                message = _instanceof(error, Error) ? error.message : String(error);
                                this.error("Failed to create migration directory: ".concat(message), {
                                    exit: 1
                                });
                                return [
                                    3,
                                    6
                                ];
                            case 6:
                                _state.trys.push([
                                    6,
                                    8,
                                    ,
                                    9
                                ]);
                                return [
                                    4,
                                    writeFile(definitionFile, renderedTemplate)
                                ];
                            case 7:
                                _state.sent();
                                return [
                                    3,
                                    9
                                ];
                            case 8:
                                error1 = _state.sent();
                                message1 = _instanceof(error1, Error) ? error1.message : String(error1);
                                this.error("Failed to create migration file: ".concat(message1), {
                                    exit: 1
                                });
                                return [
                                    3,
                                    9
                                ];
                            case 9:
                                return [
                                    2,
                                    true
                                ];
                        }
                    });
                }).call(this);
            }
        },
        {
            key: "promptForDocumentTypes",
            value: function promptForDocumentTypes() {
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            input({
                                message: 'Type of documents to migrate. You can add multiple types separated by comma (optional)'
                            })
                        ];
                    });
                })();
            }
        },
        {
            key: "promptForOverwrite",
            value: function promptForOverwrite(destDir) {
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            confirm({
                                default: false,
                                message: "Migration directory ".concat(styleText('cyan', destDir), " already exists. Overwrite?")
                            })
                        ];
                    });
                })();
            }
        },
        {
            key: "promptForTemplate",
            value: function promptForTemplate() {
                return _async_to_generator(function() {
                    var templatesByName, templateName;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                templatesByName = Object.fromEntries(TEMPLATES.map(function(t) {
                                    return [
                                        t.name,
                                        t
                                    ];
                                }));
                                return [
                                    4,
                                    select({
                                        choices: TEMPLATES.map(function(definedTemplate) {
                                            return {
                                                name: definedTemplate.name,
                                                value: definedTemplate.name
                                            };
                                        }),
                                        message: 'Select a template'
                                    })
                                ];
                            case 1:
                                templateName = _state.sent();
                                return [
                                    2,
                                    templatesByName[templateName]
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "promptForTitle",
            value: function promptForTitle(providedTitle) {
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        if (providedTitle === null || providedTitle === void 0 ? void 0 : providedTitle.trim()) {
                            return [
                                2,
                                providedTitle
                            ];
                        }
                        return [
                            2,
                            input({
                                message: 'Title of migration (e.g. "Rename field from location to address")',
                                validate: function validate(value) {
                                    if (!value.trim()) {
                                        return 'Title cannot be empty';
                                    }
                                    return true;
                                }
                            })
                        ];
                    });
                })();
            }
        }
    ]);
    return CreateMigrationCommand;
}(SanityCommand);
_define_property(CreateMigrationCommand, "args", {
    title: Args.string({
        description: 'Title of migration',
        required: false
    })
});
_define_property(CreateMigrationCommand, "description", 'Create a new migration within your project');
_define_property(CreateMigrationCommand, "examples", [
    {
        command: '<%= config.bin %> <%= command.id %>',
        description: 'Create a new migration, prompting for title and options'
    },
    {
        command: '<%= config.bin %> <%= command.id %> "Rename field from location to address"',
        description: 'Create a new migration with the provided title, prompting for options'
    }
]);
_define_property(CreateMigrationCommand, "hiddenAliases", [
    'migration:create'
]);
