import { c } from "react/compiler-runtime";
import { memo, useRef, useEffect } from "react";
import { Subject, switchMap, combineLatest, NEVER, share, skipWhile, merge, takeUntil, filter, map, debounceTime } from "rxjs";
import { useDocumentPreviewStore, useSchema, getDraftId, getPublishedId } from "sanity";
const PostMessagePreviews = (props) => {
  const $ = c(16), {
    comlink,
    refs,
    perspective
  } = props, documentPreviewStore = useDocumentPreviewStore(), schema = useSchema();
  let t0;
  $[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (t0 = new Subject(), $[0] = t0) : t0 = $[0];
  const refsSubject = t0;
  let t1;
  $[1] !== documentPreviewStore || $[2] !== perspective || $[3] !== schema ? (t1 = refsSubject.asObservable().pipe(switchMap((refs_0) => combineLatest(refs_0.map((ref) => {
    const draftRef = {
      ...ref,
      _id: getDraftId(ref._id)
    }, draft$ = perspective === "published" ? NEVER : documentPreviewStore.observeForPreview(draftRef, schema.get(draftRef._type)).pipe(share(), skipWhile(_temp)), publishedRef = {
      ...ref,
      _id: getPublishedId(ref._id)
    }, published$ = documentPreviewStore.observeForPreview(publishedRef, schema.get(publishedRef._type));
    return merge(published$.pipe(takeUntil(draft$)), draft$).pipe(filter(_temp2), map(_temp3));
  }))), debounceTime(0)), $[1] = documentPreviewStore, $[2] = perspective, $[3] = schema, $[4] = t1) : t1 = $[4];
  const previews$ = t1;
  let t2;
  $[5] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (t2 = [], $[5] = t2) : t2 = $[5];
  const lastSnapshots = useRef(t2);
  let t3, t4;
  $[6] !== comlink || $[7] !== previews$ ? (t3 = () => {
    const sub = previews$.subscribe((snapshots) => {
      comlink.post("presentation/preview-snapshots", {
        snapshots
      }), lastSnapshots.current = snapshots;
    });
    return () => {
      sub.unsubscribe();
    };
  }, t4 = [comlink, previews$], $[6] = comlink, $[7] = previews$, $[8] = t3, $[9] = t4) : (t3 = $[8], t4 = $[9]), useEffect(t3, t4);
  let t5, t6;
  $[10] !== comlink ? (t5 = () => comlink.on("visual-editing/preview-snapshots", () => ({
    snapshots: lastSnapshots.current
  })), t6 = [comlink], $[10] = comlink, $[11] = t5, $[12] = t6) : (t5 = $[11], t6 = $[12]), useEffect(t5, t6);
  let t7, t8;
  return $[13] !== refs ? (t7 = () => {
    refsSubject.next(refs);
  }, t8 = [refs, refsSubject], $[13] = refs, $[14] = t7, $[15] = t8) : (t7 = $[14], t8 = $[15]), useEffect(t7, t8), null;
};
var PostMessagePreviewSnapshots = memo(PostMessagePreviews);
function _temp(p) {
  return p.snapshot === null;
}
function _temp2(p_0) {
  return !!p_0.snapshot;
}
function _temp3(p_1) {
  const snapshot = p_1.snapshot;
  return {
    _id: getPublishedId(snapshot._id),
    title: snapshot.title,
    subtitle: snapshot.subtitle,
    description: snapshot.description,
    imageUrl: snapshot.imageUrl
  };
}
export {
  PostMessagePreviewSnapshots as default
};
//# sourceMappingURL=PostMessagePreviewSnapshots.js.map
