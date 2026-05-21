import { c } from "react/compiler-runtime";
import React, { useEffect } from "react";
import { useEditor } from "../_chunks-es/use-editor.js";
function BehaviorPlugin(props) {
  const $ = c(4), editor = useEditor();
  let t0, t1;
  return $[0] !== editor || $[1] !== props.behaviors ? (t0 = () => {
    const unregisterBehaviors = props.behaviors.map((behavior) => editor.registerBehavior({
      behavior
    }));
    return () => {
      unregisterBehaviors.forEach(_temp);
    };
  }, t1 = [editor, props.behaviors], $[0] = editor, $[1] = props.behaviors, $[2] = t0, $[3] = t1) : (t0 = $[2], t1 = $[3]), useEffect(t0, t1), null;
}
function _temp(unregister) {
  unregister();
}
const EditorRefPlugin = React.forwardRef((_, ref) => {
  const $ = c(2), editor = useEditor(), portableTextEditorRef = React.useRef(editor);
  let t0, t1;
  return $[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (t0 = () => portableTextEditorRef.current, t1 = [], $[0] = t0, $[1] = t1) : (t0 = $[0], t1 = $[1]), React.useImperativeHandle(ref, t0, t1), null;
});
EditorRefPlugin.displayName = "EditorRefPlugin";
function EventListenerPlugin(props) {
  const $ = c(4), editor = useEditor();
  let t0, t1;
  return $[0] !== editor || $[1] !== props.on ? (t0 = () => {
    const subscription = editor.on("*", props.on);
    return () => {
      subscription.unsubscribe();
    };
  }, t1 = [editor, props.on], $[0] = editor, $[1] = props.on, $[2] = t0, $[3] = t1) : (t0 = $[2], t1 = $[3]), useEffect(t0, t1), null;
}
export {
  BehaviorPlugin,
  EditorRefPlugin,
  EventListenerPlugin
};
//# sourceMappingURL=index.js.map
