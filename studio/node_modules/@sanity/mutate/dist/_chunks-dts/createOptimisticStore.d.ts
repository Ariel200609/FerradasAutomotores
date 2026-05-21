import { Path } from "./types.js";
import { Mutation, SanityDocumentBase, Transaction } from "./types2.js";
import { SanityMutation } from "./types3.js";
import { Observable } from "rxjs";
declare type RawOperation = any;
declare type RawPatch = RawOperation[];
interface ListenerSyncEvent<Doc extends SanityDocumentBase = SanityDocumentBase> {
  type: 'sync';
  document: Doc | undefined;
}
interface ListenerMutationEvent {
  type: 'mutation';
  documentId: string;
  transactionId: string;
  resultRev?: string;
  previousRev?: string;
  effects?: {
    apply: RawPatch;
  };
  mutations: SanityMutation[];
  transition: 'update' | 'appear' | 'disappear';
}
interface ListenerReconnectEvent {
  type: 'reconnect';
}
type ListenerChannelErrorEvent = {
  type: 'channelError';
  message: string;
};
type ListenerWelcomeEvent = {
  type: 'welcome';
  listenerName: string;
};
type ListenerDisconnectEvent = {
  type: 'disconnect';
  reason: string;
};
type ListenerEndpointEvent = ListenerWelcomeEvent | ListenerMutationEvent | ListenerReconnectEvent | ListenerChannelErrorEvent | ListenerDisconnectEvent;
type ListenerEvent<Doc extends SanityDocumentBase = SanityDocumentBase> = ListenerSyncEvent<Doc> | ListenerMutationEvent | ListenerReconnectEvent;
interface OptimisticDocumentEvent {
  type: 'optimistic';
  id: string;
  before: SanityDocumentBase | undefined;
  after: SanityDocumentBase | undefined;
  mutations: Mutation[];
  stagedChanges: Mutation[];
}
type QueryParams = Record<string, string | number | boolean | (string | number | boolean)[]>;
interface RemoteSyncEvent {
  type: 'sync';
  id: string;
  before: {
    local: SanityDocumentBase | undefined;
    remote: SanityDocumentBase | undefined;
  };
  after: {
    local: SanityDocumentBase | undefined;
    remote: SanityDocumentBase | undefined;
  };
  rebasedStage: MutationGroup[];
}
interface RemoteMutationEvent {
  type: 'mutation';
  id: string;
  before: {
    local: SanityDocumentBase | undefined;
    remote: SanityDocumentBase | undefined;
  };
  after: {
    local: SanityDocumentBase | undefined;
    remote: SanityDocumentBase | undefined;
  };
  effects?: {
    apply: RawPatch;
  };
  previousRev?: string;
  resultRev?: string;
  mutations: Mutation[];
  rebasedStage: MutationGroup[];
}
type RemoteDocumentEvent = RemoteSyncEvent | RemoteMutationEvent;
type DocumentMap<Doc extends SanityDocumentBase> = {
  get(id: string): Doc | undefined;
  set(id: string, doc: Doc | undefined): void;
  delete(id: string): void;
};
interface MutationResult {}
interface SubmitResult {}
interface NonTransactionalMutationGroup {
  transaction: false;
  mutations: Mutation[];
}
interface TransactionalMutationGroup {
  transaction: true;
  id?: string;
  mutations: Mutation[];
}
/**
 * A mutation group represents an incoming, locally added group of mutations
 * They can either be transactional or non-transactional
 * - Transactional means that they must be submitted as a separate transaction (with an optional id) and no other mutations can be mixed with it
 * – Non-transactional means that they can be combined with other mutations
 */
type MutationGroup = NonTransactionalMutationGroup | TransactionalMutationGroup;
type Conflict = {
  path: Path;
  error: Error;
  base: SanityDocumentBase | undefined;
  local: SanityDocumentBase | undefined;
};
interface OptimisticStore {
  meta: {
    /**
     * A stream of events for anything that happens in the store
     */
    events: Observable<OptimisticDocumentEvent | RemoteDocumentEvent>;
    /**
     * A stream of current staged changes
     */
    stage: Observable<MutationGroup[]>;
    /**
     * A stream of current conflicts. TODO: Needs more work
     */
    conflicts: Observable<Conflict[]>;
  };
  /**
   * Applies the given mutations. Mutations are not guaranteed to be submitted in the same transaction
   * Can this mutate both local and remote documents at the same time
   */
  mutate(mutation: Mutation[]): MutationResult;
  /**
   * Makes sure the given mutations are posted in a single transaction
   */
  transaction(transaction: {
    id?: string;
    mutations: Mutation[];
  } | Mutation[]): MutationResult;
  /**
   * Checkout a document for editing. This is required to be able to see optimistic changes
   */
  listen(id: string): Observable<SanityDocumentBase | undefined>;
  /**
   * Listen for events for a given document id
   */
  listenEvents(id: string): Observable<RemoteDocumentEvent | OptimisticDocumentEvent>;
  /**
   * Optimize list of pending mutations
   */
  optimize(): void;
  /**
   * Submit pending mutations
   */
  submit(): Promise<SubmitResult[]>;
}
interface OptimisticStoreBackend {
  /**
   * Sets up a subscription to a document
   * The first event should either be a sync event or an error event.
   * After that, it should emit mutation events, error events or sync events
   * @param id
   */
  listen: (id: string) => Observable<ListenerEvent>;
  submit: (mutationGroups: Transaction) => Observable<SubmitResult>;
}
/**
 * Creates a local dataset that allows subscribing to documents by id and submitting mutations to be optimistically applied
 * @param backend
 */
declare function createOptimisticStore(backend: OptimisticStoreBackend): OptimisticStore;
declare function toTransactions(groups: MutationGroup[]): Transaction[];
export { Conflict, DocumentMap, ListenerChannelErrorEvent, ListenerDisconnectEvent, ListenerEndpointEvent, ListenerEvent, ListenerMutationEvent, ListenerReconnectEvent, ListenerSyncEvent, ListenerWelcomeEvent, MutationGroup, MutationResult, NonTransactionalMutationGroup, OptimisticDocumentEvent, OptimisticStore, OptimisticStoreBackend, QueryParams, RawPatch, RemoteDocumentEvent, RemoteMutationEvent, RemoteSyncEvent, SubmitResult, TransactionalMutationGroup, createOptimisticStore, toTransactions };
//# sourceMappingURL=createOptimisticStore.d.ts.map