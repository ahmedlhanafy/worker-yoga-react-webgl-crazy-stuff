/* @flow */

import Konva from 'konva';
import Node from './Node';
import type { UIManager } from './types';
import type { DOMProps, DOMStyles } from '../../src/modules/VTree/Config';

export default class CanvasUIManager implements UIManager {
  nodesMap: { [number]: Node };
  canvas: Konva.Layer;

  constructor() {
    this.nodesMap = {};

    const stage = new Konva.Stage({
      container: document.body,
      width: window.innerWidth,
      height: window.innerHeight,
    });

    this.canvas = new Konva.Layer({
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    });
    stage.add(this.canvas);
    // $FlowFixMe
    document.body.style.margin = 0;
  }

  getAvailableSize = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  onResize(callback: (width: number, height: number) => void) {
    //TODO
    // optimizedResizeObserver.subscribe(() =>
    //   callback(window.innerWidth, window.innerHeight),
    // );
  }

  createElement(
    id: number,
    type: string,
    props: DOMProps,
    styles: DOMStyles,
    isRoot: boolean = false,
  ) {
    const node = new Node();

    if (isRoot) this.canvas.add(node.group);

    this.nodesMap[id] = node;

    this._setProps(node, props);
    this._setStyles(node, id, styles);
  }

  destroyElement(id: number) {
    delete this.nodesMap[id];
  }

  _setProps(node: Node, props: DOMProps) {}

  _setStyles(node: Node, id: number, styles: DOMStyles) {
    Object.keys(styles).forEach(styleKey => {
      const styleVal = styles[styleKey];
      switch (styleKey) {
        case 'height':
        case 'width':
          node.group[styleKey](styleVal);
          node.element[styleKey](styleVal);
          break;

        case 'left':
          node.group.x(styleVal);
          break;

        case 'top':
          node.group.y(styleVal);
          break;

        case 'backgroundColor':
          node.element.fill(styleVal);
          break;

        case 'borderRadius':
          node.element.cornerRadius(styleVal);
          break;

        case 'shadowColor':
          node.element.shadowEnabled(true);
          node.element.shadowColor(styleVal);
          break;

        case 'shadowOffset':
          node.element.shadowEnabled(true);
          node.element.shadowOffset(styleVal);
          break;

        case 'shadowBlur':
          node.element.shadowEnabled(true);
          node.element.shadowBlur(styleVal);
          break;

        case 'zIndex':
          node.group.setZIndex(styleVal);
          break;
      }
    });
  }

  updateProps(id: number, props: DOMProps) {
    const node = this.nodesMap[id];

    if (!node) throw new Error('Node not found');

    this._setProps(node, props);
    // node.draw();
    this.canvas.draw();
  }

  updateStyles(id: number, styles: DOMStyles) {
    const node = this.nodesMap[id];

    if (!node) throw new Error('Node not found');

    this._setStyles(node, id, styles);
    // node.draw();
    this.canvas.draw();
  }

  addChild(id: number, parentId: number) {
    const childNode = this.nodesMap[id];
    const parentNode = this.nodesMap[parentId];

    // Add the new child to the parent group
    parentNode.add(childNode);
  }

  removeChild(id: number, parentId: number) {
    const childElement = this.nodesMap[id];
    const parentElement = this.nodesMap[parentId];

    //TODO

    this.destroyElement(id);
  }
}
