import { FamilyTreeNode as FamilyTreeNodeInterface } from './Data';

export interface TreeNode {
  id: number,
  name: string,
  gender: string,
  children: any,
  parents: any,
  rendered: boolean,
  className: string
}

export interface TreeNodeMap {
  [key: number]: TreeNode
}

export function getTree(list: FamilyTreeNodeInterface[]): {tree: TreeNode[], treeMap: TreeNodeMap} {
  const treeMap: TreeNodeMap = list.reduce((result: TreeNodeMap, treeNode) => {
    result[treeNode.id] = {
      ...treeNode,
      children: [],
      parents: [],
      rendered: false,
      className: treeNode.gender === 'female' ? 'tree__node--pink' : 'tree__node--blue'
    }
    return result;
  }, {});

  const tree: TreeNode[] = [];
  list.forEach(treeNode => {
    if (treeNode.parents.length === 2) {
      const [first, second] = treeNode.parents;
      treeMap[first].children.push({
        ...treeNode,
        parents: [treeMap[first], treeMap[second]]
      });
      treeMap[second].children.push({
        ...treeNode,
        parents: [treeMap[first], treeMap[second]]
      });
    }
    tree.push(treeMap[treeNode.id]);
  });

  return {
    tree,
    treeMap
  };
}