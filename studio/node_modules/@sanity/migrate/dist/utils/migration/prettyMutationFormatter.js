import { isatty } from 'node:tty';
import { styleText } from 'node:util';
import { convertToTree, formatTree, maxKeyLength } from '../tree.js';
var isTty = isatty(1);
export function prettyFormat(param) {
    var _param_indentSize = param.indentSize, indentSize = _param_indentSize === void 0 ? 0 : _param_indentSize, migration = param.migration, subject = param.subject;
    return (Array.isArray(subject) ? subject : [
        subject
    ]).map(function(subjectEntry) {
        if (subjectEntry.type === 'transaction') {
            return [
                [
                    badge('transaction', 'info'),
                    subjectEntry.id === undefined ? null : styleText('underline', subjectEntry.id)
                ].filter(Boolean).join(' '),
                indent(prettyFormat({
                    indentSize: indentSize,
                    migration: migration,
                    subject: subjectEntry.mutations
                }))
            ].join('\n\n');
        }
        return prettyFormatMutation({
            indentSize: indentSize,
            migration: migration,
            subject: subjectEntry
        });
    }).join('\n\n');
}
function encodeItemRef(ref) {
    return typeof ref === 'number' ? ref : ref._key;
}
function badgeStyle(variant, label) {
    var styles = {
        destructive: styleText([
            'bgRed',
            'black',
            'bold'
        ], label),
        incremental: styleText([
            'bgGreen',
            'black',
            'bold'
        ], label),
        info: styleText([
            'bgWhite',
            'black'
        ], label),
        maybeDestructive: styleText([
            'bgYellow',
            'black',
            'bold'
        ], label)
    };
    return styles[variant];
}
function badge(label, variant) {
    if (!isTty) {
        return "[".concat(label, "]");
    }
    return badgeStyle(variant, " ".concat(label, " "));
}
var mutationImpact = {
    create: 'incremental',
    createIfNotExists: 'incremental',
    createOrReplace: 'maybeDestructive',
    delete: 'destructive',
    patch: 'maybeDestructive'
};
function documentId(mutation) {
    if ('id' in mutation) {
        return mutation.id;
    }
    if ('document' in mutation) {
        return mutation.document._id;
    }
    return undefined;
}
var listFormatter = new Intl.ListFormat('en-US', {
    type: 'disjunction'
});
function mutationHeader(mutation, migration) {
    var _migration_documentTypes, _documentId;
    var mutationType = badge(mutation.type, mutationImpact[mutation.type]);
    var documentType = 'document' in mutation || migration.documentTypes ? badge('document' in mutation ? mutation.document._type : listFormatter.format((_migration_documentTypes = migration.documentTypes) !== null && _migration_documentTypes !== void 0 ? _migration_documentTypes : []), 'info') : null;
    // TODO: Should we list documentType when a mutation can be yielded for any document type?
    return [
        mutationType,
        documentType,
        styleText('underline', (_documentId = documentId(mutation)) !== null && _documentId !== void 0 ? _documentId : '')
    ].filter(Boolean).join(' ');
}
function prettyFormatMutation(param) {
    var _param_indentSize = param.indentSize, indentSize = _param_indentSize === void 0 ? 0 : _param_indentSize, migration = param.migration, subject = param.subject;
    var _subject_options;
    var lock = 'options' in subject ? styleText('cyan', "(if revision==".concat((_subject_options = subject.options) === null || _subject_options === void 0 ? void 0 : _subject_options.ifRevision, ")")) : '';
    var header = [
        mutationHeader(subject, migration),
        lock
    ].join(' ');
    var padding = ' '.repeat(indentSize);
    if (subject.type === 'create' || subject.type === 'createIfNotExists' || subject.type === 'createOrReplace') {
        return [
            header,
            '\n',
            indent(JSON.stringify(subject.document, null, 2), indentSize)
        ].join('');
    }
    if (subject.type === 'patch') {
        var tree = convertToTree(subject.patches.flat());
        var paddingLength = Math.max(maxKeyLength(tree.children) + 2, 30);
        return [
            header,
            '\n',
            formatTree({
                getMessage: function getMessage(patch) {
                    return formatPatchMutation(patch);
                },
                indent: padding,
                node: tree.children,
                paddingLength: paddingLength
            })
        ].join('');
    }
    return header;
}
function formatPatchMutation(patch) {
    var op = patch.op;
    var formattedType = styleText('bold', op.type);
    if (op.type === 'unset') {
        return "".concat(styleText('red', formattedType), "()");
    }
    if (op.type === 'diffMatchPatch') {
        return "".concat(styleText('yellow', formattedType), "(").concat(op.value, ")");
    }
    if (op.type === 'inc' || op.type === 'dec') {
        return "".concat(styleText('yellow', formattedType), "(").concat(op.amount, ")");
    }
    if (op.type === 'set') {
        return "".concat(styleText('yellow', formattedType), "(").concat(JSON.stringify(op.value), ")");
    }
    if (op.type === 'setIfMissing') {
        return "".concat(styleText('green', formattedType), "(").concat(JSON.stringify(op.value), ")");
    }
    if (op.type === 'insert') {
        return "".concat(styleText('green', formattedType), "(").concat(op.position, ", ").concat(encodeItemRef(op.referenceItem), ", ").concat(JSON.stringify(op.items), ")");
    }
    if (op.type === 'replace') {
        return "".concat(styleText('yellow', formattedType), "(").concat(encodeItemRef(op.referenceItem), ", ").concat(JSON.stringify(op.items), ")");
    }
    if (op.type === 'truncate') {
        return "".concat(styleText('red', formattedType), "(").concat(op.startIndex, ", ").concat(op.endIndex, ")");
    }
    throw new Error("Invalid operation type: ".concat(op.type));
}
function indent(subject) {
    var size = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
    var padding = ' '.repeat(size);
    return subject.split('\n').map(function(line) {
        return padding + line;
    }).join('\n');
}
