export type {
  TreeNode,
  TreeNodeInfo,
  FindOptions,
  Logger,
  TreeUtilsConfig,
} from './types'

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

export const getLeafNodes = (
  treeData: Record<string, any>[],
  isLeafKey: string = 'isLeaf',
): Record<string, any>[] => {
  function collectLeafNodes(
    nodes: Record<string, any>[],
  ): Record<string, any>[] {
    let leafNodes: Record<string, any>[] = []

    for (let node of nodes) {
      if (node[isLeafKey] === true) {
        leafNodes.push(node)
      } else if (node.children) {
        leafNodes = leafNodes.concat(collectLeafNodes(node.children))
      }
    }

    return leafNodes
  }

  return collectLeafNodes(treeData)
}

export const filterTreeNodesOnline = (
  nodes: Record<string, any>[],
  infoName: string = 'info',
): Record<string, any>[] => {
  return nodes.reduce((acc: Record<string, any>[], node) => {
    if (!node[infoName]?.online || node[infoName].online === 'y') {
      const filteredChildren = node.children
        ? filterTreeNodesOnline(node.children, infoName)
        : []
      if (filteredChildren.length > 0 || !node.children) {
        acc.push({ ...node, children: filteredChildren })
      }
    }

    return acc
  }, [])
}

export const filterTreeNodes = (
  nodes: Record<string, any>[],
  callback: (node: Record<string, any>) => boolean,
  isOnlyFilterChildren: boolean = true,
): Record<string, any>[] => {
  const filterChildren = (
    children: Record<string, any>[] | undefined,
  ): Record<string, any>[] => {
    if (children && children.length > 0) {
      return children.filter(callback).map((child) => {
        return {
          ...child,
          children: filterChildren(child.children),
        }
      })
    }
    return []
  }

  const rootNodes = isOnlyFilterChildren ? nodes : nodes.filter(callback)

  return rootNodes.map((node) => ({
    ...node,
    children: filterChildren(node.children),
  }))
}

export const findNodeByKey = (
  treeData: TreeNode[],
  key: string | number,
): TreeNode | null => {
  for (let i = 0; i < treeData.length; i++) {
    const node = treeData[i]
    if (node.key === key) {
      return node
    }
    if (node.children) {
      const foundNode = findNodeByKey(node.children, key)
      if (foundNode) {
        return foundNode
      }
    }
  }
  return null
}

export const searchInTree = (
  tree: TreeNode[],
  searchValue: string,
): TreeNode[] => {
  function searchRecursive(
    node: TreeNode,
    searchText: string,
    result: TreeNode[],
  ): void {
    const title = node.title?.toString().toLowerCase() || ''
    const text = searchText.toLowerCase()
    const arr = text.split('')
    if (node.isLeaf && arr.every((item) => title.includes(item))) {
      if (!result.some((item) => item.key === node.key)) {
        result.push(node)
      }
    }

    if (node.children) {
      for (const child of node.children) {
        searchRecursive(child, text, result)
      }
    }
  }

  const result: TreeNode[] = []

  for (const rootNode of tree) {
    searchRecursive(rootNode, searchValue.toLowerCase(), result)
  }

  return result
}

export const updateKeys = (sourceNode: TreeNode, targetNode: TreeNode) => {
  sourceNode.key = `${targetNode.key}-${targetNode.children?.length}`
  if (sourceNode.children) {
    sourceNode.children.forEach((item, index) => {
      item.key = `${sourceNode.key}-${index}`
    })
  }
}

export const sortNodesByOnline = (
  nodes: Record<string, any>[],
  infoName: string = 'info',
  sortById = true,
) => {
  nodes.forEach((node) => {
    if (node.children?.length) {
      sortNodesByOnline(node.children, infoName)

      node.children.forEach((child: any) => {
        if (child[infoName]) {
          child.isLeaf = true
          child.disabled = child[infoName].online !== 'y'
        }
      })

      node.children.sort((a: any, b: any) => {
        if (!a.isLeaf || !b.isLeaf) {
          return 0
        }
        if (a[infoName].online === b[infoName].online) {
          return sortById ? a[infoName].id.localeCompare(b[infoName].id) : 0
        }
        return a[infoName].online === 'y' ? -1 : 1
      })

      const getAllDescendantStats = (
        children: any[],
      ): { online: number; total: number } => {
        let totalOnline = 0
        let totalCount = 0

        children.forEach((child: any) => {
          if (child.isLeaf) {
            totalCount++
            if (child[infoName]?.online === 'y') {
              totalOnline++
            }
          } else if (child.children?.length) {
            const childStats = getAllDescendantStats(child.children)
            totalOnline += childStats.online
            totalCount += childStats.total
          }
        })

        return { online: totalOnline, total: totalCount }
      }

      const stats = getAllDescendantStats(node.children)
      node.online = stats.online
      node.total = stats.total
      node.offline = node.total - node.online
      node.selectable = false
    }
  })
}

