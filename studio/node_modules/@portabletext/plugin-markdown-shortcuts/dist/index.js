import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { c } from "react/compiler-runtime";
import { useEditor } from "@portabletext/editor";
import { CharacterPairDecoratorPlugin } from "@portabletext/plugin-character-pair-decorator";
import { defineInputRule, InputRulePlugin } from "@portabletext/plugin-input-rule";
import { useEffect } from "react";
import { defineBehavior, raise } from "@portabletext/editor/behaviors";
import * as selectors from "@portabletext/editor/selectors";
import { getPreviousInlineObject } from "@portabletext/editor/selectors";
function createMarkdownBehaviors(config) {
  const automaticHrOnPaste = defineBehavior({
    on: "clipboard.paste",
    guard: ({
      snapshot,
      event
    }) => {
      const text = event.originEvent.dataTransfer.getData("text/plain"), hrRegExp = /^(---)$|^(—-)$|^(___)$|^(\*\*\*)$/, hrCharacters = text.match(hrRegExp)?.[0], hrObject = config.horizontalRuleObject?.({
        context: {
          schema: snapshot.context.schema,
          keyGenerator: snapshot.context.keyGenerator
        }
      }), focusBlock = selectors.getFocusBlock(snapshot), focusTextBlock = selectors.getFocusTextBlock(snapshot);
      return !hrCharacters || !hrObject || !focusBlock ? !1 : {
        hrCharacters,
        hrObject,
        focusBlock,
        focusTextBlock
      };
    },
    actions: [(_, {
      hrCharacters
    }) => [raise({
      type: "insert.text",
      text: hrCharacters
    })], ({
      snapshot
    }, {
      hrObject,
      focusBlock,
      focusTextBlock
    }) => focusTextBlock ? [raise({
      type: "insert.block",
      block: {
        _type: snapshot.context.schema.block.name,
        children: focusTextBlock.node.children
      },
      placement: "after"
    }), raise({
      type: "insert.block",
      block: hrObject,
      placement: "after"
    }), raise({
      type: "delete.block",
      at: focusBlock.path
    })] : [raise({
      type: "insert.block",
      block: hrObject,
      placement: "after"
    })]]
  }), clearStyleOnBackspace = defineBehavior({
    on: "delete.backward",
    guard: ({
      snapshot
    }) => {
      const selectionCollapsed = selectors.isSelectionCollapsed(snapshot), focusTextBlock = selectors.getFocusTextBlock(snapshot), focusSpan = selectors.getFocusSpan(snapshot);
      if (!selectionCollapsed || !focusTextBlock || !focusSpan)
        return !1;
      const atTheBeginningOfBLock = focusTextBlock.node.children[0]._key === focusSpan.node._key && snapshot.context.selection?.focus.offset === 0, defaultStyle = config.defaultStyle?.({
        context: {
          schema: snapshot.context.schema
        },
        schema: snapshot.context.schema
      });
      return atTheBeginningOfBLock && defaultStyle && focusTextBlock.node.style !== defaultStyle ? {
        defaultStyle,
        focusTextBlock
      } : !1;
    },
    actions: [(_, {
      defaultStyle,
      focusTextBlock
    }) => [raise({
      type: "block.set",
      props: {
        style: defaultStyle
      },
      at: focusTextBlock.path
    })]]
  });
  return [automaticHrOnPaste, clearStyleOnBackspace];
}
function createBlockquoteRule(config) {
  return defineInputRule({
    on: /^> /,
    guard: ({
      snapshot,
      event
    }) => {
      const style = config.blockquoteStyle({
        context: {
          schema: snapshot.context.schema
        },
        schema: snapshot.context.schema
      });
      if (!style || getPreviousInlineObject(snapshot))
        return !1;
      const match = event.matches.at(0);
      return match ? {
        style,
        match
      } : !1;
    },
    actions: [({
      event
    }, {
      style,
      match
    }) => [raise({
      type: "block.unset",
      props: ["listItem", "level"],
      at: event.focusBlock.path
    }), raise({
      type: "block.set",
      props: {
        style
      },
      at: event.focusBlock.path
    }), raise({
      type: "delete",
      at: match.targetOffsets
    })]]
  });
}
function createHeadingRule(config) {
  return defineInputRule({
    on: /^#+ /,
    guard: ({
      snapshot,
      event
    }) => {
      if (getPreviousInlineObject(snapshot))
        return !1;
      const match = event.matches.at(0);
      if (!match)
        return !1;
      const level = match.text.length - 1, style = config.headingStyle({
        context: {
          schema: snapshot.context.schema
        },
        schema: snapshot.context.schema,
        props: {
          level
        },
        level
      });
      return style ? {
        match,
        style
      } : !1;
    },
    actions: [({
      event
    }, {
      match,
      style
    }) => [raise({
      type: "block.unset",
      props: ["listItem", "level"],
      at: event.focusBlock.path
    }), raise({
      type: "block.set",
      props: {
        style
      },
      at: event.focusBlock.path
    }), raise({
      type: "delete",
      at: match.targetOffsets
    })]]
  });
}
function createHorizontalRuleRule(config) {
  return defineInputRule({
    on: /^(---)|^(—-)|^(___)|^(\*\*\*)/,
    guard: ({
      snapshot,
      event
    }) => {
      const hrObject = config.horizontalRuleObject({
        context: {
          schema: snapshot.context.schema,
          keyGenerator: snapshot.context.keyGenerator
        }
      });
      if (!hrObject || getPreviousInlineObject(snapshot))
        return !1;
      const match = event.matches.at(0);
      return match ? {
        hrObject,
        match
      } : !1;
    },
    actions: [(_, {
      hrObject,
      match
    }) => [raise({
      type: "insert.block",
      block: hrObject,
      placement: "before",
      select: "none"
    }), raise({
      type: "delete",
      at: match.targetOffsets
    })]]
  });
}
function createMarkdownLinkRule(config) {
  return defineInputRule({
    on: /\[([^[\]]+)]\((.+)\)/,
    actions: [({
      snapshot,
      event
    }) => {
      const newText = event.textBefore + event.textInserted;
      let textLengthDelta = 0;
      const actions = [];
      for (const match of event.matches.reverse()) {
        const textMatch = match.groupMatches.at(0), hrefMatch = match.groupMatches.at(1);
        if (textMatch === void 0 || hrefMatch === void 0)
          continue;
        textLengthDelta = textLengthDelta - (match.targetOffsets.focus.offset - match.targetOffsets.anchor.offset - textMatch.text.length);
        const linkObject = config.linkObject({
          context: {
            schema: snapshot.context.schema,
            keyGenerator: snapshot.context.keyGenerator
          },
          props: {
            href: hrefMatch.text
          }
        });
        if (!linkObject)
          continue;
        const {
          _type,
          _key,
          ...value
        } = linkObject, leftSideOffsets = {
          anchor: match.targetOffsets.anchor,
          focus: textMatch.targetOffsets.anchor
        }, rightSideOffsets = {
          anchor: textMatch.targetOffsets.focus,
          focus: match.targetOffsets.focus
        };
        actions.push(raise({
          type: "select",
          at: textMatch.targetOffsets
        })), actions.push(raise({
          type: "annotation.add",
          annotation: {
            name: _type,
            _key,
            value
          }
        })), actions.push(raise({
          type: "delete",
          at: rightSideOffsets
        })), actions.push(raise({
          type: "delete",
          at: leftSideOffsets
        }));
      }
      const endCaretPosition = {
        path: event.focusBlock.path,
        offset: newText.length - textLengthDelta * -1
      };
      return [...actions, raise({
        type: "select",
        at: {
          anchor: endCaretPosition,
          focus: endCaretPosition
        }
      })];
    }]
  });
}
function createOrderedListRule(config) {
  return defineInputRule({
    on: /^1\. /,
    guard: ({
      snapshot,
      event
    }) => {
      const orderedList = config.orderedList({
        context: {
          schema: snapshot.context.schema
        },
        schema: snapshot.context.schema
      });
      if (!orderedList || getPreviousInlineObject(snapshot))
        return !1;
      const match = event.matches.at(0);
      return match ? {
        match,
        orderedList
      } : !1;
    },
    actions: [({
      event
    }, {
      match,
      orderedList
    }) => [raise({
      type: "block.unset",
      props: ["style"],
      at: event.focusBlock.path
    }), raise({
      type: "block.set",
      props: {
        listItem: orderedList,
        level: event.focusBlock.node.level ?? 1
      },
      at: event.focusBlock.path
    }), raise({
      type: "delete",
      at: match.targetOffsets
    })]]
  });
}
function createUnorderedListRule(config) {
  return defineInputRule({
    on: /^(-|\*) /,
    guard: ({
      snapshot,
      event
    }) => {
      const unorderedList = config.unorderedList({
        context: {
          schema: snapshot.context.schema
        },
        schema: snapshot.context.schema
      });
      if (!unorderedList || getPreviousInlineObject(snapshot))
        return !1;
      const match = event.matches.at(0);
      return match ? {
        match,
        unorderedList
      } : !1;
    },
    actions: [({
      event
    }, {
      match,
      unorderedList
    }) => [raise({
      type: "block.unset",
      props: ["style"],
      at: event.focusBlock.path
    }), raise({
      type: "block.set",
      props: {
        listItem: unorderedList,
        level: event.focusBlock.node.level ?? 1
      },
      at: event.focusBlock.path
    }), raise({
      type: "delete",
      at: match.targetOffsets
    })]]
  });
}
function MarkdownShortcutsPlugin(t0) {
  const $ = c(39), {
    blockquoteStyle,
    boldDecorator,
    codeDecorator,
    defaultStyle,
    headingStyle,
    horizontalRuleObject,
    linkObject,
    italicDecorator,
    orderedList,
    strikeThroughDecorator,
    unorderedList
  } = t0, editor = useEditor();
  let t1, t2;
  $[0] !== defaultStyle || $[1] !== editor ? (t1 = () => {
    const unregisterBehaviors = createMarkdownBehaviors({
      defaultStyle
    }).map((behavior) => editor.registerBehavior({
      behavior
    }));
    return () => {
      for (const unregisterBehavior of unregisterBehaviors)
        unregisterBehavior();
    };
  }, t2 = [defaultStyle, editor], $[0] = defaultStyle, $[1] = editor, $[2] = t1, $[3] = t2) : (t1 = $[2], t2 = $[3]), useEffect(t1, t2);
  let rules;
  if ($[4] !== blockquoteStyle || $[5] !== headingStyle || $[6] !== horizontalRuleObject || $[7] !== linkObject || $[8] !== orderedList || $[9] !== unorderedList) {
    if (rules = [], blockquoteStyle) {
      let t32;
      $[11] !== blockquoteStyle ? (t32 = createBlockquoteRule({
        blockquoteStyle
      }), $[11] = blockquoteStyle, $[12] = t32) : t32 = $[12], rules.push(t32);
    }
    if (headingStyle) {
      let t32;
      $[13] !== headingStyle ? (t32 = createHeadingRule({
        headingStyle
      }), $[13] = headingStyle, $[14] = t32) : t32 = $[14], rules.push(t32);
    }
    if (horizontalRuleObject) {
      let t32;
      $[15] !== horizontalRuleObject ? (t32 = createHorizontalRuleRule({
        horizontalRuleObject
      }), $[15] = horizontalRuleObject, $[16] = t32) : t32 = $[16], rules.push(t32);
    }
    if (linkObject) {
      let t32;
      $[17] !== linkObject ? (t32 = createMarkdownLinkRule({
        linkObject
      }), $[17] = linkObject, $[18] = t32) : t32 = $[18], rules.push(t32);
    }
    if (orderedList) {
      let t32;
      $[19] !== orderedList ? (t32 = createOrderedListRule({
        orderedList
      }), $[19] = orderedList, $[20] = t32) : t32 = $[20], rules.push(t32);
    }
    if (unorderedList) {
      let t32;
      $[21] !== unorderedList ? (t32 = createUnorderedListRule({
        unorderedList
      }), $[21] = unorderedList, $[22] = t32) : t32 = $[22], rules.push(t32);
    }
    $[4] = blockquoteStyle, $[5] = headingStyle, $[6] = horizontalRuleObject, $[7] = linkObject, $[8] = orderedList, $[9] = unorderedList, $[10] = rules;
  } else
    rules = $[10];
  const inputRules = rules.length > 0 ? rules : null;
  let t3;
  $[23] !== boldDecorator ? (t3 = boldDecorator ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(CharacterPairDecoratorPlugin, { decorator: boldDecorator, pair: {
      char: "*",
      amount: 2
    } }),
    /* @__PURE__ */ jsx(CharacterPairDecoratorPlugin, { decorator: boldDecorator, pair: {
      char: "_",
      amount: 2
    } })
  ] }) : null, $[23] = boldDecorator, $[24] = t3) : t3 = $[24];
  let t4;
  $[25] !== codeDecorator ? (t4 = codeDecorator ? /* @__PURE__ */ jsx(CharacterPairDecoratorPlugin, { decorator: codeDecorator, pair: {
    char: "`",
    amount: 1
  } }) : null, $[25] = codeDecorator, $[26] = t4) : t4 = $[26];
  let t5;
  $[27] !== italicDecorator ? (t5 = italicDecorator ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(CharacterPairDecoratorPlugin, { decorator: italicDecorator, pair: {
      char: "*",
      amount: 1
    } }),
    /* @__PURE__ */ jsx(CharacterPairDecoratorPlugin, { decorator: italicDecorator, pair: {
      char: "_",
      amount: 1
    } })
  ] }) : null, $[27] = italicDecorator, $[28] = t5) : t5 = $[28];
  let t6;
  $[29] !== strikeThroughDecorator ? (t6 = strikeThroughDecorator ? /* @__PURE__ */ jsx(CharacterPairDecoratorPlugin, { decorator: strikeThroughDecorator, pair: {
    char: "~",
    amount: 2
  } }) : null, $[29] = strikeThroughDecorator, $[30] = t6) : t6 = $[30];
  let t7;
  $[31] !== inputRules ? (t7 = inputRules ? /* @__PURE__ */ jsx(InputRulePlugin, { rules: inputRules }) : null, $[31] = inputRules, $[32] = t7) : t7 = $[32];
  let t8;
  return $[33] !== t3 || $[34] !== t4 || $[35] !== t5 || $[36] !== t6 || $[37] !== t7 ? (t8 = /* @__PURE__ */ jsxs(Fragment, { children: [
    t3,
    t4,
    t5,
    t6,
    t7
  ] }), $[33] = t3, $[34] = t4, $[35] = t5, $[36] = t6, $[37] = t7, $[38] = t8) : t8 = $[38], t8;
}
export {
  MarkdownShortcutsPlugin
};
//# sourceMappingURL=index.js.map
