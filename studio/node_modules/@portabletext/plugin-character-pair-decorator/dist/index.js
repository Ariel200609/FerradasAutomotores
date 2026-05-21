import { c } from "react/compiler-runtime";
import { useEditor } from "@portabletext/editor";
import { defineBehavior, forward, raise, effect } from "@portabletext/editor/behaviors";
import * as utils from "@portabletext/editor/utils";
import { useActorRef } from "@xstate/react";
import { isDeepEqual } from "remeda";
import { setup, fromCallback, assign } from "xstate";
import * as selectors from "@portabletext/editor/selectors";
function createCharacterPairRegex(char, amount) {
  const prePrefix = `(?<!\\${char})`, prefix = `\\${char}`.repeat(Math.max(amount, 1)), postPrefix = "(?!\\s)", content = `([^${char}\\n]+?)`, preSuffix = "(?<!\\s)", suffix = `\\${char}`.repeat(Math.max(amount, 1)), postSuffix = `(?!\\${char})`;
  return `${prePrefix}${prefix}${postPrefix}${content}${preSuffix}${suffix}${postSuffix}`;
}
function createCharacterPairDecoratorBehavior(config) {
  config.pair.amount < 1 && console.warn("The amount of characters in the pair should be greater than 0");
  const pairRegex = createCharacterPairRegex(config.pair.char, config.pair.amount), regEx = new RegExp(`(${pairRegex})$`);
  return defineBehavior({
    on: "insert.text",
    guard: ({
      snapshot,
      event
    }) => {
      if (config.pair.amount < 1)
        return !1;
      const decorator = config.decorator({
        context: {
          schema: snapshot.context.schema
        },
        schema: snapshot.context.schema
      });
      if (decorator === void 0)
        return !1;
      const focusTextBlock = selectors.getFocusTextBlock(snapshot), selectionStartPoint = selectors.getSelectionStartPoint(snapshot), selectionStartOffset = selectionStartPoint ? utils.spanSelectionPointToBlockOffset({
        context: snapshot.context,
        selectionPoint: selectionStartPoint
      }) : void 0;
      if (!focusTextBlock || !selectionStartOffset)
        return !1;
      const newText = `${selectors.getBlockTextBefore(snapshot)}${event.text}`, textToDecorate = newText.match(regEx)?.at(0);
      if (textToDecorate === void 0)
        return !1;
      const prefixOffsets = {
        anchor: {
          path: focusTextBlock.path,
          // Example: "foo **bar**".length - "**bar**".length = 4
          offset: newText.length - textToDecorate.length
        },
        focus: {
          path: focusTextBlock.path,
          // Example: "foo **bar**".length - "**bar**".length + "*".length * 2 = 6
          offset: newText.length - textToDecorate.length + config.pair.char.length * config.pair.amount
        }
      }, suffixOffsets = {
        anchor: {
          path: focusTextBlock.path,
          // Example: "foo **bar*|" (10) + "*".length - 2 = 9
          offset: selectionStartOffset.offset + event.text.length - config.pair.char.length * config.pair.amount
        },
        focus: {
          path: focusTextBlock.path,
          // Example: "foo **bar*|" (10) + "*".length = 11
          offset: selectionStartOffset.offset + event.text.length
        }
      };
      if (prefixOffsets.focus.offset - prefixOffsets.anchor.offset > 1) {
        const prefixSelection = utils.blockOffsetsToSelection({
          context: snapshot.context,
          offsets: prefixOffsets
        }), inlineObjectBeforePrefixFocus = selectors.getPreviousInlineObject({
          ...snapshot,
          context: {
            ...snapshot.context,
            selection: prefixSelection ? {
              anchor: prefixSelection.focus,
              focus: prefixSelection.focus
            } : null
          }
        }), inlineObjectBeforePrefixFocusOffset = inlineObjectBeforePrefixFocus ? utils.childSelectionPointToBlockOffset({
          context: snapshot.context,
          selectionPoint: {
            path: inlineObjectBeforePrefixFocus.path,
            offset: 0
          }
        }) : void 0;
        if (inlineObjectBeforePrefixFocusOffset && inlineObjectBeforePrefixFocusOffset.offset > prefixOffsets.anchor.offset && inlineObjectBeforePrefixFocusOffset.offset < prefixOffsets.focus.offset)
          return !1;
      }
      if (suffixOffsets.focus.offset - suffixOffsets.anchor.offset > 1) {
        const previousInlineObject = selectors.getPreviousInlineObject(snapshot), previousInlineObjectOffset = previousInlineObject ? utils.childSelectionPointToBlockOffset({
          context: snapshot.context,
          selectionPoint: {
            path: previousInlineObject.path,
            offset: 0
          }
        }) : void 0;
        if (previousInlineObjectOffset && previousInlineObjectOffset.offset > suffixOffsets.anchor.offset && previousInlineObjectOffset.offset < suffixOffsets.focus.offset)
          return !1;
      }
      return {
        prefixOffsets,
        suffixOffsets,
        decorator
      };
    },
    actions: [
      // Insert the text as usual in its own undo step
      ({
        event
      }) => [forward(event)],
      (_, {
        prefixOffsets,
        suffixOffsets,
        decorator
      }) => [
        // Decorate the text between the prefix and suffix
        raise({
          type: "decorator.add",
          decorator,
          at: {
            anchor: prefixOffsets.focus,
            focus: suffixOffsets.anchor
          }
        }),
        // Delete the suffix
        raise({
          type: "delete.text",
          at: suffixOffsets
        }),
        // Delete the prefix
        raise({
          type: "delete.text",
          at: prefixOffsets
        }),
        // Toggle the decorator off so the next inserted text isn't emphasized
        raise({
          type: "decorator.remove",
          decorator
        }),
        effect(() => {
          config.onDecorate({
            ...suffixOffsets.anchor,
            offset: suffixOffsets.anchor.offset - (prefixOffsets.focus.offset - prefixOffsets.anchor.offset)
          });
        })
      ]
    ]
  });
}
function CharacterPairDecoratorPlugin(props) {
  const $ = c(4), editor = useEditor();
  let t0;
  return $[0] !== editor || $[1] !== props.decorator || $[2] !== props.pair ? (t0 = {
    input: {
      editor,
      decorator: props.decorator,
      pair: props.pair
    }
  }, $[0] = editor, $[1] = props.decorator, $[2] = props.pair, $[3] = t0) : t0 = $[3], useActorRef(decoratorPairMachine, t0), null;
}
const decorateListener = ({
  sendBack,
  input
}) => input.editor.registerBehavior({
  behavior: createCharacterPairDecoratorBehavior({
    decorator: input.decorator,
    pair: input.pair,
    onDecorate: (offset) => {
      sendBack({
        type: "decorator.add",
        blockOffset: offset
      });
    }
  })
}), selectionListenerCallback = ({
  sendBack,
  input
}) => input.editor.registerBehavior({
  behavior: defineBehavior({
    on: "select",
    guard: ({
      snapshot,
      event
    }) => {
      if (!event.at)
        return {
          blockOffsets: void 0
        };
      const anchor = utils.spanSelectionPointToBlockOffset({
        context: snapshot.context,
        selectionPoint: event.at.anchor
      }), focus = utils.spanSelectionPointToBlockOffset({
        context: snapshot.context,
        selectionPoint: event.at.focus
      });
      return !anchor || !focus ? {
        blockOffsets: void 0
      } : {
        blockOffsets: {
          anchor,
          focus
        }
      };
    },
    actions: [({
      event
    }, {
      blockOffsets
    }) => [{
      type: "effect",
      effect: () => {
        sendBack({
          type: "selection",
          blockOffsets
        });
      }
    }, forward(event)]]
  })
}), deleteBackwardListenerCallback = ({
  sendBack,
  input
}) => input.editor.registerBehavior({
  behavior: defineBehavior({
    on: "delete.backward",
    actions: [() => [raise({
      type: "history.undo"
    }), effect(() => {
      sendBack({
        type: "delete.backward"
      });
    })]]
  })
}), decoratorPairMachine = setup({
  types: {
    context: {},
    input: {},
    events: {}
  },
  actors: {
    "decorate listener": fromCallback(decorateListener),
    "delete.backward listener": fromCallback(deleteBackwardListenerCallback),
    "selection listener": fromCallback(selectionListenerCallback)
  }
}).createMachine({
  id: "decorator pair",
  context: ({
    input
  }) => ({
    decorator: input.decorator,
    editor: input.editor,
    pair: input.pair
  }),
  initial: "idle",
  states: {
    idle: {
      invoke: [{
        src: "decorate listener",
        input: ({
          context
        }) => ({
          decorator: context.decorator,
          editor: context.editor,
          pair: context.pair
        })
      }],
      on: {
        "decorator.add": {
          target: "decorator added",
          actions: assign({
            offsetAfterDecorator: ({
              event
            }) => event.blockOffset
          })
        }
      }
    },
    "decorator added": {
      exit: [assign({
        offsetAfterDecorator: void 0
      })],
      invoke: [{
        src: "selection listener",
        input: ({
          context
        }) => ({
          editor: context.editor
        })
      }, {
        src: "delete.backward listener",
        input: ({
          context
        }) => ({
          editor: context.editor
        })
      }],
      on: {
        selection: {
          target: "idle",
          guard: ({
            context,
            event
          }) => !isDeepEqual({
            anchor: context.offsetAfterDecorator,
            focus: context.offsetAfterDecorator
          }, event.blockOffsets)
        },
        "delete.backward": {
          target: "idle"
        }
      }
    }
  }
});
export {
  CharacterPairDecoratorPlugin
};
//# sourceMappingURL=index.js.map
