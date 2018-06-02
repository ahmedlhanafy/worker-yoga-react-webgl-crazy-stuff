import './registerWorker';
import modules from './modules';

(async () => {
  const { vTree } = modules;
  await vTree.init();
  const rootId = await vTree.getRootId();

  const parent = await vTree.createElement('div', {
    style: {
      width: '100%',
      height: '100%',
      backgroundColor: 'green',
      padding: 26,
      flexDirection: 'row',
      justifyContent: 'spaceAround',
      alignItems: 'center',
    },
  });

  await vTree.addChild(parent, rootId);

  const child1Id = await vTree.createElement('div', {
    style: {
      width: 220,
      height: 220,
      backgroundColor: 'pink',
      borderRadius: 20,
    },
  });

  const child2Id = await vTree.createElement('div', {
    style: {
      width: 220,
      height: 220,
      backgroundColor: 'magenta',
      borderRadius: 20,
    },
  });

  await vTree.addChild(child1Id, parent);
  await vTree.addChild(child2Id, parent);
})();
