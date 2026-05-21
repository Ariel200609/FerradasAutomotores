export var stringToPTE = function stringToPTE(param) {
    var documentTypes = param.documentTypes, migrationName = param.migrationName;
    return "import {pathsAreEqual, stringToPath} from 'sanity'\nimport {defineMigration, set} from 'sanity/migrate'\n\nconst targetPath = stringToPath('some.path')\n\nexport default defineMigration({\n  title: ".concat(JSON.stringify(migrationName), ",\n").concat(documentTypes.length > 0 ? "  documentTypes: [".concat(documentTypes.map(function(t) {
        return JSON.stringify(t);
    }).join(', '), "],\n") : '', "\n  migrate: {\n    string(node, path, ctx) {\n      if (pathsAreEqual(path, targetPath)) {\n        return set([\n          {\n            style: 'normal',\n            _type: 'block',\n            children: [\n              {\n                _type: 'span',\n                marks: [],\n                text: node,\n              },\n            ],\n            markDefs: [],\n          },\n        ])\n      }\n    },\n  },\n})\n");
};
