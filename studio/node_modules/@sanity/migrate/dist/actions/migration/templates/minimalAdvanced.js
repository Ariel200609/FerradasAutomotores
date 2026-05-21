export var minimalAdvanced = function minimalAdvanced(param) {
    var documentTypes = param.documentTypes, migrationName = param.migrationName;
    return "import {defineMigration, patch, at, setIfMissing} from 'sanity/migrate'\n\n/**\n * this migration will set `Default title` on all documents that are missing a title\n * and make `true` the default value for the `enabled` field\n */\nexport default defineMigration({\n  title: ".concat(JSON.stringify(migrationName), ",\n").concat(documentTypes.length > 0 ? "  documentTypes: [".concat(documentTypes.map(function(t) {
        return JSON.stringify(t);
    }).join(', '), "],\n") : '', "\n  async *migrate(documents, context) {\n    for await (const document of documents()) {\n      yield patch(document._id, [\n        at('title', setIfMissing('Default title')),\n        at('enabled', setIfMissing(true)),\n      ])\n    }\n  }\n})\n");
};
