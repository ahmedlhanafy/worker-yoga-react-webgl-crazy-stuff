/* @flow */

import optimizedResizeObserver from '../utils/optimizedResize';
import type { UIManager } from '../UIManager/types';
import type { DOMProps, DOMStyles } from '../../src/modules/VTree/Config';

export default class DOMUIManager implements UIManager {
  root: HTMLElement;
  elementsMap: { [number]: HTMLElement };

  constructor() {
    this.elementsMap = {};
  }

  getAvailableSize = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  onResize(callback: (width: number, height: number) => void) {
    optimizedResizeObserver.subscribe(() =>
      callback(window.innerWidth, window.innerHeight),
    );
  }

  createElement(
    id: number,
    type: string,
    props: DOMProps,
    styles: DOMStyles,
    isRoot: boolean = false,
  ) {
    const element = document.createElement(type);

    if (isRoot) {
      this.root = element;
      //$FlowFixMe
      document.body.appendChild(this.root);
    }
    this.elementsMap[id] = element;

    element.style.position = 'absolute';
    element.style.contain = 'layout style size';
    this._setProps(element, props);
    this._setStyles(element, styles);
  }

  destroyElement(id: number) {
    delete this.elementsMap[id];
  }

  _setProps(element: HTMLElement, props: DOMProps) {}

  _setStyles(element: HTMLElement, styles: DOMStyles) {
    const boxShadowArr = ['', '', '', ''];
    Object.keys(styles).forEach(styleKey => {
      const styleVal = styles[styleKey];
      switch (styleKey) {
        case 'shadowColor':
          boxShadowArr[3] = styleVal;
          break;

        case 'shadowOffset':
          boxShadowArr[0] = `${styleVal.x}px`;
          boxShadowArr[1] = `${styleVal.y}px`;
          break;

        case 'shadowBlur':
          boxShadowArr[2] = `${styleVal}px`;
          break;

        case 'backgroundColor':
          element.style.backgroundColor = styleVal;
          break;

        case 'zIndex':
          element.style.zIndex = parseInt(styleVal);
          break;

        default:
          element.style[styleKey] = `${styleVal}px`;
          break;
      }
    });
    element.style.boxShadow = boxShadowArr.join(' ');
  }

  updateProps(id: number, props: DOMProps) {
    const element = this.elementsMap[id];

    if (!element) throw new Error('Element not found');

    this._setProps(element, props);
  }

  updateStyles(id: number, styles: DOMStyles) {
    const element = this.elementsMap[id];

    if (!element) throw new Error('Element not found');

    this._setStyles(element, styles);
  }

  addChild(id: number, parentId: number) {
    const childElement = this.elementsMap[id];
    const parentElement = this.elementsMap[parentId];

    parentElement.appendChild(childElement);
  }

  removeChild(id: number, parentId: number) {
    const childElement = this.elementsMap[id];
    const parentElement = this.elementsMap[parentId];

    parentElement.removeChild(childElement);

    this.destroyElement(id);
  }
}
