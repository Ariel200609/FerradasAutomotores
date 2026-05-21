import { c } from "react/compiler-runtime";
import { useEditor } from "@portabletext/editor";
import { defineBehavior, raise } from "@portabletext/editor/behaviors";
import * as selectors from "@portabletext/editor/selectors";
import * as utils from "@portabletext/editor/utils";
import { useEffect } from "react";
const oneLineBehaviors = [
  /**
   * Hitting Enter on an expanded selection should just delete that selection
   * without causing a line break.
   */
  defineBehavior({
    on: "insert.break",
    guard: ({
      snapshot
    }) => snapshot.context.selection && selectors.isSelectionExpanded(snapshot) ? {
      selection: snapshot.context.selection
    } : !1,
    actions: [(_, {
      selection
    }) => [raise({
      type: "delete",
      at: selection
    })]]
  }),
  /**
   * All other cases of `insert.break` should be aborted.
   */
  defineBehavior({
    on: "insert.break",
    actions: []
  }),
  /**
   * `insert.block` `before` or `after` is not allowed in a one-line editor.
   */
  defineBehavior({
    on: "insert.block",
    guard: ({
      event
    }) => event.placement === "before" || event.placement === "after",
    actions: []
  }),
  /**
   * An ordinary `insert.block` is acceptable if it's a text block. In that
   * case it will get merged into the existing text block.
   */
  defineBehavior({
    on: "insert.block",
    guard: ({
      snapshot,
      event
    }) => !selectors.getFocusTextBlock(snapshot) || !utils.isTextBlock(snapshot.context, event.block) ? !1 : event.placement !== "auto" || event.select !== "end",
    actions: [({
      event
    }) => [raise({
      type: "insert.block",
      block: event.block,
      placement: "auto",
      select: "end"
    })]]
  }),
  /**
   * Fallback Behavior to avoid `insert.block` in case the Behaviors above all
   * end up with a falsy guard.
   */
  defineBehavior({
    on: "insert.block",
    guard: ({
      snapshot,
      event
    }) => selectors.getFocusTextBlock(snapshot) ? !utils.isTextBlock(snapshot.context, event.block) : !0,
    actions: []
  }),
  /**
   * If multiple blocks are inserted, then the non-text blocks are filtered out
   * and the text blocks are merged into one block
   */
  defineBehavior({
    on: "insert.blocks",
    guard: ({
      snapshot,
      event
    }) => {
      const textBlocks = event.blocks.filter((block) => utils.isTextBlock(snapshot.context, block));
      return textBlocks.length === 0 ? !1 : textBlocks.reduce((targetBlock, incomingBlock) => utils.mergeTextBlocks({
        context: snapshot.context,
        targetBlock,
        incomingBlock
      }));
    },
    actions: [
      // `insert.block` is raised so the Behavior above can handle the
      // insertion
      (_, block) => [raise({
        type: "insert.block",
        block,
        placement: "auto"
      })]
    ]
  }),
  /**
   * Fallback Behavior to avoid `insert.blocks` in case the Behavior above
   * ends up with a falsy guard.
   */
  defineBehavior({
    on: "insert.blocks",
    actions: []
  })
];
function OneLinePlugin() {
  const $ = c(3), editor = useEditor();
  let t0, t1;
  return $[0] !== editor ? (t0 = () => {
    const unregisterBehaviors = oneLineBehaviors.map((behavior) => editor.registerBehavior({
      behavior
    }));
    return () => {
      for (const unregisterBehavior of unregisterBehaviors)
        unregisterBehavior();
    };
  }, t1 = [editor], $[0] = editor, $[1] = t0, $[2] = t1) : (t0 = $[1], t1 = $[2]), useEffect(t0, t1), null;
}
export {
  OneLinePlugin
};
//# sourceMappingURL=index.js.map
