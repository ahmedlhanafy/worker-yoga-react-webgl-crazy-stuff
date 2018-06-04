/* @flow */

import Konva from 'konva';

export default class Node {
  group: Konva.Group;
  element: Konva.Rect;

  constructor() {
    this.group = new Konva.Group({
      width: 0,
      height: 0,
    });
    this.element = new Konva.Rect({
      width: 0,
      height: 0,
      strokeWidth: 0,
    });
    this.group.add(this.element);
  }

  add(childNode: Node) {
    this.group.add(childNode.group);
  }

  draw() {
    this.group.draw();
  }
}
