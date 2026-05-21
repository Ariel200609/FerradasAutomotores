import { a as SchemaValidationResult, c as DeprecatedDefaultSchema, l as Schema$2 } from "./_chunks-dts/typedefs.js";
import { RuleClass } from "@sanity/types";
/**
 * Core Rule implementation without validation logic.
 * This is the base Rule class that can be extended with validation logic.
 *
 * @internal
 */
declare const Rule: RuleClass;
declare const DEFAULT_DECORATORS: {
  title: string;
  value: string;
  i18nTitleKey: string;
}[];
declare const DEFAULT_ANNOTATIONS: {
  type: string;
  name: string;
  title: string;
  i18nTitleKey: string;
  options: {
    modal: {
      type: string;
    };
  };
  fields: {
    name: string;
    type: string;
    title: string;
    description: string;
    validation: (Rule: any) => any;
  }[];
}[];
declare const Schema: typeof Schema$2;
export { DEFAULT_ANNOTATIONS, DEFAULT_DECORATORS, Rule, Schema, type SchemaValidationResult, DeprecatedDefaultSchema as default };