export interface TreeNode {
  key?: string | number
  title?: string | number
  children?: TreeNode[]
  isLeaf?: boolean
  disabled?: boolean
  selectable?: boolean
  checked?: boolean
  [key: string]: any
}

export interface TreeNodeInfo {
  id?: string
  online?: string
}

export interface FindOptions {
  childrenKey?: string
  strict?: boolean
}

export interface Logger {
  warn?: (message: string) => void
  error?: (message: string) => void
}

export interface TreeUtilsConfig {
  logger?: Logger
}
