import { describe, expect, test } from 'vitest';
import { minimalAdvanced } from '../minimalAdvanced.js';
describe('#minimalAdvanced', function() {
    test('creates template with no doc types', function() {
        var minimalAdvancedTemplate = minimalAdvanced({
            documentTypes: [],
            migrationName: 'My Migration'
        });
        expect(minimalAdvancedTemplate).toMatchInlineSnapshot("\n      \"import {defineMigration, patch, at, setIfMissing} from 'sanity/migrate'\n\n      /**\n       * this migration will set `Default title` on all documents that are missing a title\n       * and make `true` the default value for the `enabled` field\n       */\n      export default defineMigration({\n        title: \"My Migration\",\n\n        async *migrate(documents, context) {\n          for await (const document of documents()) {\n            yield patch(document._id, [\n              at('title', setIfMissing('Default title')),\n              at('enabled', setIfMissing(true)),\n            ])\n          }\n        }\n      })\n      \"\n    ");
    });
    test('creates template with doc types', function() {
        var minimalAdvancedTemplate = minimalAdvanced({
            documentTypes: [
                'document-1',
                'document-2',
                'document-3'
            ],
            migrationName: 'My Migration'
        });
        expect(minimalAdvancedTemplate).toMatchInlineSnapshot('\n      "import {defineMigration, patch, at, setIfMissing} from \'sanity/migrate\'\n\n      /**\n       * this migration will set `Default title` on all documents that are missing a title\n       * and make `true` the default value for the `enabled` field\n       */\n      export default defineMigration({\n        title: "My Migration",\n        documentTypes: ["document-1", "document-2", "document-3"],\n\n        async *migrate(documents, context) {\n          for await (const document of documents()) {\n            yield patch(document._id, [\n              at(\'title\', setIfMissing(\'Default title\')),\n              at(\'enabled\', setIfMissing(true)),\n            ])\n          }\n        }\n      })\n      "\n    ');
    });
});
