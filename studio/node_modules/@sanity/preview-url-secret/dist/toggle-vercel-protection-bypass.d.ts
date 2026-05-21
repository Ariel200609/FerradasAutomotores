import { a as SanityClientLike } from "./_chunks-dts/types.js";
import { SanityClient } from "@sanity/client";
/** @internal */
declare function subscribeToVercelProtectionBypass(client: SanityClient, onChange: (secret: string | null) => void): () => void;
export { type SanityClientLike, subscribeToVercelProtectionBypass };
//# sourceMappingURL=toggle-vercel-protection-bypass.d.ts.map