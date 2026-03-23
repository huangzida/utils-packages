import { getLeafNodes } from "../query/getLeafNodes";

export const collectLeafValuesByKey = (
  nodes: any[],
  targetValue: string,
  isLeafKey: string = "isLeaf",
): string[] | null => {
  for (const node of nodes) {
    if (node.value === targetValue) {
      if (
        node.children &&
        Array.isArray(node.children) &&
        node.children.length > 0
      ) {
        const leafNodes = getLeafNodes([node], isLeafKey);
        return leafNodes.map((leaf) => leaf.value);
      }
      return null;
    }

    if (node.children && Array.isArray(node.children)) {
      const result = collectLeafValuesByKey(
        node.children,
        targetValue,
        isLeafKey,
      );
      if (result !== null) {
        return result;
      }
    }
  }

  return null;
};
