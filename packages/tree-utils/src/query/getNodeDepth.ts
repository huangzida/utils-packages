import { getNodePath } from "./getNodePath";

export const getNodeDepth = <T extends Record<string, any>>(
  treeData: T[],
  targetKey: string | number,
  keyField: string = "key",
  childrenKey: string = "children",
): number => {
  const path = getNodePath(treeData, targetKey, keyField, childrenKey);
  return path ? path.length - 1 : -1;
};
