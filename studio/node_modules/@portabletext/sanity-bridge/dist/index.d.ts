import { ArrayDefinition, ArraySchemaType, BlockDecoratorDefinition, BlockListDefinition, BlockStyleDefinition, ObjectSchemaType, PortableTextBlock } from "@sanity/types";
import { Schema } from "@portabletext/schema";
/**
 * @public
 * Sanity-specific schema types for Portable Text.
 */
type PortableTextMemberSchemaTypes = {
  annotations: (ObjectSchemaType & {
    i18nTitleKey?: string;
  })[];
  block: ObjectSchemaType;
  blockObjects: ObjectSchemaType[];
  decorators: BlockDecoratorDefinition[];
  inlineObjects: ObjectSchemaType[];
  portableText: ArraySchemaType<PortableTextBlock>;
  span: ObjectSchemaType;
  styles: BlockStyleDefinition[];
  lists: BlockListDefinition[];
};
/**
 * @public
 * Create Sanity-specific schema types for Portable Text from a Sanity array
 * schema type.
 */
declare function createPortableTextMemberSchemaTypes(portableTextType: ArraySchemaType<PortableTextBlock>): PortableTextMemberSchemaTypes;
/**
 * @public
 * Compile a Sanity schema to a Portable Text `Schema`.
 *
 * A Portable Text `Schema` is compatible with a Portable Text
 * `SchemaDefinition` and can be used as configuration for the Portable Text
 * Editor.
 *
 * @example
 * ```tsx
 * const schema = sanitySchemaToPortableTextSchema(sanitySchema)
 *
 * return (
 *   <EditorProvider
 *     initialConfig={{
 *       // ...
 *       schemaDefinition: schema,
 *     }}
 *   >
 *     // ...
 *   </EditorProvider>
 * ```
 */
declare function sanitySchemaToPortableTextSchema(sanitySchema: ArraySchemaType<unknown> | ArrayDefinition): Schema;
export { type PortableTextMemberSchemaTypes, createPortableTextMemberSchemaTypes, sanitySchemaToPortableTextSchema };
//# sourceMappingURL=index.d.ts.map