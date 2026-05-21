import {SanityClient} from '@sanity/client'

declare interface AssetDocument extends SanityDocument {
  _type: 'sanity.fileAsset' | 'sanity.imageAsset'
  metadata?: Record<string, unknown>
  mimeType?: string
  originalFilename?: string
  path?: string
  sha1hash?: string
  size?: number
  url?: string
}

declare interface AssetMap {
  [url: string]: AssetDocument
}

declare interface ImportOptions {
  allowAssetsInDifferentDataset: boolean
  allowSystemDocuments: boolean
  client: SanityClient
  onProgress: (event: ProgressEvent) => void
  operation: 'create' | 'createIfNotExists' | 'createOrReplace'
  releasesOperation: 'fail' | 'ignore' | 'replace'
  replaceAssets: boolean
  skipCrossDatasetReferences: boolean
  tag: string
  allowFailingAssets?: boolean
  allowReplacementCharacters?: boolean
  assetConcurrency?: number
  assetMap?: AssetMap
  assetsBase?: string
  assetVerificationConcurrency?: number
  deleteOnComplete?: boolean
  targetDataset?: string
  targetProjectId?: string
  unreferencedAssets?: string[]
}

declare interface ImportResult {
  numDocs: number
  warnings: Array<{
    message: string
  }>
}

declare type ImportSource = NodeJS.ReadableStream | SanityDocument[] | string

declare interface ProgressEvent {
  step: string
  current?: number
  total?: number
  update?: string
}

declare interface SanityDocument {
  [key: string]: unknown
  _id: string
  _type: string
  _createdAt?: string
  _rev?: string
  _updatedAt?: string
}

export declare function sanityImport(
  input: ImportSource,
  opts: Partial<ImportOptions>,
): Promise<ImportResult>

export {}
