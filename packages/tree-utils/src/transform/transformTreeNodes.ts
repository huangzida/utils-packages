import type { Logger } from "../types";

const defaultLogger: Logger = {
  warn: (msg: string) => console.warn("[tree-utils]", msg),
  error: (msg: string) => console.error("[tree-utils]", msg),
};

/**
 * 转换树节点数据（通过自定义函数）
 * @param treeData - 树形数据数组
 * @param transformer - 转换函数，接收节点返回新节点
 * @param childrenKey - 子节点字段名（默认 'children'）
 * @param logger - 日志记录器（可选）
 * @returns 转换后的新树数据
 * @example
 * ```typescript
 * const tree = [{ title: 'Node', children: [] }];
 * const result = transformTreeNodes(tree, (node) => ({
 *   ...node,
 *   active: true
 * }));
 * // result = [{ title: 'Node', active: true, children: [] }]
 * ```
 */
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
