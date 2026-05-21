import { a as SanityClientLike, i as PreviewUrlValidateUrlResult } from "./_chunks-dts/types.js";
import { _ as urlSearchParamPreviewSecret, h as urlSearchParamPreviewPathname } from "./_chunks-dts/constants.js";
/**
 * @public
 */
declare function validatePreviewUrl(_client: SanityClientLike, previewUrl: string,
/**
 * @deprecated - this option is automatically determined based on the environment
 */

disableCacheNoStore?: boolean): Promise<PreviewUrlValidateUrlResult>;
export { type PreviewUrlValidateUrlResult, type SanityClientLike, urlSearchParamPreviewPathname, urlSearchParamPreviewSecret, validatePreviewUrl };
//# sourceMappingURL=index.d.ts.map