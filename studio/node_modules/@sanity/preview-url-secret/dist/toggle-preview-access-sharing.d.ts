import { a as SanityClientLike } from "./_chunks-dts/types.js";
import { SanityClient } from "@sanity/client";
/** @internal */
declare function enablePreviewAccessSharing(_client: SanityClient, source: string, studioUrl: string, userId?: string): Promise<{
  secret: string;
}>;
/** @internal */
declare function disablePreviewAccessSharing(_client: SanityClient, source: string, studioUrl: string, userId?: string): Promise<void>;
export { type SanityClientLike, disablePreviewAccessSharing, enablePreviewAccessSharing };
//# sourceMappingURL=toggle-preview-access-sharing.d.ts.map