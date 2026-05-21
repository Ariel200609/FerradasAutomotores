import { isTextBlock, isSpan } from "@portabletext/schema";
import { getBlockKeyFromSelectionPoint, getSelectionStartPoint, getSelectionEndPoint, getChildKeyFromSelectionPoint } from "./util.slice-blocks.js";
function getTextBlockText(block) {
  return block.children.map((child) => child.text ?? "").join("");
}
function isEmptyTextBlock(context, block) {
  if (!isTextBlock(context, block))
    return !1;
  const onlyText = block.children.every((child) => isSpan(context, child)), blockText = getTextBlockText(block);
  return onlyText && blockText === "";
}
function sliceTextBlock({
  context,
  block
}) {
  const startPoint = getSelectionStartPoint(context.selection), endPoint = getSelectionEndPoint(context.selection);
  if (!startPoint || !endPoint)
    return block;
  const startBlockKey = getBlockKeyFromSelectionPoint(startPoint), endBlockKey = getBlockKeyFromSelectionPoint(endPoint);
  if (startBlockKey !== endBlockKey || startBlockKey !== block._key)
    return block;
  const startChildKey = getChildKeyFromSelectionPoint(startPoint), endChildKey = getChildKeyFromSelectionPoint(endPoint);
  if (!startChildKey || !endChildKey)
    return block;
  let startChildFound = !1;
  const children = [];
  for (const child of block.children) {
    if (child._key === startChildKey) {
      if (startChildFound = !0, isSpan(context, child)) {
        const text = child._key === endChildKey ? child.text.slice(startPoint.offset, endPoint.offset) : child.text.slice(startPoint.offset);
        children.push({
          ...child,
          text
        });
      } else
        children.push(child);
      if (startChildKey === endChildKey)
        break;
      continue;
    }
    if (child._key === endChildKey) {
      isSpan(context, child) ? children.push({
        ...child,
        text: child.text.slice(0, endPoint.offset)
      }) : children.push(child);
      break;
    }
    startChildFound && children.push(child);
  }
  return {
    ...block,
    children
  };
}
export {
  getTextBlockText,
  isEmptyTextBlock,
  sliceTextBlock
};
//# sourceMappingURL=util.slice-text-block.js.map
