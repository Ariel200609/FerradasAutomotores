export var renameField = function renameField(param) {
    var documentTypes = param.documentTypes, migrationName = param.migrationName;
    return "import {defineMigration, at, setIfMissing, unset} from 'sanity/migrate'\n\nconst from = 'oldFieldName'\nconst to = 'newFieldName'\n\nexport default defineMigration({\n  title: ".concat(JSON.stringify(migrationName), ",\n").concat(documentTypes.length > 0 ? "  documentTypes: [".concat(documentTypes.map(function(t) {
        return JSON.stringify(t);
    }).join(', '), "],\n") : '', "\n  migrate: {\n    document(doc, context) {\n      return [\n        at(to, setIfMissing(doc[from])),\n        at(from, unset())\n      ]\n    }\n  }\n})\n");
};
