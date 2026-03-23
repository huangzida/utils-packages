import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  getLeafNodes,
  findNodeByKey,
  findNodeById,
  findNodeByMatcher,
  findParentOf,
  nodeExistsInTree,
  collectLeafValuesByKey,
  flattenTree,
  filterTreeNodes,
  filterCheckedLeafKeys,
  deleteNode,
  TreeNode,
  findNode,
  findNodeInTree,
  findNodeAndCollectLeafValues,
  findTreeNode,
} from '../src/index'

const mockTree: TreeNode[] = [
  {
    key: '1',
    title: 'Root',
    children: [
      { key: '1-1', title: 'Child 1', isLeaf: true },
      { key: '1-2', title: 'Child 2', isLeaf: true },
    ],
  },
  {
    key: '2',
    title: 'Root 2',
    children: [
      {
        key: '2-1',
        title: 'Parent',
        children: [{ key: '2-1-1', title: 'Grandchild', isLeaf: true }],
      },
    ],
  },
]

describe('@zid-utils/tree-utils', () => {
  describe('getLeafNodes', () => {
    it('should return all leaf nodes', () => {
      const leaves = getLeafNodes(mockTree)
      expect(leaves).toHaveLength(3)
      expect(leaves.some((n) => n.key === '1-1')).toBe(true)
      expect(leaves.some((n) => n.key === '2-1-1')).toBe(true)
    })

    it('should return empty array for empty tree', () => {
      const leaves = getLeafNodes([])
      expect(leaves).toHaveLength(0)
    })
  })

  describe('findNodeByKey', () => {
    it('should find node by key', () => {
      const node = findNodeByKey(mockTree, '1-1')
      expect(node).not.toBeNull()
      expect(node?.title).toBe('Child 1')
    })

    it('should return null for non-existent key', () => {
      const node = findNodeByKey(mockTree, 'non-existent')
      expect(node).toBeNull()
    })

    it('should find node in nested children', () => {
      const node = findNodeByKey(mockTree, '2-1-1')
      expect(node).not.toBeNull()
      expect(node?.title).toBe('Grandchild')
    })
  })

  describe('findNodeById (alias: findNode)', () => {
    const treeWithId = [
      { id: 'id-1', title: 'Node 1' },
      { id: 'id-2', title: 'Node 2', children: [{ id: 'id-2-1', title: 'Child' }] },
    ] as any[]

    it('should find node by id', () => {
      const node = findNodeById(treeWithId, 'id-1')
      expect(node).not.toBeNull()
      expect(node?.title).toBe('Node 1')
    })

    it('should find node by id in nested children', () => {
      const node = findNodeById(treeWithId, 'id-2-1')
      expect(node).not.toBeNull()
      expect(node?.title).toBe('Child')
    })

    it('should return null for non-existent id', () => {
      const node = findNodeById(treeWithId, 'non-existent')
      expect(node).toBeNull()
    })

    it('should support legacy findNode alias', () => {
      const node = findNode(treeWithId, 'id-2')
      expect(node).not.toBeNull()
      expect(node?.title).toBe('Node 2')
    })
  })

  describe('findNodeByMatcher', () => {
    it('should find node matching condition', () => {
      const node = findNodeByMatcher(mockTree, (n) => n.key === '2-1')
      expect(node).not.toBeNull()
      expect(node?.title).toBe('Parent')
    })

    it('should return null when no match', () => {
      const node = findNodeByMatcher(mockTree, (n) => n.key === 'non-existent')
      expect(node).toBeNull()
    })

    it('should support custom children key', () => {
      const tree = [{ id: '1', items: [{ id: '1-1' }] }] as any[]
      const node = findNodeByMatcher(tree, (n) => n.id === '1-1', 'items')
      expect(node).not.toBeNull()
    })
  })

  describe('findParentOf (alias: findTreeNode)', () => {
    it('should find parent of target node', () => {
      const parent = findParentOf(mockTree, '1-1')
      expect(parent).not.toBeNull()
      expect(parent?.key).toBe('1')
    })

    it('should find parent in nested tree', () => {
      const parent = findParentOf(mockTree, '2-1-1')
      expect(parent).not.toBeNull()
      expect(parent?.key).toBe('2-1')
    })

    it('should return null for root nodes', () => {
      const parent = findParentOf(mockTree, '1')
      expect(parent).toBeNull()
    })

    it('should support legacy findTreeNode alias', () => {
      const parent = findTreeNode(mockTree, '1-2')
      expect(parent).not.toBeNull()
      expect(parent?.key).toBe('1')
    })
  })

  describe('nodeExistsInTree (alias: findNodeInTree)', () => {
    const tree = [
      { title: 'Node 1', value: 'value-1' },
      { title: 'Node 2', children: [{ title: 'Child' }] },
    ] as any[]

    it('should return true when node exists by value', () => {
      expect(nodeExistsInTree(tree, 'value-1')).toBe(true)
    })

    it('should return true when node exists by title', () => {
      expect(nodeExistsInTree(tree, 'Node 1')).toBe(true)
    })

    it('should return true for nested node', () => {
      expect(nodeExistsInTree(tree, 'Child')).toBe(true)
    })

    it('should return false when node does not exist', () => {
      expect(nodeExistsInTree(tree, 'Non-existent')).toBe(false)
    })

    it('should support legacy findNodeInTree alias', () => {
      expect(findNodeInTree(tree, 'Node 2')).toBe(true)
    })
  })

  describe('collectLeafValuesByKey (alias: findNodeAndCollectLeafValues)', () => {
    const tree = [
      {
        value: 'parent-1',
        children: [
          { value: 'child-1', isLeaf: true },
          { value: 'child-2', isLeaf: true },
        ],
      },
    ] as any[]

    it('should collect leaf values', () => {
      const values = collectLeafValuesByKey(tree, 'parent-1')
      expect(values).toEqual(['child-1', 'child-2'])
    })

    it('should return null for leaf node', () => {
      const values = collectLeafValuesByKey(tree, 'child-1')
      expect(values).toBeNull()
    })

    it('should return null for non-existent value', () => {
      const values = collectLeafValuesByKey(tree, 'non-existent')
      expect(values).toBeNull()
    })

    it('should support legacy alias', () => {
      const values = findNodeAndCollectLeafValues(tree, 'parent-1')
      expect(values).toEqual(['child-1', 'child-2'])
    })
  })

  describe('flattenTree', () => {
    it('should flatten tree into array', () => {
      const flat = flattenTree(mockTree)
      expect(flat).toHaveLength(6)
    })

    it('should filter nodes', () => {
      const flat = flattenTree(mockTree, (n) => n.isLeaf === true)
      expect(flat).toHaveLength(3)
    })
  })

  describe('filterTreeNodes', () => {
    it('should filter nodes by callback', () => {
      const filtered = filterTreeNodes(mockTree, (n) => n.key !== '1-1')
      expect(filtered[0].children).toHaveLength(1)
    })
  })

  describe('filterCheckedLeafKeys', () => {
    const tree = [
      {
        key: '1',
        checked: true,
        children: [{ key: '1-1', checked: true, isLeaf: true }],
      },
      { key: '2', checked: false },
    ] as any[]

    it('should return checked leaf keys', () => {
      const keys = filterCheckedLeafKeys(tree)
      expect(keys).toContain('1-1')
      expect(keys).toHaveLength(1)
    })

    it('should skip unchecked nodes', () => {
      const keys = filterCheckedLeafKeys([
        { key: '1', checked: false, isLeaf: true },
      ])
      expect(keys).toHaveLength(0)
    })
  })

  describe('deleteNode', () => {
    it('should delete node by key', () => {
      const result = deleteNode(mockTree, '1-1')
      expect(result[0].children).toHaveLength(1)
    })

    it('should return original array for non-existent key', () => {
      const result = deleteNode(mockTree, 'non-existent')
      expect(result).toEqual(mockTree)
    })
  })
})
