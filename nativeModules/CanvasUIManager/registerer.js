/* @flow */

import UIManager from './';
import { register } from '../../utils/WorkerRegistry';

const uiManager = new UIManager();

export default () => {
  register('createElement', (...args) => uiManager.createElement(...args));

  register('addChild', (...args) => uiManager.addChild(...args));

  register('updateStyles', (...args) => uiManager.updateStyles(...args));

  register('getAvailableSize', (...args) =>
    uiManager.getAvailableSize(...args),
  );
};
