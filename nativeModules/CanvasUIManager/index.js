/* @flow */

import Konva from 'konva';
import type { UIManager } from './types';
import type { DOMProps, DOMStyles } from '../../src/modules/VTree/Config';

export default class CanvasUIManager implements UIManager {
  elementsMap: { [number]: Konva.Rect };
  canvas: Konva.Layer;
  parentGroups: { [number]: Konva.Group };
  childrenGroups: { [number]: Konva.Group };

  constructor() {
    this.elementsMap = {};
    this.parentGroups = {};
    this.childrenGroups = {};

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
    const element = new Konva.Rect({
      width: 0,
      height: 0,
      strokeWidth: 0,
    });

    this.elementsMap[id] = element;

    this._setProps(element, props);
    this._setStyles(element, id, styles);
  }

  destroyElement(id: number) {
    delete this.elementsMap[id];
  }

  _setProps(element: Konva.Rect, props: DOMProps) {}

  _setStyles(element: Konva.Rect, id: number, styles: DOMStyles) {
    Object.keys(styles).forEach(styleKey => {
      const styleVal = styles[styleKey];
      switch (styleKey) {
        case 'height':
        case 'width':
          element[styleKey](styleVal);
          break;

        case 'left':
          if (!this.parentGroups[id]) element.x(styleVal);
          break;

        case 'top':
          if (!this.parentGroups[id]) element.y(styleVal);
          break;

        case 'backgroundColor':
          element.fill(styleVal);
          break;

        case 'borderRadius':
          element.cornerRadius(styleVal);
          break;

        case 'shadowColor':
          element.shadowEnabled(true);
          element.shadowColor(styleVal);
          break;

        case 'shadowOffset':
          element.shadowEnabled(true);
          element.shadowOffset(styleVal);
          break;

        case 'shadowBlur':
          element.shadowEnabled(true);
          element.shadowBlur(styleVal);
          break;
      }
    });
  }

  updateProps(id: number, props: DOMProps) {
    const element = this.elementsMap[id];

    if (!element) throw new Error('Element not found');

    this._setProps(element, props);
    this.canvas.draw();
  }

  updateStyles(id: number, styles: DOMStyles) {
    const element = this.elementsMap[id];

    if (!element) throw new Error('Element not found');

    this._setStyles(element, id, styles);
    this.canvas.draw();
  }

  addChild(id: number, parentId: number) {
    const childElement = this.elementsMap[id];
    const parentElement = this.elementsMap[parentId];

    let parentGroup = this.parentGroups[parentId];

    if (!parentGroup) {
      /* Add a new group with the same coordinates as the parent element and reset 
       and reset the parent group position
       */
      parentGroup = new Konva.Group({
        x: parentElement.getAttr('x'),
        y: parentElement.getAttr('y'),
      });

      parentGroup.add(parentElement);

      parentElement.x(0);
      parentElement.y(0);

      this.parentGroups[parentId] = parentGroup;

      // Add the newly created group to the canvas
      const grandParentGroup = this.childrenGroups[parentId];
      if (grandParentGroup) {
        grandParentGroup.add(parentGroup);
      } else {
        this.canvas.add(parentGroup);
      }
    }

    // Add the new child to the parent group
    parentGroup.add(childElement);

    // Connect children with their parent group
    this.childrenGroups[id] = parentGroup;
  }

  removeChild(id: number, parentId: number) {
    const childElement = this.elementsMap[id];
    const parentElement = this.elementsMap[parentId];

    //TODO

    this.destroyElement(id);
  }
}
