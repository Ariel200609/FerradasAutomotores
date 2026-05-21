import { fetchVercelProtectionBypassSecret } from "./constants.js";
function subscribeToVercelProtectionBypass(client, onChange) {
  let controller = new AbortController(), usedTags = [];
  async function fetchSecret(lastLiveEventId, signal) {
    const { result, syncTags } = await client.fetch(
      fetchVercelProtectionBypassSecret,
      {},
      {
        filterResponse: !1,
        lastLiveEventId,
        tag: "preview-url-secret.fetch-vercel-bypass-protection-secret"
      }
    );
    Array.isArray(syncTags) && (usedTags = syncTags), signal.aborted || onChange(result);
  }
  const subscription = client.live.events().subscribe({
    next: (event) => {
      event.type === "message" && (controller.abort(), controller = new AbortController(), event.tags.some((tag) => usedTags.includes(tag)) && fetchSecret(event.id, controller.signal));
    },
    // eslint-disable-next-line no-console
    error: (reason) => console.error(reason)
  });
  return fetchSecret(null, controller.signal), () => {
    subscription.unsubscribe(), controller.abort();
  };
}
export {
  subscribeToVercelProtectionBypass
};
//# sourceMappingURL=toggle-vercel-protection-bypass.js.map
