import React from 'react';
import { FamilyTreeNode as FamilyTreeNodeInterface } from './Data';
import FamilyTreeNode from './FamilyTreeNode';
import { getTree } from './GetTree';

interface Props {
  data: FamilyTreeNodeInterface[],
}

function FamilyTree({ data }: Props): JSX.Element {
  const { tree, treeMap } = getTree(data);
  return (
    <div>
      <FamilyTreeNode 
        data={tree}
        treeMap={{...treeMap}}
      />
    </div>
  );
}

export default FamilyTree;

