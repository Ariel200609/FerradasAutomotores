import "./_chunks-dts/index.cjs";
import { AnyArray, AnyEmptyArray, ByIndex, Concat, ConcatInner, Digit, ElementType, Err, FindBy, FindInArray, Index, KeyedPathElement, Merge, MergeInner, Ok, OnlyDigits, Optional, ParseAllProps, ParseError, ParseExpressions, ParseInnerExpression, ParseKVPair, ParseNumber, ParseObject, ParseProperty, ParseValue, Path, PathElement, PropertyName, Result, SafePath, Split, SplitAll, StringToPath, StripError, ToArray, ToNumber, Trim, TrimLeft, TrimRight, Try, Unwrap } from "./_chunks-dts/types.cjs";
import { Get, GetAtPath, getAtPath, isArrayElement, isElementEqual, isEqual, isIndexElement, isKeyElement, isKeyedElement, isPropertyElement, normalize, parse, startsWith, stringify } from "./_chunks-dts/predicates.cjs";
import { AnyOp, ArrayOp, AssignOp, CreateIfNotExistsMutation, CreateMutation, CreateOrReplaceMutation, DecOp, DeleteMutation, DiffMatchPatchOp, IncOp, InsertIfMissingOp, InsertOp, Mutation, NodePatch, NodePatchList, NumberOp, ObjectOp, Operation, PatchMutation, PatchOptions, PrimitiveOp, RelativePosition, RemoveOp, ReplaceOp, SanityDocumentBase, SetIfMissingOp, SetOp, StringOp, Transaction, TruncateOp, UnassignOp, UnsetOp, UpsertOp } from "./_chunks-dts/types2.cjs";
import { Conflict, DocumentMap, MutationGroup, MutationResult, NonTransactionalMutationGroup, OptimisticDocumentEvent, RawPatch, RemoteDocumentEvent, RemoteMutationEvent, RemoteSyncEvent, SubmitResult, TransactionalMutationGroup, toTransactions } from "./_chunks-dts/createOptimisticStore.cjs";
import "./_chunks-dts/types3.cjs";
import * as rxjs0 from "rxjs";
import * as _sanity_client5 from "@sanity/client";
import { MutationEvent, ReconnectEvent, SanityClient, SanityDocument, WelcomeEvent } from "@sanity/client";
import * as xstate43 from "xstate";
interface UpdateResult<T extends SanityDocumentBase> {
  id: string;
  status: 'created' | 'updated' | 'deleted';
  before?: T;
  after?: T;
  mutations: Mutation[];
}
/**
 * Takes a list of mutations and applies them to documents in a documentMap
 */
declare function applyMutations<T extends SanityDocumentBase>(mutations: Mutation[], documentMap: DocumentMap<T>,
/**
 * note: should never be set client side – only for test purposes
 */
transactionId?: never): UpdateResult<T>[];
declare function commit<Doc extends SanityDocumentBase>(results: UpdateResult<Doc>[], documentMap: DocumentMap<Doc>): void;
interface DataStore {
  get: (id: string) => SanityDocumentBase | undefined;
}
declare function squashDMPStrings(base: DataStore, mutationGroups: MutationGroup[]): MutationGroup[];
declare function squashMutationGroups(staged: MutationGroup[]): MutationGroup[];
declare function rebase(documentId: string, oldBase: SanityDocumentBase | undefined, newBase: SanityDocumentBase | undefined, localMutations: MutationGroup[]): [newLocal: MutationGroup[], rebased: SanityDocumentBase | undefined];
/**
 * Creates a single, shared, listener EventSource that strems remote mutations, and notifies when it's online (welcome), offline (reconnect).
 */
