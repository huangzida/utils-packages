// 统一导出入口

// 类型导出
export type {
  TreeNode,
  TreeNodeInfo,
  FindOptions,
  Logger,
  TreeUtilsConfig,
} from "./types";

// traverse 模块
export { default as foreach } from "./traverse/foreach";
export { default as toArray } from "./traverse/toArray";

// query 模块
export { default as find } from "./query/find";
export { default as some } from "./query/some";
export { getLeafNodes } from "./query/getLeafNodes";
export { findNodeByKey } from "./query/findNodeByKey";
export { findNodeById } from "./query/findNodeById";
export { findNodeByMatcher } from "./query/findNodeByMatcher";
export { nodeExistsInTree } from "./query/nodeExistsInTree";
export { findParentOf } from "./query/findParentOf";
export { getNodePath } from "./query/getNodePath";
export { getNodeDepth } from "./query/getNodeDepth";
export { getNodeBreadcrumb } from "./query/getNodeBreadcrumb";
export { getTreeStats } from "./query/getTreeStats";

// modify 模块
export { updateKeys } from "./modify/updateKeys";
export { updateNodeTitleByKey } from "./modify/updateNodeTitleByKey";
export { updateNodeByMatcher } from "./modify/updateNodeByMatcher";
export { moveNodeInTree } from "./modify/moveNodeInTree";
export { cloneNode } from "./modify/cloneNode";
export { copyNode } from "./modify/copyNode";
export { deleteNode } from "./modify/deleteNode";
export { addLeafProperties } from "./modify/addLeafProperties";

// transform 模块
export { default as map } from "./transform/map";
export { default as filter } from "./transform/filter";
export { transformTreeKeys } from "./transform/transformTreeKeys";
export { transformTreeNodes } from "./transform/transformTreeNodes";
export { searchInTree } from "./transform/searchInTree";

// build 模块
export { default as fromArray } from "./build/fromArray";

// utils 模块
export { findFirstLeaf } from "./utils/findFirstLeaf";
export { traverseTreeValues } from "./utils/traverseTreeValues";
export { filterCheckedLeafKeys } from "./utils/filterCheckedLeafKeys";
export { collectLeafValuesByKey } from "./utils/collectLeafValuesByKey";
export { convertGroupsToTreeData } from "./utils/convertGroupsToTreeData";

// path 模块
export { getKeyPathParts } from "./path/getKeyPathParts";
export { joinKeyPath } from "./path/joinKeyPath";
export { getParentKeyPath } from "./path/getParentKeyPath";
export { getKeyPathDepth } from "./path/getKeyPathDepth";
export { autoGenerateKeyPath } from "./path/autoGenerateKeyPath";
export { buildKeyPathMap } from "./path/buildKeyPathMap";

// keyPath 查询
export { findByKeyPath } from "./query/findByKeyPath";
export { hasKeyPath } from "./query/hasKeyPath";
