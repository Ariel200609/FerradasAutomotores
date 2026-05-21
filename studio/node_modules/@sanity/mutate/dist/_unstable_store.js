import { combineLatest, finalize, share, ReplaySubject, timer, switchMap, concat, of, throwError, concatMap, EMPTY, catchError, map, BehaviorSubject, Subject, filter, bufferWhen, scheduled, mergeMap as mergeMap$1, takeUntil, Observable, defer, merge, takeWhile, asyncScheduler, tap, NEVER, from } from "rxjs";
import lodashPartition from "lodash/partition.js";
import { scan, mergeMap, map as map$1, filter as filter$1 } from "rxjs/operators";
import keyBy from "lodash/keyBy.js";
import { decodeAll, encodeAll, encodeTransaction } from "./_chunks-es/encode.js";
import { hasProperty, applyMutationEventEffects, applyAll, applyMutations, createDocumentMap, createTransactionId } from "./_chunks-es/createOptimisticStore.js";
import { createOptimisticStore, toTransactions } from "./_chunks-es/createOptimisticStore.js";
import sortedIndex from "lodash/sortedIndex.js";
function createReadOnlyStore(listenDocumentUpdates, options = {}) {
  const cache = /* @__PURE__ */ new Map(), { shutdownDelay } = options;
  function listenDocument(id) {
    if (cache.has(id))
      return cache.get(id);
    const cached = listenDocumentUpdates(id).pipe(
      finalize(() => cache.delete(id)),
      share({
        resetOnRefCountZero: typeof shutdownDelay == "number" ? () => timer(shutdownDelay) : !0,
        connector: () => new ReplaySubject(1)
      })
    );
    return cache.set(id, cached), cached;
  }
  return {
    listenDocument,
    listenDocuments(ids) {
      return combineLatest(
        ids.map((id) => listenDocument(id))
      );
    }
  };
}
class FetchError extends Error {
  cause;
  constructor(message, extra) {
    super(message), this.cause = extra?.cause, this.name = "FetchError";
  }
}
class PermissionDeniedError extends Error {
  cause;
  constructor(message, extra) {
    super(message), this.cause = extra?.cause, this.name = "PermissionDeniedError";
  }
}
class ChannelError extends Error {
  constructor(message) {
    super(message), this.name = "ChannelError";
  }
}
class DisconnectError extends Error {
  constructor(message) {
    super(message), this.name = "DisconnectError";
  }
}
class OutOfSyncError extends Error {
  /**
   * Attach state to the error for debugging/reporting
   */
  state;
  constructor(message, state) {
    super(message), this.name = "OutOfSyncError", this.state = state;
  }
}
class DeadlineExceededError extends OutOfSyncError {
  constructor(message, state) {
    super(message, state), this.name = "DeadlineExceededError";
  }
}
class MaxBufferExceededError extends OutOfSyncError {
  constructor(message, state) {
    super(message, state), this.name = "MaxBufferExceededError";
  }
}
function isClientError(e) {
  return typeof e != "object" || !e ? !1 : "statusCode" in e && "response" in e;
}
function discardChainTo(chain, revision) {
  const revisionIndex = chain.findIndex((event) => event.resultRev === revision);
  return split(chain, revisionIndex + 1);
}
function split(array, index) {
  return index < 0 ? [[], array] : [array.slice(0, index), array.slice(index)];
}
function toOrderedChains(events) {
  const parents = {};
  return events.forEach((event) => {
    parents[event.resultRev || "undefined"] = events.find(
      (other) => other.resultRev === event.previousRev
    );
  }), Object.entries(parents).filter(([, parent]) => !parent).map((orphan) => {
    const [headRev] = orphan;
    let current = events.find((event) => event.resultRev === headRev);
    const sortedList = [];
    for (; current; )
      sortedList.push(current), current = events.find((event) => event.previousRev === current?.resultRev);
    return sortedList;
  });
}
function partition(array, predicate) {
  return lodashPartition(array, predicate);
}
const DEFAULT_MAX_BUFFER_SIZE = 20, DEFAULT_DEADLINE_MS = 3e4, EMPTY_ARRAY = [];
function sequentializeListenerEvents(options) {
  const {
    resolveChainDeadline = DEFAULT_DEADLINE_MS,
    maxBufferSize = DEFAULT_MAX_BUFFER_SIZE,
    onDiscard,
    onBrokenChain
  } = options || {};
  return (input$) => input$.pipe(
    scan(
      (state, event) => {
        if (event.type === "mutation" && !state.base)
          throw new Error(
            "Invalid state. Cannot create a sequence without a base"
          );
        if (event.type === "sync")
          return {
            base: { revision: event.document?._rev },
            buffer: EMPTY_ARRAY,
            emitEvents: [event]
          };
        if (event.type === "mutation") {
          if (!event.resultRev && !event.previousRev)
            throw new Error(
              "Invalid mutation event: Events must have either resultRev or previousRev"
            );
          const orderedChains = toOrderedChains(
            state.buffer.concat(event)
          ).map((chain) => {
            const [discarded, rest] = discardChainTo(
              chain,
              state.base.revision
            );
            return onDiscard && discarded.length > 0 && onDiscard(discarded), rest;
          }), [applicableChains, _nextBuffer] = partition(
            orderedChains,
            (chain) => state.base.revision === chain[0]?.previousRev
          ), nextBuffer = _nextBuffer.flat();
          if (applicableChains.length > 1)
            throw new Error("Expected at most one applicable chain");
          if (applicableChains.length > 0 && applicableChains[0].length > 0) {
            const lastMutation = applicableChains[0].at(-1);
            return {
              base: { revision: (
                // special case: if the mutation deletes the document it technically has  no revision, despite
                // resultRev pointing at a transaction id.
                lastMutation.transition === "disappear" ? void 0 : lastMutation?.resultRev
              ) },
              emitEvents: applicableChains[0],
              buffer: nextBuffer
            };
          }
          if (nextBuffer.length >= maxBufferSize)
            throw new MaxBufferExceededError(
              `Too many unchainable mutation events: ${state.buffer.length}`,
              state
            );
          return {
            ...state,
            buffer: nextBuffer,
            emitEvents: EMPTY_ARRAY
          };
        }
        return { ...state, emitEvents: [event] };
      },
      {
        emitEvents: EMPTY_ARRAY,
        base: void 0,
        buffer: EMPTY_ARRAY
      }
    ),
    switchMap((state) => state.buffer.length > 0 ? (onBrokenChain?.(state.buffer), concat(
      of(state),
      timer(resolveChainDeadline).pipe(
        mergeMap(
          () => throwError(() => new DeadlineExceededError(
            `Did not resolve chain within a deadline of ${resolveChainDeadline}ms`,
            state
          ))
        )
      )
    )) : of(state)),
    mergeMap((state) => state.emitEvents)
  );
}
function createDocumentEventListener(options) {
  const { listenerEvents, loadDocument } = options;
  return function(documentId) {
    return listenerEvents.pipe(
      concatMap((event) => event.type === "mutation" ? event.documentId === documentId ? of(event) : EMPTY : event.type === "reconnect" ? of(event) : event.type === "welcome" ? loadDocument(documentId).pipe(
        catchError((err) => {
          const error = toError(err);
          return isClientError(error) ? throwError(() => error) : throwError(
            () => new FetchError(
              `An unexpected error occurred while fetching document: ${error?.message}`,
              { cause: error }
            )
          );
        }),
        map((result) => {
          if (result.accessible)
            return result.document;
          if (result.reason === "permission")
            throw new PermissionDeniedError(
              `Permission denied. Make sure the current user (or token) has permission to read the document with ID="${documentId}".`
            );
        }),
        map(
          (doc) => ({
            type: "sync",
            document: doc
          })
        )
      ) : EMPTY),
      sequentializeListenerEvents({
        maxBufferSize: 10,
        resolveChainDeadline: 1e4
      })
    );
  };
}
function toError(maybeErr) {
  return maybeErr instanceof Error ? maybeErr : typeof maybeErr == "object" && maybeErr ? Object.assign(new Error(), maybeErr) : new Error(String(maybeErr));
}
const defaultDurationSelector = () => scheduled(of(0), asyncScheduler);
function createDataLoader(options) {
  const durationSelector = options.durationSelector || defaultDurationSelector, requests$ = new BehaviorSubject(void 0), unsubscribes$ = new Subject(), batchResponses = requests$.pipe(
    filter((req) => !!req),
    bufferWhen(durationSelector),
    map((requests) => requests.filter((request) => !request.cancelled)),
    filter((requests) => requests.length > 0),
    mergeMap$1((requests) => {
      const keys = requests.map((request) => request.key), responses = options.onLoad(keys).pipe(
        takeUntil(
          unsubscribes$.pipe(
            filter(() => requests.every((request) => request.cancelled))
          )
        ),
        mergeMap$1((batchResult) => {
          if (batchResult.length !== requests.length)
            throw new Error(
              `The length of the returned batch must be equal to the number of batched requests. Requested a batch of length ${requests.length}, but received a batch of ${batchResult.length}.`
            );
          return requests.map((request, i) => ({
            type: "value",
            request,
            response: batchResult[i]
          }));
        })
      ), responseEnds = requests.map((request) => ({
        request,
        type: "complete"
      }));
      return concat(responses, responseEnds);
    }),
    share()
  );
  return (key) => new Observable((subscriber) => {
    const mutableRequestState = { key, cancelled: !1 }, emit = defer(() => (requests$.next(mutableRequestState), EMPTY)), subscription = merge(
      batchResponses.pipe(
        filter((batchResult) => batchResult.request === mutableRequestState),
        takeWhile((batchResult) => batchResult.type !== "complete"),
        map((batchResult) => batchResult.response)
      ),
      emit
    ).subscribe(subscriber);
    return () => {
      mutableRequestState.cancelled = !0, unsubscribes$.next(), subscription.unsubscribe();
    };
  });
}
function createDocumentLoader(fetchDocuments, options) {
  return createDataLoader({
    onLoad: (ids) => fetchDedupedWith(fetchDocuments, ids),
    durationSelector: options?.durationSelector
  });
}
function createDocumentLoaderFromClient(client, options) {
  return createDocumentLoader((ids) => {
    const requestOptions = {
      uri: client.getDataUrl("doc", ids.join(",")),
      json: !0,
      tag: options?.tag
    };
    return client.observable.request(requestOptions);
  }, options);
}
function fetchDedupedWith(fetchDocuments, ids) {
  const unique = [...new Set(ids)];
  return fetchDocuments(unique).pipe(
    map((results) => prepareResponse(ids, results)),
    map((results) => {
      const byId = keyBy(results, (result) => result.id);
      return ids.map((id) => byId[id]);
    })
  );
}
function prepareResponse(requestedIds, response) {
  const documents = keyBy(response.documents, (entry) => entry._id), omitted = keyBy(response.omitted, (entry) => entry.id);
  return requestedIds.map((id) => {
    if (documents[id])
      return { id, accessible: !0, document: documents[id] };
    const omittedEntry = omitted[id];
    return omittedEntry ? omittedEntry.reason === "permission" ? {
      id,
      accessible: !1,
      reason: "permission"
    } : {
      id,
      accessible: !1,
      reason: "existence"
    } : { id, accessible: !1, reason: "existence" };
  });
}
function createDocumentUpdateListener(options) {
  const { listenDocumentEvents } = options;
  return function(documentId) {
    return listenDocumentEvents(documentId).pipe(
      scan(
        (prev, event) => {
          if (event.type === "sync")
            return {
              event,
              documentId,
              snapshot: event.document
            };
          if (event.type === "mutation") {
            if (prev?.event === void 0)
              throw new Error(
                "Received a mutation event before sync event. Something is wrong"
              );
            if (hasProperty(event, "effects"))
              return {
                event,
                documentId,
                snapshot: applyMutationEventEffects(
                  prev.snapshot,
                  event
                )
              };
            if (hasProperty(event, "mutations"))
              return {
                event,
                documentId,
                snapshot: applyAll(
                  prev.snapshot,
                  decodeAll(event.mutations)
                )
              };
            throw new Error(
              "No effects found on listener event. The listener must be set up to use effectFormat=mendoza."
            );
          }
          return { documentId, snapshot: prev?.snapshot, event };
        },
        void 0
      ),
      // ignore seed value
      filter((update) => update !== void 0)
    );
  };
}
const INITIAL_STATE = {
  status: "connecting",
  event: { type: "connect" },
  snapshot: []
};
function createIdSetListener(listen, fetch) {
  return function(queryFilter, params, options = {}) {
    const { tag } = options, query = `*[${queryFilter}]._id`;
    function fetchFilter() {
      return fetch(query, params, {
        tag: tag ? tag + ".fetch" : void 0
      }).pipe(
        map$1((result) => {
          if (!Array.isArray(result))
            throw new Error(
              `Expected query to return array of documents, but got ${typeof result}`
            );
          return result;
        })
      );
    }
    return listen(query, params, {
      visibility: "transaction",
      events: ["welcome", "mutation", "reconnect"],
      includeResult: !1,
      includeMutations: !1,
      tag: tag ? tag + ".listen" : void 0
    }).pipe(
      mergeMap((event) => event.type === "welcome" ? fetchFilter().pipe(map$1((result) => ({ type: "sync", result }))) : of(event)),
      map$1((event) => {
        if (event.type === "mutation")
          return event.transition === "update" ? void 0 : event.transition === "appear" ? {
            type: "op",
            op: "add",
            documentId: event.documentId
          } : event.transition === "disappear" ? {
            type: "op",
            op: "remove",
            documentId: event.documentId
          } : void 0;
        if (event.type === "sync")
          return { type: "sync", documentIds: event.result };
        if (event.type === "reconnect")
          return { type: "reconnect" };
      }),
      // ignore undefined
      filter$1((ev) => !!ev)
    );
  };
}
function createIdSetListenerFromClient(client) {
}
function toState(options = {}) {
  const { insert: insertOption = "sorted" } = options;
  return (input$) => input$.pipe(
    scan((state, event) => {
      if (event.type === "reconnect")
        return {
          ...state,
          event,
          status: "reconnecting"
        };
      if (event.type === "sync")
        return {
          ...state,
          event,
          status: "connected"
        };
      if (event.type === "op") {
        if (event.op === "add")
          return {
            event,
            status: "connected",
            snapshot: insert(state.snapshot, event.documentId, insertOption)
          };
        if (event.op === "remove")
          return {
            event,
            status: "connected",
            snapshot: state.snapshot.filter((id) => id !== event.documentId)
          };
        throw new Error(`Unexpected operation: ${event.op}`);
      }
      return state;
    }, INITIAL_STATE)
  );
}
function insert(array, element, strategy) {
  let index;
  return strategy === "prepend" ? index = 0 : strategy === "append" ? index = array.length : index = sortedIndex(array, element), array.toSpliced(index, 0, element);
}
function shareReplayLatest(configOrPredicate, config) {
  return _shareReplayLatest(
    typeof configOrPredicate == "function" ? { predicate: configOrPredicate, ...config } : configOrPredicate
  );
}
function _shareReplayLatest(config) {
  return (source) => {
    let latest, emitted = !1;
    const { predicate, ...shareConfig } = config, wrapped = source.pipe(
      tap((value) => {
        config.predicate(value) && (emitted = !0, latest = value);
      }),
      finalize(() => {
        emitted = !1, latest = void 0;
      }),
      share(shareConfig)
    ), emitLatest = new Observable((subscriber) => {
      emitted && subscriber.next(latest), subscriber.complete();
    });
    return merge(wrapped, emitLatest);
  };
}
function withListenErrors() {
  return (input$) => input$.pipe(
    map((event) => {
      if (event.type === "mutation")
        return event;
      if (event.type === "disconnect")
        throw new DisconnectError(`DisconnectError: ${event.reason}`);
      if (event.type === "channelError")
        throw new ChannelError(`ChannelError: ${event.message}`);
      return event;
    })
  );
}
function createSharedListenerFromClient(client, options) {
  return createSharedListener((query, queryParams, request) => client.listen(
    query,
    queryParams,
    request
  ), options);
}
function createSharedListener(listen, options = {}) {
  const { filter: filter2, tag, shutdownDelay, includeSystemDocuments, includeMutations } = options, query = filter2 ? `*[${filter2}]` : includeSystemDocuments ? '*[!(_id in path("_.**"))]' : "*";
  return listen(
    query,
    {},
    {
      events: ["welcome", "mutation", "reconnect"],
      includeResult: !1,
      includePreviousRevision: !1,
      visibility: "transaction",
      effectFormat: "mendoza",
      ...includeMutations ? {} : { includeMutations: !1 },
      tag
    }
  ).pipe(
    shareReplayLatest({
      // note: resetOnError and resetOnComplete are both default true
      resetOnError: !0,
      resetOnComplete: !0,
      predicate: (event) => event.type === "welcome" || event.type === "reconnect",
      resetOnRefCountZero: typeof shutdownDelay == "number" ? () => timer(shutdownDelay) : !0
    }),
    withListenErrors()
  );
}
function createWelcomeEvent() {
  return {
    type: "welcome",
    listenerName: "mock" + Math.random().toString(32).substring(2)
  };
}
function createMockBackendAPI() {
  const documentMap = createDocumentMap(), listenerEvents = new Subject();
  return {
    listen: (query) => concat(
      of(createWelcomeEvent()),
      merge(NEVER, listenerEvents).pipe(
        filter((m) => m.type === "mutation"),
        map$1((ev) => structuredClone(ev))
      )
    ),
    getDocuments(ids) {
      const docs = ids.map((id) => ({ id, document: documentMap.get(id) })), [existing, omitted] = lodashPartition(docs, (entry) => entry.document);
      return of(
        structuredClone({
          documents: existing.map((entry) => entry.document),
          omitted: omitted.map((entry) => ({ id: entry.id, reason: "existence" }))
        })
      );
    },
    submit: (_transaction) => {
      const transaction = structuredClone(_transaction);
      return applyMutations(
        transaction.mutations,
        documentMap,
        transaction.id
      ).forEach((res) => {
        listenerEvents.next({
          type: "mutation",
          documentId: res.id,
          mutations: encodeAll(res.mutations),
          transactionId: transaction.id || createTransactionId(),
          previousRev: res.before?._rev,
          resultRev: res.after?._rev,
          transition: res.after === void 0 ? "disappear" : res.before === void 0 ? "appear" : "update"
        });
      }), of({});
    }
  };
}
function createOptimisticStoreClientBackend(client) {
  return {
    listen: createDocumentEventListener({
      loadDocument: createDocumentLoaderFromClient(client),
      listenerEvents: createSharedListenerFromClient(client)
    }),
    submit: (transaction) => from(
      client.dataRequest("mutate", encodeTransaction(transaction), {
        visibility: "async",
        returnDocuments: !1
      })
    )
  };
}
function createOptimisticStoreMockBackend(backendAPI) {
  const sharedListener = createSharedListener(
    (query, options) => backendAPI.listen(query)
  ), loadDocument = createDocumentLoader((ids) => backendAPI.getDocuments(ids));
  return { listen: createDocumentEventListener({
    loadDocument,
    listenerEvents: sharedListener
  }), submit: backendAPI.submit };
}
export {
  createDocumentEventListener,
  createDocumentLoader,
  createDocumentLoaderFromClient,
  createDocumentUpdateListener,
  createIdSetListener,
  createIdSetListenerFromClient,
  createMockBackendAPI,
  createOptimisticStore,
  createOptimisticStoreClientBackend,
  createOptimisticStoreMockBackend,
  createReadOnlyStore,
  createSharedListener,
  createSharedListenerFromClient,
  toState,
  toTransactions
};
//# sourceMappingURL=_unstable_store.js.map
