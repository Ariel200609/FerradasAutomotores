export var renameType = function renameType(param) {
    var documentTypes = param.documentTypes, migrationName = param.migrationName;
    return "import {defineMigration, at, set} from 'sanity/migrate'\n\nconst oldType = 'old'\nconst newType = 'new'\n\nexport default defineMigration({\n  title: ".concat(JSON.stringify(migrationName), ",\n").concat(documentTypes.length > 0 ? "  documentTypes: [".concat(documentTypes.map(function(t) {
        return JSON.stringify(t);
    }).join(', '), "],\n") : '', "\n  migrate: {\n    object(object, path, context) {\n      if (object._type === oldType) {\n        return at('_type', set(newType))\n      }\n    }\n  }\n})\n");
};
