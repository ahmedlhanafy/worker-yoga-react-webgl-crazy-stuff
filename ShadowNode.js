/* @flow */

import * as yoga from 'yoga-layout';
import { shadowNodeStyles } from './Config';
import type { YogaStyles } from './Config';

export default class ShadowNode {
  id: number;
  backingNode: yoga.Yoga$Node;
  styles: YogaStyles;
  children: Array<ShadowNode>;

  constructor(id: number, styles: YogaStyles = {}) {
    this.id = id;
    this.backingNode = yoga.Node.create();
    this.styles = styles;
    this.children = [];

    this._applyStyles();
  }

  addChild(node: ShadowNode) {
    let index = this.children.push(node);

    this.backingNode.insertChild(node.backingNode, --index);
  }

  _applyStyles = () => {
    if (!this.styles) return;

    const styleKeys = Object.keys(this.styles);

    const styles = styleKeys.filter(styleAttr =>
      shadowNodeStyles.includes(styleAttr),
    );

    styles.forEach(styleAttr => {
      const styleVal = this.styles[styleAttr];
      if (styleVal) {
        switch (styleAttr) {
          case 'left':
            this.backingNode.setPosition(yoga.EDGE_LEFT, styleVal);
            break;
          case 'right':
            this.backingNode.setPosition(yoga.EDGE_RIGHT, styleVal);
            break;
          case 'top':
            this.backingNode.setPosition(yoga.EDGE_TOP, styleVal);
            break;
          case 'bottom':
            this.backingNode.setPosition(yoga.EDGE_BOTTOM, styleVal);
            break;
          case 'width':
            this.backingNode.setWidth(styleVal);
            break;
          case 'height':
            this.backingNode.setHeight(styleVal);
            break;
          case 'padding':
            this.backingNode.setPadding(yoga.EDGE_ALL, styleVal);
            break;
          case 'margin':
            //$FlowFixMe
            this.backingNode.setMargin(yoga.EDGE_ALL, styleVal);
            break;
          case 'flexDirection':
            const flexDirectionConstants = {
              column: yoga.FLEX_DIRECTION_COLUMN,
              columnReverse: yoga.FLEX_DIRECTION_COLUMN_REVERSE,
              row: yoga.FLEX_DIRECTION_ROW,
              rowReverse: yoga.FLEX_DIRECTION_ROW_REVERSE,
            };
            this.backingNode.setFlexDirection(flexDirectionConstants[styleVal]);
            break;
          case 'alignItems':
            const alignItemsConstants = {
              auto: yoga.ALIGN_AUTO,
              baseline: yoga.ALIGN_BASELINE,
              center: yoga.ALIGN_CENTER,
              flexEnd: yoga.ALIGN_FLEX_END,
              flexStart: yoga.ALIGN_FLEX_START,
              spaceAround: yoga.ALIGN_SPACE_AROUND,
              spaceBetween: yoga.ALIGN_SPACE_BETWEEN,
              stretch: yoga.ALIGN_STRETCH,
            };
            this.backingNode.setAlignItems(alignItemsConstants[styleVal]);
            break;
          case 'justifyContent':
            const justifyContentConstants = {
              center: yoga.JUSTIFY_CENTER,
              flexEnd: yoga.JUSTIFY_FLEX_END,
              flexStart: yoga.JUSTIFY_FLEX_START,
              spaceAround: yoga.JUSTIFY_SPACE_AROUND,
              spaceBetween: yoga.JUSTIFY_SPACE_BETWEEN,
              spaceEvenly: yoga.JUSTIFY_SPACE_EVENLY,
            };
            this.backingNode.setJustifyContent(
              justifyContentConstants[styleVal],
            );
            break;
        }
      }
    });
  };
}
