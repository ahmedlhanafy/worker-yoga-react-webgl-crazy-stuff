/* @flow */

import optimizedResizeObserver from './utils/optimizedResize';
import type { DOMProps, DOMStyles } from './Config';

export interface UIManager {
  availableSize: { width: number, height: number };
  createElement(
    id: number,
    type: string,
    props: DOMProps,
    styles: DOMStyles,
    isRoot: boolean,
  ): void;
  destroyElement(id: number): void;
  onResize: ((width: number, height: number) => void) => void;
  updateProps(id: number, props: DOMProps): void;
  updateStyles(id: number, styles: DOMStyles): void;
  addChild(id: number, parentId: number): void;
  removeChild(id: number, parentId: number): void;
}

export default class DOMUIManager implements UIManager {
  root: HTMLElement;
  elementsMap: { [number]: HTMLElement };
  availableSize: { width: number, height: number };

  constructor() {
    this.elementsMap = {};
    this.availableSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

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

    if (isRoot) this.root = element;
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
    Object.keys(styles).forEach(
      //$FlowFixMe
      styleKey => (element.style[styleKey] = `${styles[styleKey]}px`),
    );
    if (styles.backgroundColor) {
      element.style.backgroundColor = styles.backgroundColor;
    }
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

  render() {
    //$FlowFixMe
    document.body.appendChild(this.root);
  }
}
