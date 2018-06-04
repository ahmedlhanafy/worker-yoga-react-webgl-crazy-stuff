/* @flow */

import type { DOMProps, DOMStyles } from '../../src/modules/VTree/Config';

export interface UIManager {
  getAvailableSize: () => { width: number, height: number };
  createElement(
    id: number,
    type: string,
    props: DOMProps,
    styles: DOMStyles,
    isRoot: boolean,
  ): void;
  destroyElement(id: number): void;
  // onResize: ((width: number, height: number) => void) => void;
  updateProps(id: number, props: DOMProps): void;
  updateStyles(id: number, styles: DOMStyles): void;
  addChild(id: number, parentId: number): void;
  removeChild(id: number, parentId: number): void;
}

