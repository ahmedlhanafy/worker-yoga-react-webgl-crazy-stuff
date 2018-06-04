/* @flow */

import omit from 'lodash.omit';
import pick from 'lodash.pick';
import ShadowNode from './ShadowNode';
import { shadowNodeStyles } from './Config';
import type { Props } from './Config';

export default class VTree {
  rootId: number;
  index: number;
  nodesMap: { [number]: ShadowNode };
  uiManager;

  constructor(nativeModules) {
    this.nodesMap = {};
    this.index = 0;
    this.uiManager = nativeModules.DOMUIManager;
  }

  async init() {
    const dimensions = await this.uiManager.getAvailableSize();

    this.rootId = await this.createElement(
      'div',
      {
        style: { ...dimensions },
      },
      true,
    );

    // this.this.uiManager.onResize(this.updateSize);
    this.calculateLayout(dimensions.width, dimensions.height);
  }

  getRootId = () => {
    return this.rootId;
  };

  async createElement(
    type: string,
    props: Props,
    isRoot: boolean = false,
  ): Promise<number> {
    const id = this.index++;

    // Native layer
    const nonLayoutStyles = omit(props.style, shadowNodeStyles);

    await this.uiManager.createElement(
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

  async addChild(id: number, parentId: number) {
    // Virtual layer
    const childNode = this.nodesMap[id];
    const parentNode = this.nodesMap[parentId];

    parentNode.addChild(childNode);

    // Native layer
    await this.uiManager.addChild(id, parentId);

    const dimensions = await this.uiManager.getAvailableSize();
    this.calculateLayout(dimensions.width, dimensions.height);
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

  applyLayout = async (node: ShadowNode) => {
    const layout = node.backingNode.getComputedLayout();
    //$FlowFixMe
    await this.uiManager.updateStyles(node.id, layout);
  };
}
