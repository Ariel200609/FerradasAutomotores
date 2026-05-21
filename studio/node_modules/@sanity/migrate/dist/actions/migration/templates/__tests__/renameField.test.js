import { describe, expect, test } from 'vitest';
import { renameField } from '../renameField.js';
describe('#renameField', function() {
    test('creates template with no doc types', function() {
        var renameFieldTemplate = renameField({
            documentTypes: [],
            migrationName: 'My Migration'
        });
        expect(renameFieldTemplate).toMatchInlineSnapshot("\n      \"import {defineMigration, at, setIfMissing, unset} from 'sanity/migrate'\n\n      const from = 'oldFieldName'\n      const to = 'newFieldName'\n\n      export default defineMigration({\n        title: \"My Migration\",\n\n        migrate: {\n          document(doc, context) {\n            return [\n              at(to, setIfMissing(doc[from])),\n              at(from, unset())\n            ]\n          }\n        }\n      })\n      \"\n    ");
    });
    test('creates template with doc types', function() {
        var renameFieldTemplate = renameField({
            documentTypes: [
                'document-1',
                'document-2',
                'document-3'
            ],
            migrationName: 'My Migration'
        });
        expect(renameFieldTemplate).toMatchInlineSnapshot('\n      "import {defineMigration, at, setIfMissing, unset} from \'sanity/migrate\'\n\n      const from = \'oldFieldName\'\n      const to = \'newFieldName\'\n\n      export default defineMigration({\n        title: "My Migration",\n        documentTypes: ["document-1", "document-2", "document-3"],\n\n        migrate: {\n          document(doc, context) {\n            return [\n              at(to, setIfMissing(doc[from])),\n              at(from, unset())\n            ]\n          }\n        }\n      })\n      "\n    ');
    });
});
