import DOMUIManagerRegisterer from './DOMUIManager/registerer';
import CanvasUIManagerRegisterer from './CanvasUIManager/registerer';

export default () => {
  DOMUIManagerRegisterer();
  CanvasUIManagerRegisterer();
};
