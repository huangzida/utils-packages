import { getNodePath } from "./getNodePath";

export const getNodeBreadcrumb = <T extends Record<string, any>>(
  treeData: T[],
  targetKey: string | number,
  keyField: string = "key",
  childrenKey: string = "children",
): T[] => {
  const path = getNodePath(treeData, targetKey, keyField, childrenKey);
  return path ? path.map((p) => p.node) : [];
};
