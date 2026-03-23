import { bench, describe } from 'vitest/bench'
import {
  findNodeByKey,
  flattenTree,
  filterTreeNodes,
  getLeafNodes,
  type TreeNode,
} from '../src/index'

const generateTree = (depth: number, breadth: number): TreeNode[] => {
  const build = (currentDepth: number): TreeNode[] => {
    if (currentDepth >= depth) {
      return []
    }
    return Array.from({ length: breadth }, (_, i) => ({
      key: `${currentDepth}-${i}`,
      title: `Node ${currentDepth}-${i}`,
      children: build(currentDepth + 1),
      isLeaf: currentDepth === depth - 1,
    }))
  }
  return build(0)
}

const smallTree = generateTree(3, 3)
const mediumTree = generateTree(5, 5)
const largeTree = generateTree(6, 6)

describe('findNodeByKey', () => {
  bench('small tree (27 nodes)', () => {
    findNodeByKey(smallTree, '2-1')
  })

  bench('medium tree (781 nodes)', () => {
    findNodeByKey(mediumTree, '4-3')
  })

  bench('large tree (9331 nodes)', () => {
    findNodeByKey(largeTree, '5-4')
  })
})

describe('flattenTree', () => {
  bench('small tree (27 nodes)', () => {
    flattenTree(smallTree)
  })

  bench('medium tree (781 nodes)', () => {
    flattenTree(mediumTree)
  })

  bench('large tree (9331 nodes)', () => {
    flattenTree(largeTree)
  })
})

describe('filterTreeNodes', () => {
  bench('small tree (27 nodes)', () => {
    filterTreeNodes(smallTree, (n) => n.key?.includes('1'))
  })

  bench('medium tree (781 nodes)', () => {
    filterTreeNodes(mediumTree, (n) => n.key?.includes('2'))
  })

  bench('large tree (9331 nodes)', () => {
    filterTreeNodes(largeTree, (n) => n.key?.includes('3'))
  })
})

describe('getLeafNodes', () => {
  bench('small tree (27 nodes)', () => {
    getLeafNodes(smallTree)
  })

  bench('medium tree (781 nodes)', () => {
    getLeafNodes(mediumTree)
  })

  bench('large tree (9331 nodes)', () => {
    getLeafNodes(largeTree)
  })
})
