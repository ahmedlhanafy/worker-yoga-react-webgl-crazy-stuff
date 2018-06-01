/* @flow */

import omit from 'lodash.omit';
import pick from 'lodash.pick';
import type { UIManager } from './UIManager';
import ShadowNode from './ShadowNode';
import { shadowNodeStyles } from './Config';
import type { Props } from './Config';

export default class VTree {
  rootId: number;
  index: number;
  uiManager: UIManager;
  nodesMap: { [number]: ShadowNode };

  constructor(uiManager: UIManager) {
    this.uiManager = uiManager;
    this.nodesMap = {};
    this.index = 0;

    this.rootId = this.createElement(
      'div',
      {
        style: { ...uiManager.availableSize, backgroundColor: 'red' },
      },
      true,
    );

    this.uiManager.onResize(this.updateSize);

    this.calculateLayout(
      uiManager.availableSize.width,
      uiManager.availableSize.height,
    );
  }

  createElement(type: string, props: Props, isRoot: boolean = false) {
    const id = this.index++;

    // Native layer
    const nonLayoutStyles = omit(props.style, shadowNodeStyles);

    this.uiManager.createElement(
      id,
      type,
      omit(props, 'style'),
      nonLayoutStyles,
      isRoot,
    );

    // Virtual layer
    const layoutStyles = pick(props.style, shadowNodeStyles);

    this.nodesMap[id] = new ShadowNode(id, layoutStyles);

    return id;
  }

  addChild(id: number, parentId: number) {
    // Virtual layer
    const childNode = this.nodesMap[id];
    const parentNode = this.nodesMap[parentId];

    parentNode.addChild(childNode);

    // Native layer
    this.uiManager.addChild(id, parentId);

    this.calculateLayout(
        this.uiManager.availableSize.width,
        this.uiManager.availableSize.height,
      );
  }

  updateSize = (width: number, height: number) => {
    this.calculateLayout(width, height);
  };

  calculateLayout = (width: number, height: number) => {
    const rootShadowNode = this.nodesMap[this.rootId];
    
    rootShadowNode.backingNode.calculateLayout(width, height);

    this.applyLayoutRec(rootShadowNode);
  };

  applyLayoutRec = (node: ShadowNode) => {
    if (node.children.length === 0) {
      this.applyLayout(node);
      return;
    }
    // Apply layout for all children
    node.children.forEach(this.applyLayoutRec);

    // Apply layout for self
    this.applyLayout(node);
  };

  applyLayout = (node: ShadowNode) => {
    const layout = node.backingNode.getComputedLayout();
    //$FlowFixMe
    this.uiManager.updateStyles(node.id, layout);
  };
}
