//@flow

import * as yoga from 'yoga-layout';
import optimizedResizeObserver from './utils/optimizedResize';

const { Node } = yoga;

interface iVNode<T> {
  addChild: T => void;
}

type Props = {
  style?: Object,
};

class VDOMNode implements iVNode<VDOMNode> {
  type: string;
  attributes: Object;
  styles: Object;
  children: Array<VDOMNode>;

  constructor(type: string) {
    this.type = type;
  }

  addAttributes = (attributes: Object) => {
    this.attributes = attributes;
  };

  addStyles = (styles: Object) => {
    this.styles = styles;
  };

  addChild = (child: VDOMNode) => {};
}

class VNode implements iVNode {
  id: string;
  nativeNode: HTMLElement;
  backingNode: yoga.Yoga$Node;
  props: Props;
  childrenIndex: number;
  children: Array<VNode>;

  constructor(type: string, props: Props = {}, isRoot = false) {
    this.nativeNode = document.createElement(type);
    this.backingNode = Node.create();
    this.props = props;
    this.childrenIndex = 0;
    this.children = [];

    this.addProps();

    if (isRoot) {
      optimizedResizeObserver.subscribe(this.calculateLayout);
    }
  }

  addChild = (node: VNode) => {
    this.nativeNode.appendChild(node.nativeNode);
    this.backingNode.insertChild(node.backingNode, this.childrenIndex);
    this.children.push(node);
    this.childrenIndex++;
  };

  addProps = (): void => {
    const propsKeys = Object.keys(this.props);
    this.addShadowNodeProps();
    this.addDomNodeProps();
  };

  calculateLayout = () => {
    this.backingNode.calculateLayout(
      window.innerWidth,
      window.innerHeight,
      yoga.DIRECTION_LTR,
    );
    this.applyLayoutRec(this);
  };

  applyLayoutRec = (node: VNode) => {
    if (node.children.length === 0) {
      this.applyLayout(node);
      return;
    }
    // Apply layout for all children
    node.children.forEach(this.applyLayoutRec);

    // Apply layout for self
    this.applyLayout(node);
  };

  applyLayout = (node: VNode) => {
    node.nativeNode.style.position = 'absolute';
    node.nativeNode.style.contain = 'layout style size';
    // node.nativeNode.style.userSelect = 'inherit';
    const layout = node.backingNode.getComputedLayout();

    Object.keys(layout).forEach(
      key => (node.nativeNode.style[key] = `${layout[key]}px`),
    );
  };

  addDomNodeProps = (): void => {
    const propsKeys = Object.keys(this.props);

    propsKeys.forEach(propKey =>
      this.nativeNode.setAttribute(propKey, this.props[propKey]),
    );

    this.addNativeStyles();
  };

  addNativeStyles = () => {
    if (!this.props.style) return;

    const styleKeys = Object.keys(this.props.style);

    const shadowNodeStyles = styleKeys.filter(
      styleAttr => !availableShadowNodeProps.includes(styleAttr),
    );

    shadowNodeStyles.forEach(
      styleAttr =>
        (this.nativeNode.style[styleAttr] = this.props.style[styleAttr]),
    );
  };

  addShadowNodeProps = () => {
    if (!this.props.style) return;

    const styleKeys = Object.keys(this.props.style);

    const shadowNodeStyles = styleKeys.filter(styleAttr =>
      availableShadowNodeProps.includes(styleAttr),
    );

    shadowNodeStyles.forEach(styleAttr => {
      const styleVal = this.props.style[styleAttr];
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
          optimizedResizeObserver;
          this.backingNode.setHeight(styleVal);
          break;
        case 'padding':
          this.backingNode.setPadding(yoga.EDGE_ALL, styleVal);
          break;
        case 'margin':
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
          this.backingNode.setJustifyContent(justifyContentConstants[styleVal]);
          break;
      }
    });
  };
}

const availableShadowNodeProps = [
  'left',
  'right',
  'top',
  'bottom',
  'width',
  'height',
  'padding',
  'margin',
  'flexDirection',
  'justifyContent',
  'alignItems',
];

const root = new VNode(
  'div',
  {
    style: {
      backgroundColor: 'red',
      padding: 30,
      flexDirection: 'row',
      justifyContent: 'spaceBetween',
      alignItems: 'center',
    },
  },
  true,
);

const child1 = new VNode('div', {
  style: {
    width: 120,
    height: 120,
    backgroundColor: 'blue',
    borderRadius: '4px',
    overflow: 'hidden',
  },
});

const child11 = new VNode('div', {
  style: {
    width: 100,
    height: 300,
    backgroundColor: 'black',
    borderRadius: '4px',
  },
});

child1.addChild(child11);

const child2 = new VNode('div', {
  style: {
    width: 120,
    height: 120,
    backgroundColor: 'pink',
    borderRadius: '4px',
  },
});

const child3 = new VNode('div', {
  style: {
    width: 120,
    height: 120,
    backgroundColor: 'green',
    borderRadius: '4px',
  },
});

root.addChild(child1);
root.addChild(child2);
root.addChild(child3);

root.calculateLayout();

document.body.appendChild(root.nativeNode);
