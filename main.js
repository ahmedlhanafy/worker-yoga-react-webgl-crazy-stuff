/* @flow */

import DOMUIManager from './UIManager';
import VTree from './VTree';

const uiManager = new DOMUIManager();
const vTree = new VTree(uiManager);
uiManager.render();

const parent = vTree.createElement('div', {
  style: {
    width: 420,
    height: 420,
    backgroundColor: 'pink',
    padding: 26,
    flexDirection: 'row',
    justifyContent: 'spaceAround',
    alignItems: 'center',
    margin: 42,
  },
});

vTree.addChild(parent, vTree.rootId);

const child1Id = vTree.createElement('div', {
  style: {
    width: 120,
    height: 120,
    backgroundColor: 'red',
  },
});

const child2Id = vTree.createElement('div', {
  style: {
    width: 120,
    height: 120,
    backgroundColor: 'blue',
  },
});

vTree.addChild(child1Id, parent);
vTree.addChild(child2Id, parent);
