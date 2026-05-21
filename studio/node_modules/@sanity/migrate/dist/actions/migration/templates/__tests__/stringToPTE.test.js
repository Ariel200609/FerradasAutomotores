import { describe, expect, test } from 'vitest';
import { stringToPTE } from '../stringToPTE.js';
describe('#stringToPTE', function() {
    test('creates template with no doc types', function() {
        var stringToPTETemplate = stringToPTE({
            documentTypes: [],
            migrationName: 'My Migration'
        });
        expect(stringToPTETemplate).toMatchInlineSnapshot("\n      \"import {pathsAreEqual, stringToPath} from 'sanity'\n      import {defineMigration, set} from 'sanity/migrate'\n\n      const targetPath = stringToPath('some.path')\n\n      export default defineMigration({\n        title: \"My Migration\",\n\n        migrate: {\n          string(node, path, ctx) {\n            if (pathsAreEqual(path, targetPath)) {\n              return set([\n                {\n                  style: 'normal',\n                  _type: 'block',\n                  children: [\n                    {\n                      _type: 'span',\n                      marks: [],\n                      text: node,\n                    },\n                  ],\n                  markDefs: [],\n                },\n              ])\n            }\n          },\n        },\n      })\n      \"\n    ");
    });
    test('creates template with doc types', function() {
        var stringToPTETemplate = stringToPTE({
            documentTypes: [
                'document-1',
                'document-2',
                'document-3'
            ],
            migrationName: 'My Migration'
        });
        expect(stringToPTETemplate).toMatchInlineSnapshot("\n      \"import {pathsAreEqual, stringToPath} from 'sanity'\n      import {defineMigration, set} from 'sanity/migrate'\n\n      const targetPath = stringToPath('some.path')\n\n      export default defineMigration({\n        title: \"My Migration\",\n        documentTypes: [\"document-1\", \"document-2\", \"document-3\"],\n\n        migrate: {\n          string(node, path, ctx) {\n            if (pathsAreEqual(path, targetPath)) {\n              return set([\n                {\n                  style: 'normal',\n                  _type: 'block',\n                  children: [\n                    {\n                      _type: 'span',\n                      marks: [],\n                      text: node,\n                    },\n                  ],\n                  markDefs: [],\n                },\n              ])\n            }\n          },\n        },\n      })\n      \"\n    ");
    });
});
