import CanvasUIManagerInitializer from './CanvasUIManager/initializer';
import DOMUIManagerInitializer from './DOMUIManager/initializer';

export default worker => ({
  DOMUIManager: DOMUIManagerInitializer(worker),
  canvasUIManager: CanvasUIManagerInitializer(worker),
});