export const sortNodesById = (
  nodes: Record<string, any>[],
  infoName: string = 'info',
) => {
  nodes.forEach((node) => {
    if (node.children?.length) {
      sortNodesById(node.children, infoName)

      node.children.forEach((child: any) => {
        if (child[infoName]) {
          child.isLeaf = true
        }
      })

      node.children.sort((a: any, b: any) => {
        if (!a.isLeaf || !b.isLeaf) {
          return 0
        }
        return a.key.localeCompare(b.key)
      })

      node.total = node.children.filter((item: any) => item.isLeaf).length
      node.online = node.total
      node.selectable = false
    }
  })
}

export const moveNodeInTree = (
  treeData: any[] | { key: string; children?: any[] },
  sourceKey: string,
  targetKey: string,
): void => {
  function findNode(nodes: any[] | undefined, key: string): any | null {
    if (!nodes) return null
    for (let node of nodes) {
      if (node.key === key) return node
      if (node.children) {
        const found = findNode(node.children, key)
        if (found) return found
      }
    }
    return null
  }

  function getParentNode(nodes: any[], node: any): any | null {
    for (let parent of nodes) {
      if (parent.children && parent.children.includes(node)) {
        return parent
      }
      const result = getParentNode(parent.children || [], node)
      if (result) return result
    }
    return null
  }

  const sourceNode = findNode(
    Array.isArray(treeData) ? treeData : [treeData],
    sourceKey,
  )
  const targetNode = findNode(
    Array.isArray(treeData) ? treeData : [treeData],
    targetKey,
  )

  if (!sourceNode || !targetNode) {
    console.error('源节点或目标节点不存在')
    return
  }

  if (sourceNode.children && sourceNode.children.length > 0) {
    console.error('源节点不是叶子节点，无法直接移动')
    return
  }

  const sourceParent = getParentNode(
    Array.isArray(treeData) ? treeData : [treeData],
    sourceNode,
  )
  if (sourceParent) {
    const index = sourceParent.children!.findIndex(
      (child: any) => child.key === sourceKey,
    )
    if (index !== -1) {
      sourceParent.children!.splice(index, 1)
    }
  }

  targetNode.children = targetNode.children || []
  targetNode.children.push(sourceNode)
}

export const cloneNode = (sourceNode: TreeNode, targetNode: TreeNode) => {
  const clonedNode = { ...sourceNode }
  if (targetNode.children) {
    targetNode.children.push(clonedNode)
  } else {
    targetNode.children = [clonedNode]
  }
}

export const copyNode = (
  treeData: TreeNode[],
  key: string | number,
  targetKey: string | number,
): TreeNode[] => {
  const sourceNode = structuredClone(findNodeByKey(treeData, key))
  const targetNode = findNodeByKey(treeData, targetKey)

  if (sourceNode && targetNode) {
    sourceNode.title += '-副本'
    updateKeys(sourceNode, targetNode)
    cloneNode(sourceNode, targetNode)
    return [...treeData]
  }

  return treeData
}

export const updateNodeTitleByKey = (
  tree: TreeNode[],
  targetKey: string,
  newTitle: string,
): void => {
  for (const node of tree) {
    if (node.key === targetKey) {
      node.title = newTitle
      return
    }

    if (node.children) {
      updateNodeTitleByKey(node.children, targetKey, newTitle)
    }
  }
}

export const deleteNode = (
  treeData: TreeNode[],
  key: string | number,
): TreeNode[] => {
  const delNode = (data: TreeNode[]): TreeNode[] => {
    return data.filter((node) => {
      if (node.key === key) {
        return false
      }
      if (node.children) {
        node.children = delNode(node.children)
      }
      return true
    })
  }

  return delNode([...treeData])
}

export const flattenTree = <T extends { children?: T[] }>(
  tree: T[],
  filter: (node: T) => boolean = () => true,
): T[] => {
  const result: T[] = []

  const flatten = (node: T) => {
    if (filter(node)) {
      result.push(node)
    }
    if (node.children) {
      node.children.forEach(flatten)
    }
  }

  tree.forEach(flatten)
  return result
}

export const addLeafProperties = <T extends { children?: T[] }>(
  treeData: T[],
): T[] => {
  return treeData.map((node) => {
    const isLeaf = !node.children || node.children.length === 0
    return {
      ...node,
      isLeaf,
      disabled: !isLeaf,
      children: node.children ? addLeafProperties(node.children) : undefined,
    }
  })
}

export const findNodeById = (nodes: any[], id: string): any => {
  for (let node of nodes) {
    if (node.id === id) return node
    if (node.children && node.children.length) {
      const found = findNodeById(node.children, id)
      if (found) return found
    }
  }
  return null
}

