import { Schema } from "@sanity/schema";
import { builtinTypes } from "@sanity/schema/_internal";
function createPortableTextMemberSchemaTypes(portableTextType) {
  if (!portableTextType)
    throw new Error("Parameter 'portabletextType' missing (required)");
  const blockType = portableTextType.of?.find(findBlockType$1);
  if (!blockType)
    throw new Error("Block type is not defined in this schema (required)");
  const childrenField = blockType.fields?.find(
    (field) => field.name === "children"
  );
  if (!childrenField)
    throw new Error("Children field for block type found in schema (required)");
  const ofType = childrenField.type.of;
  if (!ofType)
    throw new Error(
      "Valid types for block children not found in schema (required)"
    );
  const spanType = ofType.find((memberType) => memberType.name === "span");
  if (!spanType)
    throw new Error("Span type not found in schema (required)");
  const inlineObjectTypes = ofType.filter(
    (memberType) => memberType.name !== "span"
  ) || [], blockObjectTypes = portableTextType.of?.filter(
    (field) => field.name !== blockType.name
  ) || [];
  return {
    styles: resolveEnabledStyles$1(blockType),
    decorators: resolveEnabledDecorators$1(spanType),
    lists: resolveEnabledListItems$1(blockType),
    block: blockType,
    span: spanType,
    portableText: portableTextType,
    inlineObjects: inlineObjectTypes,
    blockObjects: blockObjectTypes,
    annotations: spanType.annotations
  };
}
function resolveEnabledStyles$1(blockType) {
  const styleField = blockType.fields?.find(
    (btField) => btField.name === "style"
  );
  if (!styleField)
    throw new Error(
      "A field with name 'style' is not defined in the block type (required)."
    );
  const textStyles = styleField.type.options?.list && styleField.type.options.list?.filter(
    (style) => style.value
  );
  if (!textStyles || textStyles.length === 0)
    throw new Error(
      "The style fields need at least one style defined. I.e: {title: 'Normal', value: 'normal'}."
    );
  return textStyles;
}
function resolveEnabledDecorators$1(spanType) {
  return spanType.decorators;
}
function resolveEnabledListItems$1(blockType) {
  const listField = blockType.fields?.find(
    (btField) => btField.name === "listItem"
  );
  if (!listField)
    throw new Error(
      "A field with name 'listItem' is not defined in the block type (required)."
    );
  const listItems = listField.type.options?.list && listField.type.options.list.filter((list) => list.value);
  if (!listItems)
    throw new Error("The list field need at least to be an empty array");
  return listItems;
}
function findBlockType$1(type) {
  return type.type ? findBlockType$1(type.type) : type.name === "block" ? type : null;
}
function sanitySchemaToPortableTextSchema(sanitySchema) {
  const compiled = sanitySchema.hasOwnProperty("jsonType") ? sanitySchema : compileType(sanitySchema);
  return sanitySchemaTypeToSchema(compiled);
}
function sanitySchemaTypeToSchema(portableTextType) {
  if (!portableTextType)
    throw new Error("Parameter 'portableTextType' missing (required)");
  const blockType = portableTextType.of?.find(findBlockType);
  if (!blockType)
    throw new Error("Block type is not defined in this schema (required)");
  const childrenField = blockType.fields?.find(
    (field) => field.name === "children"
  );
  if (!childrenField)
    throw new Error("Children field for block type found in schema (required)");
  const ofType = childrenField.type.of;
  if (!ofType)
    throw new Error(
      "Valid types for block children not found in schema (required)"
    );
  const spanType = ofType.find((memberType) => memberType.name === "span");
  if (!spanType)
    throw new Error("Span type not found in schema (required)");
  const inlineObjectTypes = ofType.filter(
    (memberType) => memberType.name !== "span"
  ) || [], blockObjectTypes = portableTextType.of?.filter(
    (field) => field.name !== blockType.name
  ) || [], styles = resolveEnabledStyles(blockType), decorators = resolveEnabledDecorators(spanType), lists = resolveEnabledListItems(blockType), annotations = spanType.annotations;
  return {
    block: {
      name: blockType.name
    },
    span: {
      name: spanType.name
    },
    styles: styles.map((style) => ({
      name: style.value,
      title: style.title,
      value: style.value
    })),
    lists: lists.map((list) => ({
      name: list.value,
      title: list.title,
      value: list.value
    })),
    decorators: decorators.map((decorator) => ({
      name: decorator.value,
      title: decorator.title,
      value: decorator.value
    })),
    annotations: annotations.map((annotation) => ({
      name: annotation.name,
      title: annotation.title,
      fields: annotation.fields.map((field) => ({
        name: field.name,
        type: field.type.jsonType,
        title: field.type.title
      }))
    })),
    blockObjects: blockObjectTypes.map((blockObject) => ({
      name: blockObject.name,
      title: blockObject.title,
      fields: blockObject.fields.map((field) => ({
        name: field.name,
        type: field.type.jsonType,
        title: field.type.title
      }))
    })),
    inlineObjects: inlineObjectTypes.map((inlineObject) => ({
      name: inlineObject.name,
      title: inlineObject.title,
      fields: inlineObject.fields.map((field) => ({
        name: field.name,
        type: field.type.jsonType,
        title: field.type.title
      }))
    }))
  };
}
function resolveEnabledStyles(blockType) {
  const styleField = blockType.fields?.find(
    (btField) => btField.name === "style"
  );
  if (!styleField)
    throw new Error(
      "A field with name 'style' is not defined in the block type (required)."
    );
  const textStyles = styleField.type.options?.list && styleField.type.options.list?.filter(
    (style) => style.value
  );
  if (!textStyles || textStyles.length === 0)
    throw new Error(
      "The style fields need at least one style defined. I.e: {title: 'Normal', value: 'normal'}."
    );
  return textStyles;
}
function resolveEnabledDecorators(spanType) {
  return spanType.decorators;
}
function resolveEnabledListItems(blockType) {
  const listField = blockType.fields?.find(
    (btField) => btField.name === "listItem"
  );
  if (!listField)
    throw new Error(
      "A field with name 'listItem' is not defined in the block type (required)."
    );
  const listItems = listField.type.options?.list && listField.type.options.list.filter((list) => list.value);
  if (!listItems)
    throw new Error("The list field need at least to be an empty array");
  return listItems;
}
function findBlockType(type) {
  return type.type ? findBlockType(type.type) : type.name === "block" ? type : null;
}
function compileType(rawType) {
  return Schema.compile({
    name: "blockTypeSchema",
    types: [rawType, ...builtinTypes]
  }).get(rawType.name);
}
export {
  createPortableTextMemberSchemaTypes,
  sanitySchemaToPortableTextSchema
};
//# sourceMappingURL=index.js.map
