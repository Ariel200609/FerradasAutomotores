import type {EditorContext} from '@portabletext/editor'

/**
 * @public
 */
export declare function CharacterPairDecoratorPlugin(props: {
  decorator: ({
    context,
    schema,
  }: {
    context: Pick<EditorContext, 'schema'>
    /**
     * @deprecated Use `context.schema` instead
     */
    schema: EditorContext['schema']
  }) => string | undefined
  pair: {
    char: string
    amount: number
  }
}): null

export {}
