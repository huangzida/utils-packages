export interface TreeGroup {
  label: string;
  value: string | number;
  children?: any[];
}

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
