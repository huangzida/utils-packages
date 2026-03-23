/**
 * 分组数据
 */
export interface TreeGroup {
  /** 显示标签 */
  label: string;
  /** 分组值 */
  value: string | number;
  /** 分组内的项 */
  children?: any[];
}

/**
 * 将分组数据转换为树形结构
 * @template T - 数据类型
 * @param groups - 分组数据数组
 * @param groupKey - 用于分组的字段名（默认 'group'）
 * @param _childrenKey - 子节点字段名（默认 'children'）
 * @returns TreeGroup 数组
 * @example
 * ```typescript
 * const data = [
 *   { name: '苹果', category: '水果' },
 *   { name: '香蕉', category: '水果' },
 *   { name: '白菜', category: '蔬菜' }
 * ];
 * const tree = convertGroupsToTreeData(data, 'category');
 * // tree = [
 * //   { label: '水果', value: '水果', children: [{ name: '苹果', category: '水果' }, { name: '香蕉', category: '水果' }] },
 * //   { label: '蔬菜', value: '蔬菜', children: [{ name: '白菜', category: '蔬菜' }] }
 * // ]
 * ```
 */
export const convertGroupsToTreeData = <T extends Record<string, any>>(
  groups: T[],
  groupKey: keyof T = "group" as keyof T,
  _childrenKey: string = "children",
): TreeGroup[] => {
  const groupMap = new Map<string, TreeGroup>();

  for (const item of groups) {
    const groupName = String(item[groupKey] || "");
    if (!groupMap.has(groupName)) {
      groupMap.set(groupName, {
        label: groupName,
        value: groupName,
        children: [],
      });
    }
    groupMap.get(groupName)!.children!.push(item);
  }

  return Array.from(groupMap.values());
};
