"use strict";
var rxjs = require("rxjs"), encode = require("./encode.cjs"), nanoid = require("nanoid"), utils = require("./utils.cjs"), mendoza = require("mendoza"), uuid = require("@sanity/uuid"), diffMatchPatch = require("@sanity/diff-match-patch"), getAtPath = require("./getAtPath.cjs"), stringify = require("./stringify.cjs"), groupBy = require("lodash/groupBy.js");
function _interopDefaultCompat(e) {
  return e && typeof e == "object" && "default" in e ? e : { default: e };
}
var groupBy__default = /* @__PURE__ */ _interopDefaultCompat(groupBy);
function getMutationDocumentId(mutation) {
  if (mutation.type === "patch")
    return mutation.id;
  if (mutation.type === "create")
    return mutation.document._id;
  if (mutation.type === "delete")
    return mutation.id;
  if (mutation.type === "createIfNotExists" || mutation.type === "createOrReplace")
    return mutation.document._id;
  throw new Error("Invalid mutation type");
}
function applyAll(current, mutation) {
  return mutation.reduce((doc, m) => {
    const res = applyDocumentMutation(doc, m);
    if (res.status === "error")
      throw new Error(res.message);
    return res.status === "noop" ? doc : res.after;
  }, current);
}
function applyDocumentMutation(document, mutation) {
  if (mutation.type === "create")
    return create(document, mutation);
  if (mutation.type === "createIfNotExists")
    return createIfNotExists(document, mutation);
  if (mutation.type === "delete")
    return del(document, mutation);
  if (mutation.type === "createOrReplace")
    return createOrReplace(document, mutation);
  if (mutation.type === "patch")
    return patch(document, mutation);
  throw new Error(`Invalid mutation type: ${mutation.type}`);
}
function create(document, mutation) {
  if (document)
    return { status: "error", message: "Document already exist" };
  const result = utils.assignId(mutation.document, nanoid.nanoid);
  return { status: "created", id: result._id, after: result };
}
function createIfNotExists(document, mutation) {
  return utils.hasId(mutation.document) ? document ? { status: "noop" } : { status: "created", id: mutation.document._id, after: mutation.document } : {
    status: "error",
    message: "Cannot createIfNotExists on document without _id"
  };
}
function createOrReplace(document, mutation) {
  return utils.hasId(mutation.document) ? document ? {
    status: "updated",
    id: mutation.document._id,
    before: document,
    after: mutation.document
  } : { status: "created", id: mutation.document._id, after: mutation.document } : {
    status: "error",
    message: "Cannot createIfNotExists on document without _id"
  };
}
function del(document, mutation) {
  return document ? mutation.id !== document._id ? { status: "error", message: "Delete mutation targeted wrong document" } : {
    status: "deleted",
    id: mutation.id,
    before: document,
    after: void 0
  } : { status: "noop" };
}
function patch(document, mutation) {
  if (!document)
    return {
      status: "error",
      message: "Cannot apply patch on nonexistent document"
    };
  const next = utils.applyPatchMutation(mutation, document);
  return document === next ? { status: "noop" } : { status: "updated", id: mutation.id, before: document, after: next };
}
function applyMutations(mutations, documentMap, transactionId) {
  const updatedDocs = /* @__PURE__ */ Object.create(null);
  for (const mutation of mutations) {
    const documentId = getMutationDocumentId(mutation);
    if (!documentId)
      throw new Error("Unable to get document id from mutation");
    const before = updatedDocs[documentId]?.after || documentMap.get(documentId), res = applyDocumentMutation(before, mutation);
    if (res.status === "error")
      throw new Error(res.message);
    let entry = updatedDocs[documentId];
    entry || (entry = { before, after: before, mutations: [] }, updatedDocs[documentId] = entry);
    const after = transactionId ? { ...res.status === "noop" ? before : res.after, _rev: transactionId } : res.status === "noop" ? before : res.after;
    documentMap.set(documentId, after), entry.after = after, entry.mutations.push(mutation);
  }
  return Object.entries(updatedDocs).map(
    ([id, { before, after, mutations: muts }]) => ({
      id,
      status: after ? before ? "updated" : "created" : "deleted",
      mutations: muts,
      before,
      after
    })
  );
}
function commit(results, documentMap) {
  results.forEach((result) => {
    (result.status === "created" || result.status === "updated") && documentMap.set(result.id, result.after), result.status === "deleted" && documentMap.delete(result.id);
  });
}
function omitRev(document) {
  if (document === void 0)
    return;
  const { _rev, ...doc } = document;
  return doc;
}
function applyMendozaPatch(document, patch2, patchBaseRev) {
  if (patchBaseRev !== document?._rev)
    throw new Error(
      "Invalid document revision. The provided patch is calculated from a different revision than the current document"
    );
  const next = mendoza.applyPatch(omitRev(document), patch2);
  return next === null ? void 0 : next;
}
function applyMutationEventEffects(document, event) {
  if (!event.effects)
    throw new Error(
      "Mutation event is missing effects. Is the listener set up with effectFormat=mendoza?"
    );
  const next = applyMendozaPatch(
    document,
    event.effects.apply,
    event.previousRev
  );
  return next ? { ...next, _rev: event.resultRev } : void 0;
}
function createDocumentMap() {
  const documents = /* @__PURE__ */ new Map();
  return {
    set: (id, doc) => void documents.set(id, doc),
    get: (id) => documents.get(id),
    delete: (id) => documents.delete(id)
  };
}
function createReplayMemoizer(expiry) {
  const memo = /* @__PURE__ */ Object.create(null);
  return function(key, observable) {
    return key in memo || (memo[key] = observable.pipe(
      rxjs.finalize(() => {
        delete memo[key];
      }),
      rxjs.share({
        connector: () => new rxjs.ReplaySubject(1),
        resetOnRefCountZero: () => rxjs.timer(expiry)
      })
    )), memo[key];
  };
}
function createTransactionId() {
  return uuid.uuid();
}
function filterMutationGroupsById(mutationGroups, id) {
  return mutationGroups.flatMap(
    (mutationGroup) => mutationGroup.mutations.flatMap(
      (mut) => getMutationDocumentId(mut) === id ? [mut] : []
    )
  );
}
function hasProperty(value, property) {
  const val = value[property];
  return typeof val < "u" && val !== null;
}
function takeUntilRight(arr, predicate, opts) {
  const result = [];
  for (const item of arr.slice().reverse()) {
    if (predicate(item))
      return result;
    result.push(item);
  }
  return result.reverse();
}
function isEqualPath(p1, p2) {
  return stringify.stringify(p1) === stringify.stringify(p2);
}
function supersedes(later, earlier) {
  return (earlier.type === "set" || earlier.type === "unset") && (later.type === "set" || later.type === "unset");
}
function squashNodePatches(patches) {
  return compactSetIfMissingPatches(
    compactSetPatches(compactUnsetPatches(patches))
  );
}
function compactUnsetPatches(patches) {
  return patches.reduce(
    (earlierPatches, laterPatch) => {
      if (laterPatch.op.type !== "unset")
        return earlierPatches.push(laterPatch), earlierPatches;
      const unaffected = earlierPatches.filter(
        (earlierPatch) => !stringify.startsWith(laterPatch.path, earlierPatch.path)
      );
      return unaffected.push(laterPatch), unaffected;
    },
    []
  );
}
function compactSetPatches(patches) {
  return patches.reduceRight(
    (laterPatches, earlierPatch) => (laterPatches.find(
      (later) => supersedes(later.op, earlierPatch.op) && isEqualPath(later.path, earlierPatch.path)
    ) || laterPatches.unshift(earlierPatch), laterPatches),
    []
  );
}
function compactSetIfMissingPatches(patches) {
  return patches.reduce(
    (previousPatches, laterPatch) => laterPatch.op.type !== "setIfMissing" ? (previousPatches.push(laterPatch), previousPatches) : (takeUntilRight(
      previousPatches,
      (patch2) => patch2.op.type === "unset"
    ).find(
      (precedingPatch) => precedingPatch.op.type === "setIfMissing" && isEqualPath(precedingPatch.path, laterPatch.path)
    ) || previousPatches.push(laterPatch), previousPatches),
    []
  );
}
function compactDMPSetPatches(base, patches) {
  let edge = base;
  return patches.reduce(
    (earlierPatches, laterPatch) => {
      const before = edge;
      if (edge = utils.applyNodePatch(laterPatch, edge), laterPatch.op.type === "set" && typeof laterPatch.op.value == "string") {
        const current = getAtPath.getAtPath(laterPatch.path, before);
        if (typeof current == "string") {
          const replaced = {
            ...laterPatch,
            op: {
              type: "diffMatchPatch",
              value: diffMatchPatch.stringifyPatches(
                diffMatchPatch.makePatches(current, laterPatch.op.value)
              )
            }
          };
          return earlierPatches.flatMap((ep) => isEqualPath(ep.path, laterPatch.path) && ep.op.type === "diffMatchPatch" ? [] : ep).concat(replaced);
        }
      }
      return earlierPatches.push(laterPatch), earlierPatches;
    },
    []
  );
}
function squashDMPStrings(base, mutationGroups) {
  return mutationGroups.map((mutationGroup) => ({
    ...mutationGroup,
    mutations: dmpIfyMutations(base, mutationGroup.mutations)
  }));
}
function dmpIfyMutations(store, mutations) {
  return mutations.map((mutation, i) => {
    if (mutation.type !== "patch")
      return mutation;
    const base = store.get(mutation.id);
    return base ? dmpifyPatchMutation(base, mutation) : mutation;
  });
}
function dmpifyPatchMutation(base, mutation) {
  return {
    ...mutation,
    patches: compactDMPSetPatches(base, mutation.patches)
  };
}
function mergeMutationGroups(mutationGroups) {
  return chunkWhile(mutationGroups, (group) => !group.transaction).flatMap(
    (chunk) => ({
      ...chunk[0],
      mutations: chunk.flatMap((c) => c.mutations)
    })
  );
}
function chunkWhile(arr, predicate) {
  const res = [];
  let currentChunk = [];
  return arr.forEach((item) => {
    predicate(item) ? currentChunk.push(item) : (currentChunk.length > 0 && res.push(currentChunk), currentChunk = [], res.push([item]));
  }), currentChunk.length > 0 && res.push(currentChunk), res;
}
function squashMutationGroups(staged) {
  return mergeMutationGroups(staged).map((transaction) => ({
    ...transaction,
    mutations: squashMutations(transaction.mutations)
  })).map((transaction) => ({
    ...transaction,
    mutations: transaction.mutations.map((mutation) => mutation.type !== "patch" ? mutation : {
      ...mutation,
      patches: squashNodePatches(mutation.patches)
    })
  }));
}
function squashMutations(mutations) {
  const byDocument = groupBy__default.default(mutations, getMutationDocumentId);
  return Object.values(byDocument).flatMap((documentMutations) => squashCreateIfNotExists(squashDelete(documentMutations)).flat().reduce((acc, docMutation) => {
    const prev = acc[acc.length - 1];
    return (!prev || prev.type === "patch") && docMutation.type === "patch" ? acc.slice(0, -1).concat({
      ...docMutation,
      patches: (prev?.patches || []).concat(docMutation.patches)
    }) : acc.concat(docMutation);
  }, []));
}
function squashCreateIfNotExists(mutations) {
  return mutations.length === 0 ? mutations : mutations.reduce((previousMuts, laterMut) => laterMut.type !== "createIfNotExists" ? (previousMuts.push(laterMut), previousMuts) : (takeUntilRight(previousMuts, (m) => m.type === "delete").find(
    (precedingPatch) => precedingPatch.type === "createIfNotExists"
  ) || previousMuts.push(laterMut), previousMuts), []);
}
function squashDelete(mutations) {
  return mutations.length === 0 ? mutations : mutations.reduce((previousMuts, laterMut) => laterMut.type === "delete" ? [laterMut] : (previousMuts.push(laterMut), previousMuts), []);
}
function rebase(documentId, oldBase, newBase, localMutations) {
  let edge = oldBase;
  const dmpified = localMutations.map((transaction) => {
    const mutations = transaction.mutations.flatMap((mut) => {
      if (getMutationDocumentId(mut) !== documentId)
        return [];
      const before = edge;
      return edge = applyAll(edge, [mut]), !before || mut.type !== "patch" ? mut : {
        type: "dmpified",
        mutation: {
          ...mut,
          // Todo: make compactDMPSetPatches return pairs of patches that was dmpified with their
          //  original as dmpPatches and original is not 1:1 (e..g some of the original may not be dmpified)
          dmpPatches: compactDMPSetPatches(before, mut.patches),
          original: mut.patches
        }
      };
    });
    return { ...transaction, mutations };
  });
  let newBaseWithDMPForOldBaseApplied = newBase;
  return dmpified.map((transaction) => {
    const applied = [];
    return transaction.mutations.forEach((mut) => {
      if (mut.type === "dmpified")
        try {
          newBaseWithDMPForOldBaseApplied = utils.applyPatches(
            mut.mutation.dmpPatches,
            newBaseWithDMPForOldBaseApplied
          ), applied.push(mut);
        } catch {
          console.warn("Failed to apply dmp patch, falling back to original");
          try {
            newBaseWithDMPForOldBaseApplied = utils.applyPatches(
              mut.mutation.original,
              newBaseWithDMPForOldBaseApplied
            ), applied.push(mut);
          } catch (second) {
            throw new Error(
              `Failed to apply patch for document "${documentId}": ${second.message}`
            );
          }
        }
      else
        newBaseWithDMPForOldBaseApplied = applyAll(
          newBaseWithDMPForOldBaseApplied,
          [mut]
        );
    });
  }), [localMutations.map((transaction) => ({
    ...transaction,
    mutations: transaction.mutations.map((mut) => mut.type !== "patch" || getMutationDocumentId(mut) !== documentId ? mut : {
      ...mut,
      patches: mut.patches.map((patch2) => patch2.op.type !== "set" ? patch2 : {
        ...patch2,
        op: {
          ...patch2.op,
          value: getAtPath.getAtPath(patch2.path, newBaseWithDMPForOldBaseApplied)
        }
      })
    })
  })), newBaseWithDMPForOldBaseApplied];
}
let didEmitMutationsAccessWarning = !1;
function warnNoMutationsReceived() {
  didEmitMutationsAccessWarning || (console.warn(
    new Error(
      "No mutation received from backend. The listener is likely set up with `excludeMutations: true`. If your app need to know about mutations, make sure the listener is set up to include mutations"
    )
  ), didEmitMutationsAccessWarning = !0);
}
const EMPTY_ARRAY = [];
function createOptimisticStore(backend) {
  const local = createDocumentMap(), remote = createDocumentMap(), memoize = createReplayMemoizer(1e3);
  let stagedChanges = [];
  const remoteEvents$ = new rxjs.Subject(), localMutations$ = new rxjs.Subject(), stage$ = new rxjs.Subject();
  function setStaged(nextPending) {
    stagedChanges = nextPending, stage$.next();
  }
  function getLocalEvents(id) {
    return localMutations$.pipe(rxjs.filter((event) => event.id === id));
  }
  function getRemoteEvents(id) {
    return backend.listen(id).pipe(
      rxjs.filter(
        (event) => event.type !== "reconnect"
      ),
      rxjs.mergeMap((event) => {
        const oldLocal = local.get(id), oldRemote = remote.get(id);
        if (event.type === "sync") {
          const newRemote = event.document, [rebasedStage, newLocal] = rebase(
            id,
            oldRemote,
            newRemote,
            stagedChanges
          );
          return rxjs.of({
            type: "sync",
            id,
            before: { remote: oldRemote, local: oldLocal },
            after: { remote: newRemote, local: newLocal },
            rebasedStage
          });
        } else if (event.type === "mutation") {
          if (event.transactionId === oldRemote?._rev)
            return rxjs.EMPTY;
          let newRemote;
          if (hasProperty(event, "effects"))
            newRemote = applyMutationEventEffects(oldRemote, event);
          else if (hasProperty(event, "mutations"))
            newRemote = applyAll(oldRemote, encode.decodeAll(event.mutations));
          else
            throw new Error(
              "Neither effects or mutations found on listener event"
            );
          const [rebasedStage, newLocal] = rebase(
            id,
            oldRemote,
            newRemote,
            stagedChanges
          );
          newLocal && (newLocal._rev = event.transactionId);
          const emittedEvent = {
            type: "mutation",
            id,
            rebasedStage,
            before: { remote: oldRemote, local: oldLocal },
            after: { remote: newRemote, local: newLocal },
            effects: event.effects,
            previousRev: event.previousRev,
            resultRev: event.resultRev,
            // overwritten below
            mutations: EMPTY_ARRAY
          };
          return event.mutations ? emittedEvent.mutations = encode.decodeAll(
            event.mutations
          ) : Object.defineProperty(
            emittedEvent,
            "mutations",
            warnNoMutationsReceived
          ), rxjs.of(emittedEvent);
        } else
          throw new Error(`Unknown event type: ${event.type}`);
      }),
      rxjs.tap((event) => {
        local.set(event.id, event.after.local), remote.set(event.id, event.after.remote), setStaged(event.rebasedStage);
      }),
      rxjs.tap({
        next: (event) => remoteEvents$.next(event),
        error: (err) => {
        }
      })
    );
  }
  function listenEvents(id) {
    return rxjs.defer(
      () => memoize(id, rxjs.merge(getLocalEvents(id), getRemoteEvents(id)))
    );
  }
  return {
    meta: {
      events: rxjs.merge(localMutations$, remoteEvents$),
      stage: stage$.pipe(
        rxjs.map(
          () => (
            // note: this should not be tampered with by consumers. We might want to do a deep-freeze during dev to avoid accidental mutations
            stagedChanges
          )
        )
      ),
      conflicts: rxjs.EMPTY
      // does nothing for now
    },
    mutate: (mutations) => {
      stagedChanges.push({ transaction: !1, mutations });
      const results = applyMutations(mutations, local);
      return commit(results, local), results.forEach((result) => {
        localMutations$.next({
          type: "optimistic",
          before: result.before,
          after: result.after,
          mutations: result.mutations,
          id: result.id,
          stagedChanges: filterMutationGroupsById(stagedChanges, result.id)
        });
      }), results;
    },
    transaction: (mutationsOrTransaction) => {
      const transaction = Array.isArray(
        mutationsOrTransaction
      ) ? { mutations: mutationsOrTransaction, transaction: !0 } : { ...mutationsOrTransaction, transaction: !0 };
      stagedChanges.push(transaction);
      const results = applyMutations(transaction.mutations, local);
      return commit(results, local), results.forEach((result) => {
        localMutations$.next({
          type: "optimistic",
          mutations: result.mutations,
          id: result.id,
          before: result.before,
          after: result.after,
          stagedChanges: filterMutationGroupsById(stagedChanges, result.id)
        });
      }), results;
    },
    listenEvents,
    listen: (id) => listenEvents(id).pipe(
      rxjs.map(
        (event) => event.type === "optimistic" ? event.after : event.after.local
      )
    ),
    optimize: () => {
      setStaged(squashMutationGroups(stagedChanges));
    },
    submit: () => {
      const pending = stagedChanges;
      return setStaged([]), rxjs.lastValueFrom(
        rxjs.from(
          toTransactions(
            // Squashing DMP strings is the last thing we do before submitting
            squashDMPStrings(remote, squashMutationGroups(pending))
          )
        ).pipe(
          rxjs.concatMap((mut) => backend.submit(mut)),
          rxjs.toArray()
        )
      );
    }
  };
}
function toTransactions(groups) {
  return groups.map((group) => group.transaction && group.id !== void 0 ? { id: group.id, mutations: group.mutations } : { id: createTransactionId(), mutations: group.mutations });
}
exports.applyAll = applyAll;
exports.applyMutationEventEffects = applyMutationEventEffects;
exports.applyMutations = applyMutations;
exports.commit = commit;
exports.createDocumentMap = createDocumentMap;
exports.createOptimisticStore = createOptimisticStore;
exports.createTransactionId = createTransactionId;
exports.hasProperty = hasProperty;
exports.rebase = rebase;
exports.squashDMPStrings = squashDMPStrings;
exports.squashMutationGroups = squashMutationGroups;
exports.toTransactions = toTransactions;
//# sourceMappingURL=createOptimisticStore.cjs.map
