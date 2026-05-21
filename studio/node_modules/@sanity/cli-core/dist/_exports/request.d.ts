import { agent } from "get-it/middleware";
import { base } from "get-it/middleware";
import { injectResponse } from "get-it/middleware";
import { jsonRequest } from "get-it/middleware";
import { jsonResponse } from "get-it/middleware";
import { keepAlive } from "get-it/middleware";
import { observable } from "get-it/middleware";
import { progress } from "get-it/middleware";
import { proxy } from "get-it/middleware";
import { Requester } from "get-it";
import { retry } from "get-it/middleware";
import { urlEncoded } from "get-it/middleware";

export { agent };

export { base };

/**
 * Creates a `get-it` requester with a standard set of middleware.
 *
 * Default middleware (in order):
 * 1. `httpErrors()` — throw on HTTP error status codes
 * 2. `headers({'User-Agent': '@sanity/cli-core@<version>'})` — identify CLI requests
 * 3. `debug({verbose: true, namespace: 'sanity:cli'})` — debug logging
 * 4. `promise({onlyBody: true})` — return body directly (must be last)
 *
 * @param options - Optional configuration to disable or customize middleware
 * @returns A configured `get-it` requester
 * @public
 */
export declare function createRequester(options?: {
  middleware?: MiddlewareOptions;
}): Requester;

export { injectResponse };

export { jsonRequest };

export { jsonResponse };

export { keepAlive };

/**
 * Options for configuring individual middleware in {@link createRequester}.
 *
 * Each key corresponds to a middleware. Omitting a key uses the default,
 * `false` disables it, and an object merges with the defaults.
 *
 * @public
 */
export declare type MiddlewareOptions = {
  debug?:
    | false
    | {
        namespace?: string;
        verbose?: boolean;
      };
  headers?: false | Record<string, string>;
  httpErrors?: false;
  promise?:
    | false
    | {
        onlyBody?: boolean;
      };
};

export { observable };

export { progress };

export { proxy };

export { Requester };

export { retry };

export { urlEncoded };

export {};
