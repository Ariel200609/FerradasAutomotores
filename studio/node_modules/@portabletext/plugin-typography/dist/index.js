import { getSelectedSpans, isActiveDecorator } from "@portabletext/editor/selectors";
import { defineTextTransformRule, InputRulePlugin } from "@portabletext/plugin-input-rule";
import { jsx } from "react/jsx-runtime";
import { c } from "react/compiler-runtime";
function createDecoratorGuard(config) {
  return ({
    snapshot,
    event
  }) => {
    const allowedDecorators = config.decorators({
      context: {
        schema: snapshot.context.schema
      }
    }), decorators = snapshot.context.schema.decorators.flatMap((decorator) => allowedDecorators.includes(decorator.name) ? [] : [decorator.name]);
    if (decorators.length === 0)
      return !0;
    const matchedSpans = event.matches.flatMap((match) => getSelectedSpans({
      ...snapshot,
      context: {
        ...snapshot.context,
        selection: match.selection
      }
    }));
    let preventInputRule = !1;
    for (const decorator of decorators) {
      if (isActiveDecorator(decorator)(snapshot)) {
        preventInputRule = !0;
        break;
      }
      if (matchedSpans.some((span) => span.node.marks?.includes(decorator))) {
        preventInputRule = !0;
        break;
      }
    }
    return !preventInputRule;
  };
}
const emDashRule = defineTextTransformRule({
  on: /--/,
  transform: () => "\u2014"
}), ellipsisRule = defineTextTransformRule({
  on: /\.\.\./,
  transform: () => "\u2026"
}), openingDoubleQuoteRule = defineTextTransformRule({
  on: new RegExp(`(?:^|(?<=[\\s{[(<'"\\u2018\\u201C]))"`, "g"),
  transform: () => "\u201C"
}), closingDoubleQuoteRule = defineTextTransformRule({
  on: /"/g,
  transform: () => "\u201D"
}), openingSingleQuoteRule = defineTextTransformRule({
  on: new RegExp(`(?:^|(?<=[\\s{[(<'"\\u2018\\u201C]))'`, "g"),
  transform: () => "\u2018"
}), closingSingleQuoteRule = defineTextTransformRule({
  on: /'/g,
  transform: () => "\u2019"
}), smartQuotesRules = [openingDoubleQuoteRule, closingDoubleQuoteRule, openingSingleQuoteRule, closingSingleQuoteRule], leftArrowRule = defineTextTransformRule({
  on: /<-/,
  transform: () => "\u2190"
}), rightArrowRule = defineTextTransformRule({
  on: /->/,
  transform: () => "\u2192"
}), copyrightRule = defineTextTransformRule({
  on: /\(c\)/,
  transform: () => "\xA9"
}), servicemarkRule = defineTextTransformRule({
  on: /\(sm\)/,
  transform: () => "\u2120"
}), trademarkRule = defineTextTransformRule({
  on: /\(tm\)/,
  transform: () => "\u2122"
}), registeredTrademarkRule = defineTextTransformRule({
  on: /\(r\)/,
  transform: () => "\xAE"
}), oneHalfRule = defineTextTransformRule({
  on: /(?:^|\s)(1\/2)\s/,
  transform: () => "\xBD"
}), plusMinusRule = defineTextTransformRule({
  on: /\+\/-/,
  transform: () => "\xB1"
}), notEqualRule = defineTextTransformRule({
  on: /!=/,
  transform: () => "\u2260"
}), laquoRule = defineTextTransformRule({
  on: /<</,
  transform: () => "\xAB"
}), raquoRule = defineTextTransformRule({
  on: />>/,
  transform: () => "\xBB"
}), multiplicationRule = defineTextTransformRule({
  on: /\d+\s?([*x])\s?\d+/,
  transform: () => "\xD7"
}), superscriptTwoRule = defineTextTransformRule({
  on: /\^2/,
  transform: () => "\xB2"
}), superscriptThreeRule = defineTextTransformRule({
  on: /\^3/,
  transform: () => "\xB3"
}), oneQuarterRule = defineTextTransformRule({
  on: /(?:^|\s)(1\/4)\s/,
  transform: () => "\xBC"
}), threeQuartersRule = defineTextTransformRule({
  on: /(?:^|\s)(3\/4)\s/,
  transform: () => "\xBE"
}), defaultRuleConfig = [{
  name: "emDash",
  rule: emDashRule,
  state: "on"
}, {
  name: "ellipsis",
  rule: ellipsisRule,
  state: "on"
}, {
  name: "openingDoubleQuote",
  rule: openingDoubleQuoteRule,
  state: "on"
}, {
  name: "closingDoubleQuote",
  rule: closingDoubleQuoteRule,
  state: "on"
}, {
  name: "openingSingleQuote",
  rule: openingSingleQuoteRule,
  state: "on"
}, {
  name: "closingSingleQuote",
  rule: closingSingleQuoteRule,
  state: "on"
}, {
  name: "leftArrow",
  rule: leftArrowRule,
  state: "on"
}, {
  name: "rightArrow",
  rule: rightArrowRule,
  state: "on"
}, {
  name: "copyright",
  rule: copyrightRule,
  state: "on"
}, {
  name: "trademark",
  rule: trademarkRule,
  state: "on"
}, {
  name: "servicemark",
  rule: servicemarkRule,
  state: "on"
}, {
  name: "registeredTrademark",
  rule: registeredTrademarkRule,
  state: "on"
}, {
  name: "oneHalf",
  rule: oneHalfRule,
  state: "off"
}, {
  name: "plusMinus",
  rule: plusMinusRule,
  state: "off"
}, {
  name: "laquo",
  rule: laquoRule,
  state: "off"
}, {
  name: "notEqual",
  rule: notEqualRule,
  state: "off"
}, {
  name: "raquo",
  rule: raquoRule,
  state: "off"
}, {
  name: "multiplication",
  rule: multiplicationRule,
  state: "off"
}, {
  name: "superscriptTwo",
  rule: superscriptTwoRule,
  state: "off"
}, {
  name: "superscriptThree",
  rule: superscriptThreeRule,
  state: "off"
}, {
  name: "oneQuarter",
  rule: oneQuarterRule,
  state: "off"
}, {
  name: "threeQuarters",
  rule: threeQuartersRule,
  state: "off"
}];
function TypographyPlugin(props) {
  const $ = c(13), {
    preset: t0,
    enable: t1,
    disable: t2,
    guard
  } = props, preset = t0 === void 0 ? "default" : t0;
  let t3;
  $[0] !== t1 ? (t3 = t1 === void 0 ? [] : t1, $[0] = t1, $[1] = t3) : t3 = $[1];
  const enable = t3;
  let t4;
  $[2] !== t2 ? (t4 = t2 === void 0 ? [] : t2, $[2] = t2, $[3] = t4) : t4 = $[3];
  const disable = t4;
  let enabledRules;
  if ($[4] !== disable || $[5] !== enable || $[6] !== preset) {
    if (enabledRules = /* @__PURE__ */ new Set(), preset === "all")
      for (const rule of defaultRuleConfig)
        enabledRules.add(rule.name);
    else if (preset === "default")
      for (const rule_0 of defaultRuleConfig)
        rule_0.state === "on" && enabledRules.add(rule_0.name);
    for (const ruleName of enable)
      enabledRules.add(ruleName);
    for (const ruleName_0 of disable)
      enabledRules.delete(ruleName_0);
    $[4] = disable, $[5] = enable, $[6] = preset, $[7] = enabledRules;
  } else
    enabledRules = $[7];
  let t5;
  $[8] !== enabledRules || $[9] !== guard ? (t5 = defaultRuleConfig.flatMap((rule_1) => enabledRules.has(rule_1.name) ? [{
    ...rule_1.rule,
    guard: guard ?? _temp
  }] : []), $[8] = enabledRules, $[9] = guard, $[10] = t5) : t5 = $[10];
  const configuredInputRules = t5;
  let t6;
  return $[11] !== configuredInputRules ? (t6 = /* @__PURE__ */ jsx(InputRulePlugin, { rules: configuredInputRules }), $[11] = configuredInputRules, $[12] = t6) : t6 = $[12], t6;
}
function _temp() {
  return !0;
}
export {
  TypographyPlugin,
  closingDoubleQuoteRule,
  closingSingleQuoteRule,
  copyrightRule,
  createDecoratorGuard,
  ellipsisRule,
  emDashRule,
  laquoRule,
  leftArrowRule,
  multiplicationRule,
  notEqualRule,
  oneHalfRule,
  oneQuarterRule,
  openingDoubleQuoteRule,
  openingSingleQuoteRule,
  plusMinusRule,
  raquoRule,
  registeredTrademarkRule,
  rightArrowRule,
  servicemarkRule,
  smartQuotesRules,
  superscriptThreeRule,
  superscriptTwoRule,
  threeQuartersRule,
  trademarkRule
};
//# sourceMappingURL=index.js.map
