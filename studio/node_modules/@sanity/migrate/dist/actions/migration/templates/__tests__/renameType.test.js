import { describe, expect, test } from 'vitest';
import { renameType } from '../renameType.js';
describe('#renameType', function() {
    test('creates template with no doc types', function() {
        var renameTypeTemplate = renameType({
            documentTypes: [],
            migrationName: 'My Migration'
        });
        expect(renameTypeTemplate).toMatchInlineSnapshot("\n      \"import {defineMigration, at, set} from 'sanity/migrate'\n\n      const oldType = 'old'\n      const newType = 'new'\n\n      export default defineMigration({\n        title: \"My Migration\",\n\n        migrate: {\n          object(object, path, context) {\n            if (object._type === oldType) {\n              return at('_type', set(newType))\n            }\n          }\n        }\n      })\n      \"\n    ");
    });
    test('creates template with doc types', function() {
        var renameTypeTemplate = renameType({
            documentTypes: [
                'document-1',
                'document-2',
                'document-3'
            ],
            migrationName: 'My Migration'
        });
        expect(renameTypeTemplate).toMatchInlineSnapshot('\n      "import {defineMigration, at, set} from \'sanity/migrate\'\n\n      const oldType = \'old\'\n      const newType = \'new\'\n\n      export default defineMigration({\n        title: "My Migration",\n        documentTypes: ["document-1", "document-2", "document-3"],\n\n        migrate: {\n          object(object, path, context) {\n            if (object._type === oldType) {\n              return at(\'_type\', set(newType))\n            }\n          }\n        }\n      })\n      "\n    ');
    });
});
