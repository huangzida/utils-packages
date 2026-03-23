import type { Logger } from "../types";

const defaultLogger: Logger = {
  warn: (msg: string) => console.warn("[tree-utils]", msg),
  error: (msg: string) => console.error("[tree-utils]", msg),
};

/**
 * 转换树节点的键名
 * @param treeData - 树形数据数组
 * @param keyMapping - 键映射规则，例如 { title: 'label', key: 'id' }
 * @param childrenKey - 子节点字段名（默认 'children'）
 * @param logger - 日志记录器（可选）
 * @returns 转换后的新树数据
 * @example
 * ```typescript
 * const tree = [{ title: 'Node', key: '1', children: [] }];
 * const result = transformTreeKeys(tree, { title: 'label', key: 'id' });
 * // result = [{ label: 'Node', id: '1', children: [] }]
 * ```
 */
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
