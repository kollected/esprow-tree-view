import { DetailedView } from './DetailedView.tsx'
import { FileUpload } from './FileUpload.tsx'
import { Line } from './Line.tsx'
import { TreeView } from './TreeView.tsx'

export { DetailedView, FileUpload, Line, TreeView }

export type Row = {
  internalID: string
  name: string
  depth: number
  hasChildren: boolean
}