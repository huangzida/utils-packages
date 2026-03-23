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
