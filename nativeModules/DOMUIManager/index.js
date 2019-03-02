/* @flow */

import measureText from 'measure-text';
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
    const element = document.createElement(type === 'text' ? 'span' : type);

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

    if (type === 'text') {
      const measurement = measureText({
        text: props.value,
        // fontFamily: 'Georgia',
        fontSize: styles.fontSize ? `${styles.fontSize}px` : '10px',
        lineHeight: styles.lineHeight ? styles.lineHeight : 1,
        fontWeight: styles.fontWeight ? styles.fontWeight : 400,
        // fontStyle: 'italic',
      });

      console.log(props.value, measurement)

      return {
        height: measurement.height.value,
        width: measurement.width.value,
      };
    }
  }

  destroyElement(id: number) {
    delete this.elementsMap[id];
  }

  _setProps(element: HTMLElement, props: DOMProps) {
    Object.keys(props).forEach(propName => {
      const prop = props[propName];
      switch (propName) {
        case 'source':
          if (element instanceof HTMLImageElement) element.src = prop;
          break;
        case 'value':
          if (element instanceof HTMLSpanElement) element.innerText = prop;
          break;
      }
    });
  }

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

        case 'fontSize':
          if (element instanceof HTMLSpanElement)
            element.style.fontSize = `${styleVal}px`;
          break;

        case 'color':
          if (element instanceof HTMLSpanElement) element.style.color = styleVal;
          break;

        case 'lineHeight':
          if (element instanceof HTMLSpanElement)
            element.style.lineHeight = styleVal;
          break;

        case 'fontWeight':
          if (element instanceof HTMLSpanElement)
            element.style.fontWeight = styleVal;
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
