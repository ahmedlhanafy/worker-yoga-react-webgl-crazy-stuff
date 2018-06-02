import UIManagerRegisterer from './UIManager/registerer';
import UIManagerInitializer from './UIManager/initializer';

export const initNativeModules = worker => ({
  uiManager: UIManagerInitializer(worker),
});

export const registerNativeModules = () => {
  UIManagerRegisterer();
};
