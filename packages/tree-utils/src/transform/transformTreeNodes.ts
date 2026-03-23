import type { Logger } from "../types";

const defaultLogger: Logger = {
  warn: (msg: string) => console.warn("[tree-utils]", msg),
  error: (msg: string) => console.error("[tree-utils]", msg),
};

export const transformTreeNodes = (
  treeData: Record<string, any>[],
  transformer: (node: Record<string, any>) => Record<string, any>,
  childrenKey: string = "children",
  logger: Logger = defaultLogger,
): Record<string, any>[] => {
  if (!Array.isArray(treeData)) {
    logger.warn?.("transformTreeNodes: treeData must be an array");
    return [];
  }

  const transformNode = (node: Record<string, any>): Record<string, any> => {
    if (!node || typeof node !== "object") {
      return node;
    }

    const children = node[childrenKey];
    const nodeWithTransformedChildren = {
      ...node,
      ...(Array.isArray(children) && {
        [childrenKey]: transformTreeNodes(
          children,
          transformer,
          childrenKey,
          logger,
        ),
      }),
    };

    return transformer(nodeWithTransformedChildren);
  };

  return treeData.map(transformNode);
};
