/* @flow */

import Konva from 'konva';

export default class Node {
  group: Konva.Group;
  element: Konva.Rect;
  imageObj: ?Image;

  constructor(type: string) {
    this.group = new Konva.Group({
      width: 0,
      height: 0,
    });

    if (type === 'img') {
      this.imageObj = new Image();

      this.imageObj.onload = () => {
        this.element = new Konva.Image({
          image: this.imageObj,
          width: 0,
          height: 0,
          strokeWidth: 0,
        });
        this.group.add(this.element);
      };
      
    } else {
      this.element = new Konva.Rect({
        width: 0,
        height: 0,
        strokeWidth: 0,
      });
      this.group.add(this.element);
    }
  }

  setImageSource(source: string) {
    if (!this.imageObj) throw new Error(`Node isn't an image`);
    this.imageObj.src = source;
  }

  add(childNode: Node) {
    this.group.add(childNode.group);
  }

  draw() {
    this.group.draw();
  }
}