export const filterCheckedLeafKeys = (treeData: any[]): string[] => {
  const result: string[] = []

  const traverse = (nodes: any[]) => {
    if (!nodes || nodes.length === 0) return

    for (const node of nodes) {
      if (node.checked === false) continue

      if (node.children && node.children.length > 0) {
        traverse(node.children)
      } else if (node.checked === true) {
        result.push(node.key)
      }
    }
  }

  traverse(treeData)
  return result
}

export const nodeExistsInTree = (
  nodes: any[],
  searchValue: string,
): boolean => {
  return nodes.some((node) => {
    if (node.value === searchValue || node.title === searchValue) {
      return true
    }
    if (node.children && Array.isArray(node.children)) {
      return nodeExistsInTree(node.children, searchValue)
    }
    return false
  })
}

export const collectLeafValuesByKey = (
  nodes: any[],
  targetValue: string,
  isLeafKey: string = 'isLeaf',
): string[] | null => {
  for (const node of nodes) {
    if (node.value === targetValue) {
      if (
        node.children &&
        Array.isArray(node.children) &&
        node.children.length > 0
      ) {
        const leafNodes = getLeafNodes([node], isLeafKey)
        return leafNodes.map((leaf) => leaf.value)
      }
      return null
    }

    if (node.children && Array.isArray(node.children)) {
      const result = collectLeafValuesByKey(
        node.children,
        targetValue,
        isLeafKey,
      )
      if (result !== null) {
        return result
      }
    }
  }

  return null
}

export const transformTreeKeys = (
  treeData: Record<string, any>[],
  keyMapping: Record<string, string>,
  childrenKey: string = 'children',
): Record<string, any>[] => {
  if (!Array.isArray(treeData)) {
    console.warn('transformTreeKeys: treeData must be an array')
    return []
  }

  const transformNode = (node: Record<string, any>): Record<string, any> => {
    if (!node || typeof node !== 'object') {
      return node
    }

    const transformedNode: Record<string, any> = {}

    Object.keys(node).forEach((key) => {
      const value = node[key]

      const newKey = keyMapping[key] || key

      if (key === childrenKey && Array.isArray(value)) {
        transformedNode[newKey] = transformTreeKeys(
          value,
          keyMapping,
          childrenKey,
        )
      } else {
        transformedNode[newKey] = value
      }
    })

    return transformedNode
  }

  return treeData.map(transformNode)
}

export const transformTreeNodes = (
  treeData: Record<string, any>[],
  transformer: (node: Record<string, any>) => Record<string, any>,
  childrenKey: string = 'children',
): Record<string, any>[] => {
  if (!Array.isArray(treeData)) {
    console.warn('transformTreeNodes: treeData must be an array')
    return []
  }

  const transformNode = (node: Record<string, any>): Record<string, any> => {
    if (!node || typeof node !== 'object') {
      return node
    }

    const children = node[childrenKey]
    const nodeWithTransformedChildren = {
      ...node,
      ...(Array.isArray(children) && {
        [childrenKey]: transformTreeNodes(children, transformer, childrenKey),
      }),
    }

    return transformer(nodeWithTransformedChildren)
  }

  return treeData.map(transformNode)
}

export const findParentOf = (nodes: any[], targetKey: string): any => {
  for (const node of nodes) {
    if (node.children?.some((child: any) => child.key === targetKey)) {
      return node
    }
    if (node.children) {
      const found = findParentOf(node.children, targetKey)
      if (found) return found
    }
  }
  return null
}

export const findNodeByMatcher = (
  nodes: any[],
  matcher: (node: any) => boolean,
  childrenKey: string = 'children',
): any | null => {
  for (const node of nodes) {
    if (matcher(node)) {
      return node
    }
    if (node[childrenKey]) {
      const found = findNodeByMatcher(node[childrenKey], matcher, childrenKey)
      if (found) {
        return found
      }
    }
  }
  return null
}

export const updateNodeByMatcher = <T extends Record<string, any>>(
  nodes: T[],
  matcher: (node: T) => boolean,
  updater: (node: T) => T,
  childrenKey: string = 'children',
): T[] => {
  return nodes.map((node) => {
    if (matcher(node)) {
      return updater(node)
    }

    if (node[childrenKey] && node[childrenKey].length > 0) {
      const newChildren = updateNodeByMatcher(
        node[childrenKey] as T[],
        matcher,
        updater,
        childrenKey,
      )

      if (newChildren !== node[childrenKey]) {
        return {
          ...node,
          [childrenKey]: newChildren,
        } as T
      }
    }

    return node
  })
}

export {
  findNodeById as findNode,
  nodeExistsInTree as findNodeInTree,
  collectLeafValuesByKey as findNodeAndCollectLeafValues,
  findParentOf as findTreeNode,
}
