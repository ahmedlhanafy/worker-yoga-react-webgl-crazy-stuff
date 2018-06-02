import { initNativeModules } from '../../nativeModules';
import VTree from './VTree';

const nativeModules = initNativeModules(self);

export default {
  vTree: new VTree(nativeModules),
};
