/**
 * 更新网格中的元素
 * @param grid - 二维网格数组
 * @param matcher - 元素匹配函数
 * @param updater - 元素更新函数
 * @returns 更新后的网格
 */
export const updateGridElement = <T extends Record<string, any>>(
  grid: T[][],
  matcher: (element: T) => boolean,
  updater: (element: T) => T,
): T[][] => {
  let isGridUpdated = false

  const newGrid = grid.map((row) => {
    let isRowUpdated = false

    const newRow = row.map((element) => {
      if (matcher(element)) {
        isGridUpdated = true
        isRowUpdated = true
        return updater(element)
      }
      return element
    })

    if (isRowUpdated) {
      return newRow
    }
    return row
  })

  if (isGridUpdated) {
    return newGrid
  }
  return grid
}
