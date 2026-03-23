import { describe, it, expect } from 'vitest'
import {
  getLeafNodes,
  findNodeByKey,
  flattenTree,
  filterTreeNodes,
  TreeNode,
} from '../src/index'

describe('@zid-utils/tree-utils', () => {
  const mockTree: TreeNode[] = [
    {
      key: '1',
      title: 'Node 1',
      children: [
        { key: '1-1', title: 'Node 1-1', isLeaf: true },
        { key: '1-2', title: 'Node 1-2', children: [{ key: '1-2-1', title: 'Node 1-2-1', isLeaf: true }] },
      ],
    },
    { key: '2', title: 'Node 2', isLeaf: true },
  ]

  describe('getLeafNodes', () => {
    it('should return all leaf nodes', () => {
      const leaves = getLeafNodes(mockTree)
      expect(leaves.length).toBe(3)
    })
  })

  describe('findNodeByKey', () => {
    it('should find node by key', () => {
      const node = findNodeByKey(mockTree, '1-2-1')
      expect(node).toBeDefined()
      expect(node?.title).toBe('Node 1-2-1')
    })
    it('should return null if not found', () => {
      const node = findNodeByKey(mockTree, 'not-exist')
      expect(node).toBeNull()
    })
  })

  describe('flattenTree', () => {
    it('should flatten tree to array', () => {
      const flat = flattenTree(mockTree)
      expect(flat.length).toBe(5)
    })
    it('should filter nodes', () => {
      const flat = flattenTree(mockTree, (node) => node.isLeaf === true)
      expect(flat.length).toBe(3)
    })
  })

  describe('filterTreeNodes', () => {
    it('should filter children only by default', () => {
      const filtered = filterTreeNodes(mockTree, (node) => node.key === '2')
      expect(filtered.length).toBe(2)
    })
  })
})
