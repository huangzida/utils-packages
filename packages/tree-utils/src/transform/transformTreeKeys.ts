import type { Logger } from "../types";

const defaultLogger: Logger = {
  warn: (msg: string) => console.warn("[tree-utils]", msg),
  error: (msg: string) => console.error("[tree-utils]", msg),
};

export const transformTreeKeys = (
  treeData: Record<string, any>[],
  keyMapping: Record<string, string>,
  childrenKey: string = "children",
  logger: Logger = defaultLogger,
): Record<string, any>[] => {
  if (!Array.isArray(treeData)) {
    logger.warn?.("transformTreeKeys: treeData must be an array");
    return [];
  }

  const transformNode = (node: Record<string, any>): Record<string, any> => {
    if (!node || typeof node !== "object") {
      return node;
    }

    const transformedNode: Record<string, any> = {};

    Object.keys(node).forEach((key) => {
      const value = node[key];
      const newKey = keyMapping[key] || key;

      if (key === childrenKey && Array.isArray(value)) {
        transformedNode[newKey] = transformTreeKeys(
          value,
          keyMapping,
          childrenKey,
          logger,
        );
      } else {
        transformedNode[newKey] = value;
      }
    });

    return transformedNode;
  };

  return treeData.map(transformNode);
};
