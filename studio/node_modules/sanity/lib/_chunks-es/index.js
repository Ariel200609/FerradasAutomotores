import { jsx, jsxs } from "react/jsx-runtime";
import { c } from "react/compiler-runtime";
import { Button as Button$1, Flex, Box, Text, Dialog as Dialog$1, ErrorBoundary as ErrorBoundary$1, MenuButton as MenuButton$1, Hotkeys as Hotkeys$1, Tooltip as Tooltip$1, Badge, Stack, MenuItem as MenuItem$1, Popover as Popover$1, Tab as Tab$1, TooltipDelayGroupProvider as TooltipDelayGroupProvider$1 } from "@sanity/ui";
import { forwardRef, useContext, isValidElement } from "react";
import { SourceContext } from "sanity/_singletons";
import { isValidElementType } from "react-is";
import { styled } from "styled-components";
import { useTranslation } from "react-i18next";
const LARGE_BUTTON_PROPS = {
  space: 3,
  padding: 3
}, DEFAULT_BUTTON_PROPS = {
  space: 2,
  padding: 2
}, TooltipButtonWrapper = styled.span.withConfig({
  displayName: "TooltipButtonWrapper",
  componentId: "sc-jrh35q-0"
})`display:inline-flex;`, Button = forwardRef(function(t0, ref) {
  const $ = c(22);
  let paddingLeft, paddingY, rest, t1, t2, t3, tooltipProps;
  $[0] !== t0 ? ({
    size: t1,
    mode: t2,
    paddingY,
    paddingLeft,
    tone: t3,
    tooltipProps,
    ...rest
  } = t0, $[0] = t0, $[1] = paddingLeft, $[2] = paddingY, $[3] = rest, $[4] = t1, $[5] = t2, $[6] = t3, $[7] = tooltipProps) : (paddingLeft = $[1], paddingY = $[2], rest = $[3], t1 = $[4], t2 = $[5], t3 = $[6], tooltipProps = $[7]);
  const size = t1 === void 0 ? "default" : t1, mode = t2 === void 0 ? "default" : t2, tone = t3 === void 0 ? "default" : t3, sizeProps = size === "default" ? DEFAULT_BUTTON_PROPS : LARGE_BUTTON_PROPS;
  let t4;
  $[8] !== mode || $[9] !== paddingLeft || $[10] !== paddingY || $[11] !== ref || $[12] !== rest || $[13] !== sizeProps || $[14] !== tone ? (t4 = /* @__PURE__ */ jsx(Button$1, { ...rest, ...sizeProps, paddingY, paddingLeft, ref, mode, tone }), $[8] = mode, $[9] = paddingLeft, $[10] = paddingY, $[11] = ref, $[12] = rest, $[13] = sizeProps, $[14] = tone, $[15] = t4) : t4 = $[15];
  const children = t4;
  if (tooltipProps) {
    const t5 = tooltipProps?.content;
    let t6;
    $[16] !== children ? (t6 = /* @__PURE__ */ jsx(TooltipButtonWrapper, { children }), $[16] = children, $[17] = t6) : t6 = $[17];
    let t7;
    return $[18] !== t5 || $[19] !== t6 || $[20] !== tooltipProps ? (t7 = /* @__PURE__ */ jsx(Tooltip, { content: t5, portal: !0, ...tooltipProps, children: t6 }), $[18] = t5, $[19] = t6, $[20] = tooltipProps, $[21] = t7) : t7 = $[21], t7;
  }
  return children;
}), Dialog = forwardRef(function(t0, ref) {
  const $ = c(23);
  let bodyHeight, children, footer, props, t1, t2, zOffset;
  $[0] !== t0 ? ({
    animate: t1,
    bodyHeight,
    children,
    footer,
    padding: t2,
    zOffset,
    ...props
  } = t0, $[0] = t0, $[1] = bodyHeight, $[2] = children, $[3] = footer, $[4] = props, $[5] = t1, $[6] = t2, $[7] = zOffset) : (bodyHeight = $[1], children = $[2], footer = $[3], props = $[4], t1 = $[5], t2 = $[6], zOffset = $[7]);
  const animate = t1 === void 0 ? !0 : t1, padding = t2 === void 0 ? !0 : t2, {
    t
  } = useTranslation();
  let t3;
  $[8] !== footer || $[9] !== props || $[10] !== t ? (t3 = (footer?.confirmButton || footer?.cancelButton) && /* @__PURE__ */ jsxs(Flex, { width: "full", gap: 3, justify: "flex-end", padding: 3, align: "center", children: [
    footer?.description && /* @__PURE__ */ jsx(Box, { flex: 1, paddingLeft: 1, children: /* @__PURE__ */ jsx(Text, { size: 1, muted: !0, children: footer.description }) }),
    props.onClose && /* @__PURE__ */ jsx(Button$1, { mode: "bleed", padding: 2, text: t("common.dialog.cancel-button.text"), tone: "default", onClick: props.onClose, "data-testid": "cancel-button", ...footer.cancelButton }),
    footer.confirmButton && /* @__PURE__ */ jsx(Button$1, { mode: "default", padding: 2, text: t("common.dialog.confirm-button.text"), tone: "critical", "data-testid": "confirm-button", ...footer.confirmButton })
  ] }), $[8] = footer, $[9] = props, $[10] = t, $[11] = t3) : t3 = $[11];
  const t4 = padding ? 4 : 0;
  let t5;
  $[12] !== bodyHeight || $[13] !== children || $[14] !== t4 ? (t5 = /* @__PURE__ */ jsx(Box, { height: bodyHeight, padding: t4, children }), $[12] = bodyHeight, $[13] = children, $[14] = t4, $[15] = t5) : t5 = $[15];
  let t6;
  return $[16] !== animate || $[17] !== props || $[18] !== ref || $[19] !== t3 || $[20] !== t5 || $[21] !== zOffset ? (t6 = /* @__PURE__ */ jsx(Dialog$1, { ...props, animate, zOffset, ref, footer: t3, children: t5 }), $[16] = animate, $[17] = props, $[18] = ref, $[19] = t3, $[20] = t5, $[21] = zOffset, $[22] = t6) : t6 = $[22], t6;
});
function ErrorBoundary(t0) {
  const $ = c(9);
  let onCatch, rest;
  $[0] !== t0 ? ({
    onCatch,
    ...rest
  } = t0, $[0] = t0, $[1] = onCatch, $[2] = rest) : (onCatch = $[1], rest = $[2]);
  const source = useContext(SourceContext);
  let t1;
  $[3] !== onCatch || $[4] !== source ? (t1 = (t22) => {
    const {
      error: caughtError,
      info: caughtInfo
    } = t22, run = () => {
      source?.onUncaughtError?.(caughtError, caughtInfo);
    };
    try {
      run();
    } catch (t3) {
      const e = t3;
      e.message = `Encountered an additional error when calling custom "onUncaughtError()": ${e.message}`, console.error(e);
    }
    onCatch?.({
      error: caughtError,
      info: caughtInfo
    });
  }, $[3] = onCatch, $[4] = source, $[5] = t1) : t1 = $[5];
  const handleCatch = t1;
  let t2;
  return $[6] !== handleCatch || $[7] !== rest ? (t2 = /* @__PURE__ */ jsx(ErrorBoundary$1, { ...rest, onCatch: handleCatch }), $[6] = handleCatch, $[7] = rest, $[8] = t2) : t2 = $[8], t2;
}
const MenuButton = forwardRef(function(props, ref) {
  const $ = c(6);
  let t0;
  $[0] !== props.popover ? (t0 = {
    ...props.popover,
    animate: !0
  }, $[0] = props.popover, $[1] = t0) : t0 = $[1];
  let t1;
  return $[2] !== props || $[3] !== ref || $[4] !== t0 ? (t1 = /* @__PURE__ */ jsx(MenuButton$1, { ...props, ref, popover: t0 }), $[2] = props, $[3] = ref, $[4] = t0, $[5] = t1) : t1 = $[5], t1;
});
function Hotkeys(t0) {
  const $ = c(12);
  let props, t1, t2;
  $[0] !== t0 ? ({
    makePlatformAware: t1,
    keys: t2,
    ...props
  } = t0, $[0] = t0, $[1] = props, $[2] = t1, $[3] = t2) : (props = $[1], t1 = $[2], t2 = $[3]);
  const makePlatformAware = t1 === void 0 ? !0 : t1;
  let t3;
  $[4] !== t2 ? (t3 = t2 === void 0 ? [] : t2, $[4] = t2, $[5] = t3) : t3 = $[5];
  const hotKeys = t3;
  let t4;
  $[6] !== hotKeys || $[7] !== makePlatformAware ? (t4 = makePlatformAware ? hotKeys.map(platformifyKey) : hotKeys, $[6] = hotKeys, $[7] = makePlatformAware, $[8] = t4) : t4 = $[8];
  const keys = t4;
  let t5;
  return $[9] !== keys || $[10] !== props ? (t5 = /* @__PURE__ */ jsx(Hotkeys$1, { ...props, keys }), $[9] = keys, $[10] = props, $[11] = t5) : t5 = $[11], t5;
}
const IS_APPLE_DEVICE = typeof navigator > "u" || typeof navigator.platform != "string" ? !1 : /Mac|iPod|iPhone|iPad/.test(navigator.platform || "");
function platformifyKey(key) {
  const lowerKey = key.toLowerCase();
  return lowerKey === "alt" && IS_APPLE_DEVICE ? matchCase(key, "option") : lowerKey === "option" && !IS_APPLE_DEVICE ? matchCase(key, "alt") : key;
}
function matchCase(original, target) {
  const orgLength = original.length;
  return target.replace(/./g, (char, i) => i < orgLength && original[i] === original[i].toUpperCase() ? char.toUpperCase() : char);
}
const TOOLTIP_DELAY_PROPS = {
  open: 400
}, TOOLTIP_SHARED_PROPS = {
  animate: !0,
  arrow: !1,
  boundaryElement: null,
  delay: TOOLTIP_DELAY_PROPS,
  fallbackPlacements: ["bottom-start", "bottom-end", "top-start", "top-end"],
  placement: "bottom",
  portal: !0
}, Tooltip = forwardRef(function(props, ref) {
  const $ = c(19);
  let content, hotkeys, rest;
  if ($[0] !== props ? ({
    content,
    hotkeys,
    ...rest
  } = props, $[0] = props, $[1] = content, $[2] = hotkeys, $[3] = rest) : (content = $[1], hotkeys = $[2], rest = $[3]), typeof content == "string") {
    let t02;
    $[4] !== content ? (t02 = content && /* @__PURE__ */ jsx(Box, { flex: 1, padding: 1, children: /* @__PURE__ */ jsx(Text, { size: 1, children: content }) }), $[4] = content, $[5] = t02) : t02 = $[5];
    let t1;
    $[6] !== hotkeys ? (t1 = hotkeys && /* @__PURE__ */ jsx(Box, { flex: "none", children: /* @__PURE__ */ jsx(Hotkeys, { keys: hotkeys }) }), $[6] = hotkeys, $[7] = t1) : t1 = $[7];
    let t2;
    $[8] !== t02 || $[9] !== t1 ? (t2 = /* @__PURE__ */ jsxs(Flex, { align: "center", children: [
      t02,
      t1
    ] }), $[8] = t02, $[9] = t1, $[10] = t2) : t2 = $[10];
    let t3;
    return $[11] !== ref || $[12] !== rest || $[13] !== t2 ? (t3 = /* @__PURE__ */ jsx(Tooltip$1, { ...TOOLTIP_SHARED_PROPS, content: t2, padding: 1, ref, ...rest }), $[11] = ref, $[12] = rest, $[13] = t2, $[14] = t3) : t3 = $[14], t3;
  }
  let t0;
  return $[15] !== content || $[16] !== ref || $[17] !== rest ? (t0 = /* @__PURE__ */ jsx(Tooltip$1, { ...TOOLTIP_SHARED_PROPS, content, ref, ...rest }), $[15] = content, $[16] = ref, $[17] = rest, $[18] = t0) : t0 = $[18], t0;
}), FONT_SIZE = 1, SUBTITLE_FONT_SIZE = 0, SubtitleText = styled(Text).withConfig({
  displayName: "SubtitleText",
  componentId: "sc-1sm0vyt-0"
})`margin-top:2px;`, PreviewWrapper = styled(Box).withConfig({
  displayName: "PreviewWrapper",
  componentId: "sc-1sm0vyt-1"
})`height:25px;width:25px;overflow:hidden;`, MenuItem = forwardRef(function(t0, ref) {
  const $ = c(49);
  let Icon, IconRight, __unstable_space, __unstable_subtitle, badgeText, childrenProp, disabled, hotkeys, renderMenuItem, rest, t1, text, tooltipProps;
  $[0] !== t0 ? ({
    badgeText,
    children: childrenProp,
    disabled,
    hotkeys,
    icon: Icon,
    iconRight: IconRight,
    preview: t1,
    renderMenuItem,
    text,
    tooltipProps,
    __unstable_subtitle,
    __unstable_space,
    ...rest
  } = t0, $[0] = t0, $[1] = Icon, $[2] = IconRight, $[3] = __unstable_space, $[4] = __unstable_subtitle, $[5] = badgeText, $[6] = childrenProp, $[7] = disabled, $[8] = hotkeys, $[9] = renderMenuItem, $[10] = rest, $[11] = t1, $[12] = text, $[13] = tooltipProps) : (Icon = $[1], IconRight = $[2], __unstable_space = $[3], __unstable_subtitle = $[4], badgeText = $[5], childrenProp = $[6], disabled = $[7], hotkeys = $[8], renderMenuItem = $[9], rest = $[10], t1 = $[11], text = $[12], tooltipProps = $[13]);
  const preview = t1 === void 0 ? null : t1;
  let t2;
  $[14] !== __unstable_space || $[15] !== disabled || $[16] !== preview ? (t2 = preview && /* @__PURE__ */ jsx(PreviewWrapper, { style: {
    opacity: disabled ? 0.25 : void 0
  }, paddingRight: __unstable_space ? 1 : 0, children: /* @__PURE__ */ jsx(Flex, { align: "center", height: "fill", justify: "center", children: preview }) }), $[14] = __unstable_space, $[15] = disabled, $[16] = preview, $[17] = t2) : t2 = $[17];
  let t3;
  $[18] !== Icon ? (t3 = Icon && /* @__PURE__ */ jsx(Box, { paddingRight: 1, children: /* @__PURE__ */ jsxs(Text, { size: FONT_SIZE, children: [
    isValidElement(Icon) && Icon,
    isValidElementType(Icon) && /* @__PURE__ */ jsx(Icon, {})
  ] }) }), $[18] = Icon, $[19] = t3) : t3 = $[19];
  let t4;
  $[20] !== __unstable_subtitle || $[21] !== text ? (t4 = text && /* @__PURE__ */ jsxs(Stack, { flex: 1, space: __unstable_subtitle ? 1 : 2, children: [
    /* @__PURE__ */ jsx(Text, { size: FONT_SIZE, textOverflow: "ellipsis", weight: "medium", children: text }),
    __unstable_subtitle && /* @__PURE__ */ jsx(SubtitleText, { size: SUBTITLE_FONT_SIZE, textOverflow: "ellipsis", weight: "medium", muted: !0, children: __unstable_subtitle })
  ] }), $[20] = __unstable_subtitle, $[21] = text, $[22] = t4) : t4 = $[22];
  let t5;
  $[23] !== IconRight || $[24] !== badgeText || $[25] !== hotkeys ? (t5 = (badgeText || hotkeys || IconRight) && /* @__PURE__ */ jsxs(Flex, { align: "center", gap: 3, marginLeft: 3, children: [
    hotkeys && /* @__PURE__ */ jsx(Hotkeys, { keys: hotkeys, style: {
      marginTop: -4,
      marginBottom: -4
    } }),
    badgeText && /* @__PURE__ */ jsx(Badge, { fontSize: 0, style: {
      marginTop: -4,
      marginBottom: -4
    }, children: badgeText }),
    IconRight && /* @__PURE__ */ jsxs(Text, { size: FONT_SIZE, children: [
      isValidElement(IconRight) && IconRight,
      isValidElementType(IconRight) && /* @__PURE__ */ jsx(IconRight, {})
    ] })
  ] }), $[23] = IconRight, $[24] = badgeText, $[25] = hotkeys, $[26] = t5) : t5 = $[26];
  let t6;
  $[27] !== t2 || $[28] !== t3 || $[29] !== t4 || $[30] !== t5 ? (t6 = /* @__PURE__ */ jsxs(Flex, { align: "center", gap: 2, children: [
    t2,
    t3,
    t4,
    t5
  ] }), $[27] = t2, $[28] = t3, $[29] = t4, $[30] = t5, $[31] = t6) : t6 = $[31];
  const menuItemContent = t6, t7 = preview ? 1 : 3, t8 = preview ? 1 : 3;
  let t9;
  $[32] !== childrenProp || $[33] !== menuItemContent || $[34] !== renderMenuItem ? (t9 = typeof childrenProp > "u" && typeof renderMenuItem == "function" ? renderMenuItem(menuItemContent) : menuItemContent, $[32] = childrenProp, $[33] = menuItemContent, $[34] = renderMenuItem, $[35] = t9) : t9 = $[35];
  let t10;
  $[36] !== disabled || $[37] !== ref || $[38] !== rest || $[39] !== t7 || $[40] !== t8 || $[41] !== t9 ? (t10 = /* @__PURE__ */ jsx(MenuItem$1, { disabled, paddingLeft: t7, paddingRight: 3, paddingY: t8, ref, ...rest, children: t9 }), $[36] = disabled, $[37] = ref, $[38] = rest, $[39] = t7, $[40] = t8, $[41] = t9, $[42] = t10) : t10 = $[42];
  const children = t10;
  if (tooltipProps) {
    const t11 = tooltipProps?.content;
    let t12;
    $[43] !== children ? (t12 = /* @__PURE__ */ jsx("div", { children }), $[43] = children, $[44] = t12) : t12 = $[44];
    let t13;
    return $[45] !== t11 || $[46] !== t12 || $[47] !== tooltipProps ? (t13 = /* @__PURE__ */ jsx(Tooltip, { content: t11, portal: !0, ...tooltipProps, children: t12 }), $[45] = t11, $[46] = t12, $[47] = tooltipProps, $[48] = t13) : t13 = $[48], t13;
  }
  return children;
}), Popover = forwardRef(function(props, ref) {
  const $ = c(7);
  let restProps, t0;
  $[0] !== props ? ({
    animate: t0,
    ...restProps
  } = props, $[0] = props, $[1] = restProps, $[2] = t0) : (restProps = $[1], t0 = $[2]);
  const animate = t0 === void 0 ? !0 : t0;
  let t1;
  return $[3] !== animate || $[4] !== ref || $[5] !== restProps ? (t1 = /* @__PURE__ */ jsx(Popover$1, { ...restProps, animate, ref }), $[3] = animate, $[4] = ref, $[5] = restProps, $[6] = t1) : t1 = $[6], t1;
}), Tab = forwardRef(function(t0, ref) {
  const $ = c(7);
  let props, t1;
  $[0] !== t0 ? ({
    tone: t1,
    ...props
  } = t0, $[0] = t0, $[1] = props, $[2] = t1) : (props = $[1], t1 = $[2]);
  const tone = t1 === void 0 ? "default" : t1;
  let t2;
  return $[3] !== props || $[4] !== ref || $[5] !== tone ? (t2 = /* @__PURE__ */ jsx(Tab$1, { ...props, muted: !0, padding: 2, ref, tone }), $[3] = props, $[4] = ref, $[5] = tone, $[6] = t2) : t2 = $[6], t2;
}), TooltipDelayGroupProvider = (props) => {
  const $ = c(2);
  let t0;
  return $[0] !== props.children ? (t0 = /* @__PURE__ */ jsx(TooltipDelayGroupProvider$1, { delay: TOOLTIP_DELAY_PROPS, children: props.children }), $[0] = props.children, $[1] = t0) : t0 = $[1], t0;
}, BASE_URL = "https://www.sanity.io/docs/help/";
function generateHelpUrl(slug) {
  return `${BASE_URL}${slug}`;
}
export {
  Button,
  Dialog,
  ErrorBoundary,
  Hotkeys,
  MenuButton,
  MenuItem,
  Popover,
  Tab,
  Tooltip,
  TooltipDelayGroupProvider,
  generateHelpUrl
};
//# sourceMappingURL=index.js.map