declare function createSharedListener(client: SanityClient): rxjs0.Observable<WelcomeEvent | ReconnectEvent | MutationEvent>;
interface DocumentMutatorMachineInput {
  id: string;
  client: SanityClient;
  /** A shared listener can be provided, if not it'll be created using `client.listen()` */
  sharedListener?: ReturnType<typeof createSharedListener>;
  cache?: Map<string, SanityDocument | null>;
}
type DocumentMutatorMachineParentEvent = {
  type: 'sync';
  id: string;
  document: SanityDocumentBase;
} | {
  type: 'mutation';
  id: string;
  effects: {
    apply: RawPatch;
  };
  previousRev: string;
  resultRev: string;
} | {
  type: 'rebased.local';
  id: string;
  document: SanityDocumentBase;
} | {
  type: 'rebased.remote';
  id: string;
  document: SanityDocumentBase;
} | {
  type: 'pristine';
  id: string;
};
declare const documentMutatorMachine: xstate43.StateMachine<{
  client: SanityClient;
  /** A shared listener can be provided, if not it'll be created using `client.listen()` */
  sharedListener?: ReturnType<typeof createSharedListener>;
  /** The document id */
  id: string;
  cache?: Map<string, SanityDocument | null>;
  remote: SanityDocument | null | undefined;
  local: SanityDocument | null | undefined;
  mutationEvents: MutationEvent[];
  stagedChanges: MutationGroup[];
  stashedChanges: MutationGroup[];
  error: unknown;
  fetchRemoteSnapshotAttempts: number;
  submitTransactionsAttempts: number;
}, _sanity_client5.WelcomeEvent | _sanity_client5.ReconnectEvent | MutationEvent | {
  type: "error";
} | {
  type: "retry";
} | {
  type: "connect";
} | {
  type: "reconnect";
} | {
  type: "welcome";
} | {
  type: "mutate";
  mutations: Mutation[];
} | {
  type: "submit";
} | {
  type: "xstate.done.actor.getDocument";
  output: SanityDocument;
} | {
  type: "xstate.done.actor.submitTransactions";
  output: undefined;
}, {
  [x: string]: xstate43.ActorRefFromLogic<xstate43.PromiseActorLogic<void | SanityDocument<Record<string, any>> | undefined, {
    client: SanityClient;
    id: string;
  }, xstate43.EventObject>> | xstate43.ActorRefFromLogic<xstate43.PromiseActorLogic<void, {
    client: SanityClient;
    transactions: Transaction[];
  }, xstate43.EventObject>> | xstate43.ActorRefFromLogic<xstate43.ObservableActorLogic<_sanity_client5.WelcomeEvent | _sanity_client5.ReconnectEvent | MutationEvent, {
    listener: ReturnType<typeof createSharedListener>;
    id: string;
  }, xstate43.EventObject>> | undefined;
  getDocument?: xstate43.ActorRefFromLogic<xstate43.PromiseActorLogic<void | SanityDocument<Record<string, any>> | undefined, {
    client: SanityClient;
    id: string;
  }, xstate43.EventObject>> | undefined;
  submitTransactions?: xstate43.ActorRefFromLogic<xstate43.PromiseActorLogic<void, {
    client: SanityClient;
    transactions: Transaction[];
  }, xstate43.EventObject>> | undefined;
}, {
  src: "fetch remote snapshot";
  logic: xstate43.PromiseActorLogic<void | SanityDocument<Record<string, any>> | undefined, {
    client: SanityClient;
    id: string;
  }, xstate43.EventObject>;
  id: "getDocument";
} | {
  src: "submit mutations as transactions";
  logic: xstate43.PromiseActorLogic<void, {
    client: SanityClient;
    transactions: Transaction[];
  }, xstate43.EventObject>;
  id: "submitTransactions";
} | {
  src: "server-sent events";
  logic: xstate43.ObservableActorLogic<_sanity_client5.WelcomeEvent | _sanity_client5.ReconnectEvent | MutationEvent, {
    listener: ReturnType<typeof createSharedListener>;
    id: string;
  }, xstate43.EventObject>;
  id: string | undefined;
}, {
  type: "assign error to context";
  params: xstate43.NonReducibleUnknown;
} | {
  type: "clear error from context";
  params: xstate43.NonReducibleUnknown;
} | {
  type: "connect to server-sent events";
  params: xstate43.NonReducibleUnknown;
} | {
  type: "listen to server-sent events";
  params: xstate43.NonReducibleUnknown;
} | {
  type: "stop listening to server-sent events";
  params: xstate43.NonReducibleUnknown;
} | {
  type: "buffer remote mutation events";
  params: xstate43.NonReducibleUnknown;
} | {
  type: "restore stashed changes";
  params: xstate43.NonReducibleUnknown;
} | {
  type: "rebase fetched remote snapshot";
  params: xstate43.NonReducibleUnknown;
} | {
  type: "apply mendoza patch";
  params: xstate43.NonReducibleUnknown;
} | {
  type: "increment fetch attempts";
  params: xstate43.NonReducibleUnknown;
} | {
  type: "reset fetch attempts";
  params: xstate43.NonReducibleUnknown;
} | {
  type: "increment submit attempts";
  params: xstate43.NonReducibleUnknown;
} | {
  type: "reset submit attempts";
  params: xstate43.NonReducibleUnknown;
} | {
  type: "stage mutation";
  params: xstate43.NonReducibleUnknown;
} | {
  type: "stash mutation";
  params: xstate43.NonReducibleUnknown;
} | {
  type: "rebase local snapshot";
  params: xstate43.NonReducibleUnknown;
} | {
  type: "send pristine event to parent";
  params: xstate43.NonReducibleUnknown;
} | {
  type: "send sync event to parent";
  params: xstate43.NonReducibleUnknown;
} | {
  type: "send mutation event to parent";
  params: xstate43.NonReducibleUnknown;
}, never, "fetchRemoteSnapshotTimeout" | "submitTransactionsTimeout", "disconnected" | "connecting" | "reconnecting" | "connectFailure" | {
  connected: "loading" | "loadFailure" | {
    loaded: "pristine" | "dirty" | "submitting" | "submitFailure";
  };
}, "error" | "busy" | "ready", DocumentMutatorMachineInput, xstate43.NonReducibleUnknown, xstate43.EventObject, xstate43.MetaObject, {
  id: "document-mutator";
  states: {
    readonly disconnected: {};
    readonly connecting: {};
    readonly connectFailure: {};
    readonly reconnecting: {};
    readonly connected: {
      states: {
        readonly loading: {};
        readonly loaded: {
          states: {
            readonly pristine: {};
            readonly dirty: {};
            readonly submitting: {};
            readonly submitFailure: {};
          };
        };
        readonly loadFailure: {};
      };
    };
  };
}>;
export { AnyArray, AnyEmptyArray, AnyOp, ArrayOp, AssignOp, ByIndex, Concat, ConcatInner, Conflict, CreateIfNotExistsMutation, CreateMutation, CreateOrReplaceMutation, DataStore, DecOp, DeleteMutation, DiffMatchPatchOp, Digit, DocumentMap, DocumentMutatorMachineInput, DocumentMutatorMachineParentEvent, ElementType, Err, FindBy, FindInArray, Get, GetAtPath, IncOp, Index, InsertIfMissingOp, InsertOp, KeyedPathElement, Merge, MergeInner, Mutation, MutationGroup, MutationResult, NodePatch, NodePatchList, NonTransactionalMutationGroup, NumberOp, ObjectOp, Ok, OnlyDigits, Operation, OptimisticDocumentEvent, Optional, ParseAllProps, ParseError, ParseExpressions, ParseInnerExpression, ParseKVPair, ParseNumber, ParseObject, ParseProperty, ParseValue, PatchMutation, PatchOptions, Path, PathElement, PrimitiveOp, PropertyName, RelativePosition, RemoteDocumentEvent, RemoteMutationEvent, RemoteSyncEvent, RemoveOp, ReplaceOp, Result, SafePath, SanityDocumentBase, SetIfMissingOp, SetOp, Split, SplitAll, StringOp, StringToPath, StripError, SubmitResult, ToArray, ToNumber, Transaction, TransactionalMutationGroup, Trim, TrimLeft, TrimRight, TruncateOp, Try, UnassignOp, UnsetOp, Unwrap, UpdateResult, UpsertOp, applyMutations, commit, createSharedListener, documentMutatorMachine, getAtPath, isArrayElement, isElementEqual, isEqual, isIndexElement, isKeyElement, isKeyedElement, isPropertyElement, normalize, parse, rebase, squashDMPStrings, squashMutationGroups, startsWith, stringify, toTransactions };
//# sourceMappingURL=_unstable_machine.d.cts.map