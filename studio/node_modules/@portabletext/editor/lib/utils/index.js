import { blockOffsetToSpanSelectionPoint, getBlockKeyFromSelectionPoint, getChildKeyFromSelectionPoint, isEqualSelectionPoints, parseBlock } from "../_chunks-es/util.slice-blocks.js";
import { getBlockEndPoint, getBlockStartPoint, getSelectionEndPoint, getSelectionStartPoint, isEqualPaths, isKeyedSegment, isSelectionCollapsed, sliceBlocks, spanSelectionPointToBlockOffset } from "../_chunks-es/util.slice-blocks.js";
import { isTextBlock, isSpan } from "@portabletext/schema";
import { isSpan as isSpan2, isTextBlock as isTextBlock2 } from "@portabletext/schema";
import { sliceTextBlock } from "../_chunks-es/util.slice-text-block.js";
import { getTextBlockText, isEmptyTextBlock } from "../_chunks-es/util.slice-text-block.js";
function blockOffsetToBlockSelectionPoint({
  context,
  blockOffset
}) {
  let selectionPoint;
  for (const block of context.value)
    if (block._key === blockOffset.path[0]._key) {
      selectionPoint = {
        path: [{
          _key: block._key
        }],
        offset: blockOffset.offset
      };
      break;
    }
  return selectionPoint;
}
function blockOffsetToSelectionPoint({
  context,
  blockOffset,
  direction
}) {
  return blockOffsetToSpanSelectionPoint({
    context,
    blockOffset,
    direction
  }) || blockOffsetToBlockSelectionPoint({
    context,
    blockOffset
  });
}
function blockOffsetsToSelection({
  context,
  offsets,
  backward
}) {
  const anchor = blockOffsetToSelectionPoint({
    context,
    blockOffset: offsets.anchor,
    direction: backward ? "backward" : "forward"
  }), focus = blockOffsetToSelectionPoint({
    context,
    blockOffset: offsets.focus,
    direction: backward ? "forward" : "backward"
  });
  return !anchor || !focus ? null : {
    anchor,
    focus,
    backward
  };
}
function childSelectionPointToBlockOffset({
  context,
  selectionPoint
}) {
  let offset = 0;
  const blockKey = getBlockKeyFromSelectionPoint(selectionPoint), childKey = getChildKeyFromSelectionPoint(selectionPoint);
  if (!(!blockKey || !childKey)) {
    for (const block of context.value)
      if (block._key === blockKey && isTextBlock(context, block))
        for (const child of block.children) {
          if (child._key === childKey)
            return {
              path: [{
                _key: block._key
              }],
              offset: offset + selectionPoint.offset
            };
          isSpan(context, child) && (offset += child.text.length);
        }
  }
}
function isEqualSelections(a, b) {
  return !a && !b ? !0 : !a || !b ? !1 : isEqualSelectionPoints(a.anchor, b.anchor) && isEqualSelectionPoints(a.focus, b.focus);
}
function mergeTextBlocks({
  context,
  targetBlock,
  incomingBlock
}) {
  const parsedIncomingBlock = parseBlock({
    context,
    block: incomingBlock,
    options: {
      normalize: !1,
      removeUnusedMarkDefs: !0,
      validateFields: !1
    }
  });
  return !parsedIncomingBlock || !isTextBlock(context, parsedIncomingBlock) ? targetBlock : {
    ...targetBlock,
    children: [...targetBlock.children, ...parsedIncomingBlock.children],
    markDefs: [...targetBlock.markDefs ?? [], ...parsedIncomingBlock.markDefs ?? []]
  };
}
function reverseSelection(selection) {
  return selection && (selection.backward ? {
    anchor: selection.focus,
    focus: selection.anchor,
    backward: !1
  } : {
    anchor: selection.focus,
    focus: selection.anchor,
    backward: !0
  });
}
function selectionPointToBlockOffset({
  context,
  selectionPoint
}) {
  const blockKey = getBlockKeyFromSelectionPoint(selectionPoint);
  return selectionPoint.path.length === 1 && blockKey !== void 0 ? {
    path: [{
      _key: blockKey
    }],
    offset: selectionPoint.offset
  } : childSelectionPointToBlockOffset({
    context,
    selectionPoint
  });
}
function splitTextBlock({
  context,
  block,
  point
}) {
  const firstChild = block.children.at(0), lastChild = block.children.at(block.children.length - 1);
  if (!firstChild || !lastChild)
    return;
  const before = sliceTextBlock({
    context: {
      schema: context.schema,
      selection: {
        anchor: {
          path: [{
            _key: block._key
          }, "children", {
            _key: firstChild._key
          }],
          offset: 0
        },
        focus: point
      }
    },
    block
  }), after = sliceTextBlock({
    context: {
      schema: context.schema,
      selection: {
        anchor: point,
        focus: {
          path: [{
            _key: block._key
          }, "children", {
            _key: lastChild._key
          }],
          offset: isSpan(context, lastChild) ? lastChild.text.length : 0
        }
      }
    },
    block
  });
  return {
    before,
    after
  };
}
export {
  blockOffsetToBlockSelectionPoint,
  blockOffsetToSelectionPoint,
  blockOffsetToSpanSelectionPoint,
  blockOffsetsToSelection,
  childSelectionPointToBlockOffset,
  getBlockEndPoint,
  getBlockStartPoint,
  getSelectionEndPoint,
  getSelectionStartPoint,
  getTextBlockText,
  isEmptyTextBlock,
  isEqualPaths,
  isEqualSelectionPoints,
  isEqualSelections,
  isKeyedSegment,
  isSelectionCollapsed,
  isSpan2 as isSpan,
  isTextBlock2 as isTextBlock,
  mergeTextBlocks,
  reverseSelection,
  selectionPointToBlockOffset,
  sliceBlocks,
  spanSelectionPointToBlockOffset,
  splitTextBlock
};
//# sourceMappingURL=index.js.map
