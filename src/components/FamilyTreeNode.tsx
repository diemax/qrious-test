import React from 'react';
import { FamilyTreeNode as FamilyTreeNodeInterface } from './Data';
import { TreeNode, TreeNodeMap } from './GetTree';

interface Props {
  data: TreeNode[],
  treeMap: TreeNodeMap
}

function FamilyTreeNode({ data, treeMap }: Props): JSX.Element {

  return (
    <div className="app__root">
      {data.map((currentNode, idx) => {
        if (treeMap[currentNode.id].rendered === true) {
          return null;
        }
        let partner = null;
        if (currentNode.children.length > 0) {
          [partner] = currentNode.children[0].parents.filter((parent: FamilyTreeNodeInterface ) => {
            return parent.id !== currentNode.id
          });
        }
        if (partner && !partner.rendered) {
          treeMap[partner.id].rendered = true;
          let style: undefined | React.CSSProperties = undefined;
          if (idx === 0) {
            style = {
              alignItems: 'center'
            }
          }
          return (
            <div key={currentNode.id}>
              <div className="tree__node--parents" key={currentNode.id} style={style}>
                <div className={`tree__node ${currentNode.className}`}>
                  {currentNode.name}
                </div>
                <div className={`tree__node ${partner.className}`}>
                  {partner.name}
                </div>
              </div>
              <div className="tree__node__children">
                {currentNode.children.map((child: any) => {
                    treeMap[child.id].rendered = true;
                    const cn = child.gender === 'female' ? 'tree__node--pink' : 'tree__node--blue';
                    return (
                      <div 
                        className={`tree__node ${cn}`}
                        key={child.id}
                      >
                        {child.name}
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        }
        treeMap[currentNode.id].rendered = true;
        return (
          <div
            className={`tree__node ${currentNode.className}`}
            key={currentNode.id}
          >
            {currentNode.name}
          </div>
        );
      })}
    </div>
  );
}

export default FamilyTreeNode;