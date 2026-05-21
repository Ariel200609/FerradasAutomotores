import type {EditorContext} from '@portabletext/editor'
import {
  BehaviorGuard,
  NativeBehaviorEvent,
} from '@portabletext/editor/behaviors'

/**
 * Function that converts a pasted URL into a link annotation.
 * Return `undefined` to skip handling.
 * @public
 */
export declare type LinkMatcher = (params: {
  context: LinkMatcherContext
  value: LinkMatcherValue
}) => LinkMatcherResult | undefined

/**
 * Context provided to link matchers.
 * @public
 */
export declare type LinkMatcherContext = Pick<
  EditorContext,
  'schema' | 'keyGenerator'
>

/**
 * Object returned by link matchers.
 * @public
 */
export declare type LinkMatcherResult = {
  _type: string
  _key?: string
  [other: string]: unknown
}

/**
 * Value provided to link matchers.
 * @public
 */
export declare type LinkMatcherValue = {
  href: string
}

/**
 * Guard function that controls when the paste link behavior runs.
 * Return `false` to skip the behavior and fall through to default paste handling.
 * @public
 */
export declare type PasteLinkGuard = BehaviorGuard<
  Extract<
    NativeBehaviorEvent,
    {
      type: 'clipboard.paste'
    }
  >,
  true
>

/**
 * Plugin that handles pasting URLs in the editor.
 *
 * When text is selected and a URL is pasted, adds a link annotation to the selection.
 * When the caret is collapsed (no selection) and a URL is pasted, inserts the URL as text with a link annotation.
 *
 * @public
 */
export declare function PasteLinkPlugin({
  guard,
  link,
}: PasteLinkPluginProps): null

/**
 * @public
 */
export declare type PasteLinkPluginProps = {
  guard?: PasteLinkGuard
  link?: LinkMatcher
}

export {}
