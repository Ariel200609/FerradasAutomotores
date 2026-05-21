import {BlockOffset, EditorSelection} from '@portabletext/editor'
import type {BlockPath, PortableTextBlock} from '@portabletext/editor'
import {Behavior, BehaviorEvent} from '@portabletext/editor/behaviors'
import type {
  BehaviorActionSet,
  BehaviorGuard,
} from '@portabletext/editor/behaviors'

/**
 * @alpha
 */
export declare function defineInputRule<TGuardResponse = true>(
  config: InputRule<TGuardResponse>,
): InputRule<TGuardResponse>

/**
 * @alpha
 */
export declare function defineInputRuleBehavior(config: {
  rules: Array<InputRule<any>>
  onApply?: ({
    endOffsets,
    endSelection,
  }: {
    endOffsets:
      | {
          start: BlockOffset
          end: BlockOffset
        }
      | undefined
    endSelection: EditorSelection
  }) => void
}): Behavior<
  | '*'
  | 'insert.text'
  | 'annotation.add'
  | 'annotation.remove'
  | 'block.set'
  | 'block.unset'
  | 'child.set'
  | 'child.unset'
  | 'decorator.add'
  | 'decorator.remove'
  | 'delete'
  | 'history.redo'
  | 'history.undo'
  | 'insert.block'
  | 'insert.child'
  | 'move.backward'
  | 'move.block'
  | 'move.forward'
  | 'select'
  | 'annotation.set'
  | 'annotation.toggle'
  | 'decorator.toggle'
  | 'delete.backward'
  | 'delete.block'
  | 'delete.child'
  | 'delete.forward'
  | 'delete.text'
  | 'deserialize'
  | 'deserialize.data'
  | 'deserialization.success'
  | 'deserialization.failure'
  | 'insert.blocks'
  | 'insert.break'
  | 'insert.inline object'
  | 'insert.soft break'
  | 'insert.span'
  | 'list item.add'
  | 'list item.remove'
  | 'list item.toggle'
  | 'move.block down'
  | 'move.block up'
  | 'select.block'
  | 'select.previous block'
  | 'select.next block'
  | 'serialize'
  | 'serialize.data'
  | 'serialization.success'
  | 'serialization.failure'
  | 'split'
  | 'style.add'
  | 'style.remove'
  | 'style.toggle'
  | 'clipboard.copy'
  | 'clipboard.cut'
  | 'clipboard.paste'
  | 'drag.dragstart'
  | 'drag.drag'
  | 'drag.dragend'
  | 'drag.dragenter'
  | 'drag.dragover'
  | 'drag.dragleave'
  | 'drag.drop'
  | 'input.*'
  | 'keyboard.keydown'
  | 'keyboard.keyup'
  | 'mouse.click'
  | 'delete.*'
  | 'select.*'
  | 'deserialize.*'
  | 'serialize.*'
  | 'split.*'
  | 'insert.*'
  | 'annotation.*'
  | 'block.*'
  | 'child.*'
  | 'decorator.*'
  | 'history.*'
  | 'move.*'
  | 'deserialization.*'
  | 'list item.*'
  | 'serialization.*'
  | 'style.*'
  | 'clipboard.*'
  | 'drag.*'
  | 'keyboard.*'
  | 'mouse.*'
  | `custom.${string}`,
  true,
  BehaviorEvent
>

/**
 * Define an `InputRule` specifically designed to transform matched text into
 * some other text.
 *
 * @example
 * ```tsx
 * const transformRule = defineTextTransformRule({
 *   on: /--/,
 *   transform: () => '—',
 * })
 * ```
 *
 * @alpha
 */
export declare function defineTextTransformRule<TGuardResponse = true>(
  config: TextTransformRule<TGuardResponse>,
): InputRule<TGuardResponse>

/**
 * @alpha
 */
export declare type InputRule<TGuardResponse = true> = {
  on: RegExp
  guard?: InputRuleGuard<TGuardResponse>
  actions: Array<BehaviorActionSet<InputRuleEvent, TGuardResponse>>
}

/**
 * @alpha
 */
export declare type InputRuleEvent = {
  type: 'custom.input rule'
  /**
   * Matches found by the input rule
   */
  matches: Array<InputRuleMatch>
  /**
   * The text before the insertion
   */
  textBefore: string
  /**
   * The text is destined to be inserted
   */
  textInserted: string
  /**
   * The block where the insertion takes place
   */
  focusBlock: {
    path: BlockPath
    node: PortableTextBlock
  }
}

/**
 * @alpha
 */
export declare type InputRuleGuard<TGuardResponse = true> = BehaviorGuard<
  InputRuleEvent,
  TGuardResponse
>

/**
 * Match found in the text after the insertion
 * @alpha
 */
export declare type InputRuleMatch = InputRuleMatchLocation & {
  groupMatches: Array<InputRuleMatchLocation>
}

declare type InputRuleMatchLocation = {
  /**
   * The matched text
   */
  text: string
  /**
   * Estimated selection of where in the original text the match is located.
   * The selection is estimated since the match is found in the text after
   * insertion.
   */
  selection: NonNullable<EditorSelection>
  /**
   * Block offsets of the match in the text after the insertion
   */
  targetOffsets: {
    anchor: BlockOffset
    focus: BlockOffset
    backward: boolean
  }
}

/**
 * Turn an array of `InputRule`s into a Behavior that can be used to apply the
 * rules to the editor.
 *
 * The plugin handles undo/redo out of the box including smart undo with
 * Backspace.
 *
 * @example
 * ```tsx
 * <InputRulePlugin rules={smartQuotesRules} />
 * ```
 *
 * @alpha
 */
export declare function InputRulePlugin(props: InputRulePluginProps): null

declare type InputRulePluginProps = {
  rules: Array<InputRule<any>>
}

/**
 * @alpha
 */
export declare type TextTransformRule<TGuardResponse = true> = {
  on: RegExp
  guard?: InputRuleGuard<TGuardResponse>
  transform: (
    {
      location,
    }: {
      location: InputRuleMatchLocation
    },
    guardResponse: TGuardResponse,
  ) => string
}

export {}
