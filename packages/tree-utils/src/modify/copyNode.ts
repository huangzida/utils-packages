import type { TreeNode } from "../types";
import { findNodeByKey } from "../query/findNodeByKey";
import { updateKeys } from "./updateKeys";
import { cloneNode } from "./cloneNode";

export const copyNode = (
  treeData: TreeNode[],
  key: string | number,
  targetKey: string | number,
): TreeNode[] => {
  const sourceNode = structuredClone(findNodeByKey(treeData, key));
  const targetNode = findNodeByKey(treeData, targetKey);

  if (sourceNode && targetNode) {
    sourceNode.title += "-副本";
    updateKeys(sourceNode, targetNode);
    cloneNode(sourceNode, targetNode);
    return [...treeData];
  }

  return treeData;
};
