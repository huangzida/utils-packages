export const getLcShapeElement = (shape_id: string): Element | null => {
  return document.querySelector(`.lc-shape[shape-id="${shape_id}"]`)
}
