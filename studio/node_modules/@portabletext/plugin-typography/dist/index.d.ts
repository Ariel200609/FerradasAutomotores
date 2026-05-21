import type {EditorContext, EditorSchema} from '@portabletext/editor'
import {InputRule, InputRuleGuard} from '@portabletext/plugin-input-rule'
import {JSX} from 'react'

/**
 * @public
 */
export declare const closingDoubleQuoteRule: InputRule<true>

/**
 * @public
 */
export declare const closingSingleQuoteRule: InputRule<true>

/**
 * @public
 */
export declare const copyrightRule: InputRule<true>

/**
 * @public
 * Create an `InputRuleGuard` that can prevent the rule from running inside
 * certain decorators.
 *
 * @example
 * ```tsx
 * const guard = createDecoratorGuard({
 *  decorators: ({context}) => context.schema.decorators.flatMap((decorator) => decorator.name === 'code' ? [] : [decorator.name]),
 * })
 *
 * <TypographyPlugin guard={guard} />
 * ```
 */
export declare function createDecoratorGuard(config: {
  decorators: ({
    context,
  }: {
    context: Pick<EditorContext, 'schema'>
  }) => Array<EditorSchema['decorators'][number]['name']>
}): InputRuleGuard

declare const defaultRuleConfig: readonly [
  {
    readonly name: 'emDash'
    readonly rule: InputRule<true>
    readonly state: 'on'
  },
  {
    readonly name: 'ellipsis'
    readonly rule: InputRule<true>
    readonly state: 'on'
  },
  {
    readonly name: 'openingDoubleQuote'
    readonly rule: InputRule<true>
    readonly state: 'on'
  },
  {
    readonly name: 'closingDoubleQuote'
    readonly rule: InputRule<true>
    readonly state: 'on'
  },
  {
    readonly name: 'openingSingleQuote'
    readonly rule: InputRule<true>
    readonly state: 'on'
  },
  {
    readonly name: 'closingSingleQuote'
    readonly rule: InputRule<true>
    readonly state: 'on'
  },
  {
    readonly name: 'leftArrow'
    readonly rule: InputRule<true>
    readonly state: 'on'
  },
  {
    readonly name: 'rightArrow'
    readonly rule: InputRule<true>
    readonly state: 'on'
  },
  {
    readonly name: 'copyright'
    readonly rule: InputRule<true>
    readonly state: 'on'
  },
  {
    readonly name: 'trademark'
    readonly rule: InputRule<true>
    readonly state: 'on'
  },
  {
    readonly name: 'servicemark'
    readonly rule: InputRule<true>
    readonly state: 'on'
  },
  {
    readonly name: 'registeredTrademark'
    readonly rule: InputRule<true>
    readonly state: 'on'
  },
  {
    readonly name: 'oneHalf'
    readonly rule: InputRule<true>
    readonly state: 'off'
  },
  {
    readonly name: 'plusMinus'
    readonly rule: InputRule<true>
    readonly state: 'off'
  },
  {
    readonly name: 'laquo'
    readonly rule: InputRule<true>
    readonly state: 'off'
  },
  {
    readonly name: 'notEqual'
    readonly rule: InputRule<true>
    readonly state: 'off'
  },
  {
    readonly name: 'raquo'
    readonly rule: InputRule<true>
    readonly state: 'off'
  },
  {
    readonly name: 'multiplication'
    readonly rule: InputRule<true>
    readonly state: 'off'
  },
  {
    readonly name: 'superscriptTwo'
    readonly rule: InputRule<true>
    readonly state: 'off'
  },
  {
    readonly name: 'superscriptThree'
    readonly rule: InputRule<true>
    readonly state: 'off'
  },
  {
    readonly name: 'oneQuarter'
    readonly rule: InputRule<true>
    readonly state: 'off'
  },
  {
    readonly name: 'threeQuarters'
    readonly rule: InputRule<true>
    readonly state: 'off'
  },
]

/**
 * @public
 */
export declare const ellipsisRule: InputRule<true>

/**
 * @public
 */
export declare const emDashRule: InputRule<true>

/**
 * @public
 */
export declare const laquoRule: InputRule<true>

/**
 * @public
 */
export declare const leftArrowRule: InputRule<true>

/**
 * @public
 */
export declare const multiplicationRule: InputRule<true>

/**
 * @public
 */
export declare const notEqualRule: InputRule<true>

/**
 * @public
 */
export declare const oneHalfRule: InputRule<true>

/**
 * @public
 */
export declare const oneQuarterRule: InputRule<true>

/**
 * @public
 */
export declare const openingDoubleQuoteRule: InputRule<true>

/**
 * @public
 */
export declare const openingSingleQuoteRule: InputRule<true>

/**
 * @public
 */
export declare const plusMinusRule: InputRule<true>

/**
 * @public
 */
export declare const raquoRule: InputRule<true>

/**
 * @beta
 */
export declare const registeredTrademarkRule: InputRule<true>

/**
 * @public
 */
export declare const rightArrowRule: InputRule<true>

declare type RuleName = (typeof defaultRuleConfig)[number]['name']

/**
 * @public
 */
export declare const servicemarkRule: InputRule<true>

/**
 * @public
 */
export declare const smartQuotesRules: Array<InputRule>

/**
 * @public
 */
export declare const superscriptThreeRule: InputRule<true>

/**
 * @public
 */
export declare const superscriptTwoRule: InputRule<true>

/**
 * @public
 */
export declare const threeQuartersRule: InputRule<true>

/**
 * @public
 */
export declare const trademarkRule: InputRule<true>

/**
 * @public
 */
export declare function TypographyPlugin<
  TEnabledRuleName extends RuleName = never,
  TDisabledRuleName extends Exclude<RuleName, TEnabledRuleName> = never,
>(
  props: TypographyPluginProps<TEnabledRuleName, TDisabledRuleName>,
): JSX.Element

/**
 * @public
 */
export declare type TypographyPluginProps<
  TEnabledRuleName extends RuleName = never,
  TDisabledRuleName extends Exclude<RuleName, TEnabledRuleName> = never,
> = {
  guard?: InputRuleGuard
  /**
   * Preset configuration for rules.
   * - `'default'`: Common typography rules enabled (em dash, ellipsis, quotes, arrows, copyright symbols)
   * - `'all'`: All rules enabled
   * - `'none'`: No rules enabled (use with `enable` prop)
   *
   * @defaultValue 'default'
   */
  preset?: 'default' | 'all' | 'none'
  /**
   * Enable specific rules (additive to preset).
   * Use this to enable additional rules beyond the preset.
   *
   * @example
   * ```tsx
   * // Enable multiplication and plusMinus in addition to default rules
   * <TypographyPlugin enable={['multiplication', 'plusMinus']} />
   * ```
   */
  enable?: ReadonlyArray<TEnabledRuleName>
  /**
   * Disable specific rules (subtractive from preset).
   * Use this to disable rules that would otherwise be enabled by the preset.
   * Cannot contain rules that are in the `enable` array (TypeScript will enforce this).
   *
   * @example
   * ```tsx
   * // Disable em dash from the default rules
   * <TypographyPlugin disable={['emDash']} />
   * ```
   */
  disable?: ReadonlyArray<TDisabledRuleName>
}

export {}
