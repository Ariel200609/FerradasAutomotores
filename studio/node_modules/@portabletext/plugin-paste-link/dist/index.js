import { c } from "react/compiler-runtime";
import { useEditor } from "@portabletext/editor";
import { defineBehavior, raise } from "@portabletext/editor/behaviors";
import * as selectors from "@portabletext/editor/selectors";
import { useEffect } from "react";
function looksLikeUrl(text) {
  try {
    const url = new URL(text);
    return sensibleProtocols.includes(url.protocol);
  } catch {
    return !1;
  }
}
const sensibleProtocols = ["http:", "https:", "mailto:", "tel:"], defaultLinkMatcher = ({
  context,
  value
}) => {
  const schemaType = context.schema.annotations.find((annotation) => annotation.name === "link"), hrefField = schemaType?.fields.find((field) => field.name === "href" && field.type === "string");
  if (!(!schemaType || !hrefField))
    return {
      _type: schemaType.name,
      [hrefField.name]: value.href
    };
};
function PasteLinkPlugin(t0) {
  const $ = c(5), {
    guard,
    link: t1
  } = t0, link = t1 === void 0 ? defaultLinkMatcher : t1, editor = useEditor();
  let t2, t3;
  return $[0] !== editor || $[1] !== guard || $[2] !== link ? (t2 = () => {
    const unregisterBehaviors = createPasteLinkBehaviors({
      guard,
      link
    }).map((behavior) => editor.registerBehavior({
      behavior
    }));
    return () => {
      for (const unregisterBehavior of unregisterBehaviors)
        unregisterBehavior();
    };
  }, t3 = [editor, guard, link], $[0] = editor, $[1] = guard, $[2] = link, $[3] = t2, $[4] = t3) : (t2 = $[3], t3 = $[4]), useEffect(t2, t3), null;
}
function createPasteLinkBehaviors(config) {
  const pasteLinkOnSelection = defineBehavior({
    on: "clipboard.paste",
    guard: (guardParams) => {
      if (config.guard && config.guard(guardParams) === !1)
        return !1;
      const {
        snapshot,
        event
      } = guardParams;
      if (selectors.isSelectionCollapsed(snapshot))
        return !1;
      const text = event.originEvent.dataTransfer.getData("text/plain"), href = looksLikeUrl(text) ? text : void 0;
      if (!href)
        return !1;
      const result = config.link({
        context: {
          schema: snapshot.context.schema,
          keyGenerator: snapshot.context.keyGenerator
        },
        value: {
          href
        }
      });
      if (!result)
        return !1;
      const {
        _type,
        _key,
        ...value
      } = result;
      return {
        annotation: {
          name: _type,
          _key,
          value
        }
      };
    },
    actions: [(_, {
      annotation
    }) => [raise({
      type: "annotation.add",
      annotation
    })]]
  }), pasteLinkAtCaret = defineBehavior({
    on: "clipboard.paste",
    guard: (guardParams) => {
      if (config.guard && config.guard(guardParams) === !1)
        return !1;
      const {
        snapshot,
        event
      } = guardParams, focusTextBlock = selectors.getFocusTextBlock(snapshot), selectionCollapsed = selectors.isSelectionCollapsed(snapshot);
      if (!focusTextBlock || !selectionCollapsed)
        return !1;
      const text = event.originEvent.dataTransfer.getData("text/plain"), href = looksLikeUrl(text) ? text : void 0;
      if (!href)
        return !1;
      const result = config.link({
        context: {
          schema: snapshot.context.schema,
          keyGenerator: snapshot.context.keyGenerator
        },
        value: {
          href
        }
      });
      if (!result)
        return !1;
      const {
        _type,
        _key,
        ...value
      } = result, markState = selectors.getMarkState(snapshot), decoratorNames = snapshot.context.schema.decorators.map((decorator) => decorator.name), activeDecorators = (markState?.marks ?? []).filter((mark) => decoratorNames.includes(mark)), markDefKey = _key ?? snapshot.context.keyGenerator(), markDef = {
        _type,
        _key: markDefKey,
        ...value
      };
      return {
        focusTextBlock,
        markDef,
        markDefKey,
        href,
        activeDecorators
      };
    },
    actions: [({
      snapshot
    }, {
      focusTextBlock,
      markDef,
      markDefKey,
      href,
      activeDecorators
    }) => [raise({
      type: "block.set",
      at: focusTextBlock.path,
      props: {
        markDefs: [...focusTextBlock.node.markDefs ?? [], markDef]
      }
    }), raise({
      type: "insert.child",
      child: {
        _type: snapshot.context.schema.span.name,
        text: href,
        marks: [...activeDecorators, markDefKey]
      }
    })]]
  });
  return [pasteLinkOnSelection, pasteLinkAtCaret];
}
export {
  PasteLinkPlugin
};
//# sourceMappingURL=index.js.map
