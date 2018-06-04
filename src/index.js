import './registerWorker';
import modules from './modules';

(async () => {
  const { vTree } = modules;
  await vTree.init();
  const rootId = await vTree.getRootId();

  const statusbar = await vTree.createElement('div', {
    style: {
      width: '100%',
      height: 22,
      backgroundColor: '#7B1FA2',
    },
  });

  const header = await vTree.createElement('div', {
    style: {
      width: '100%',
      height: 64,
      backgroundColor: '#9C27B0',
      padding: 16,
      justifyContent: 'center',
      shadowColor: 'rgba(0,0,0,0.2)',
      shadowOffset: {
        x: 0,
        y: 6,
      },
      shadowBlur: 8,
      zIndex: 2,
    },
  });

  const container = await vTree.createElement('div', {
    style: {
      flex: 1,
      width: '100%',
      backgroundColor: 'rgb(245,245,245)',
      paddingLeft: 96,
      paddingRight: 96,
      paddingTop: 24,
      alignItems: 'center',
    },
  });

  const card = await vTree.createElement('div', {
    style: {
      width: '100%',
      height: 320,
      backgroundColor: 'white',
      shadowColor: 'rgba(0,0,0,0.2)',
      shadowOffset: {
        x: 0,
        y: 6,
      },
      shadowBlur: 8,
      borderRadius: 4,
    },
  });

  const card1 = await vTree.createElement('div', {
    style: {
      width: '100%',
      height: 320,
      backgroundColor: 'white',
      shadowColor: 'rgba(0,0,0,0.2)',
      shadowOffset: {
        x: 0,
        y: 6,
      },
      shadowBlur: 8,
      marginTop: 16,
      borderRadius: 4,
    },
  });

  const image = await vTree.createElement('div', {
    style: {
      // width: '100%',
      height: 140,
      backgroundColor: '#00E5FF',
      // borderRadius: 4
    },
  });

  const text = await vTree.createElement('div', {
    style: {
      width: 220,
      height: 12,
      backgroundColor: 'white',
    },
  });

  const fab = await vTree.createElement('div', {
    style: {
      width: 56,
      height: 56,
      backgroundColor: '#1DE9B6',
      borderRadius: 56 / 2,
      position: 'absolute',
      bottom: 16,
      right: 16,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: 'rgba(0,0,0,0.4)',
      shadowOffset: {
        x: 0,
        y: 2,
      },
      shadowBlur: 8,
    },
  });

  const plusSign1 = await vTree.createElement('div', {
    style: {
      width: 18,
      height: 3,
      backgroundColor: '#212121',
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      top: 0,
    },
  });

  const plusSign2 = await vTree.createElement('div', {
    style: {
      width: 3,
      height: 18,
      backgroundColor: '#212121',
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      top: 0,
    },
  });

  await vTree.addChild(statusbar, rootId);
  await vTree.addChild(header, rootId);
  await vTree.addChild(container, rootId);
  await vTree.addChild(card, container);
  await vTree.addChild(card1, container);
  await vTree.addChild(image, card);
  await vTree.addChild(text, header);
  await vTree.addChild(fab, rootId);
  await vTree.addChild(plusSign1, fab);
  await vTree.addChild(plusSign2, fab);

  // const parent = await vTree.createElement('div', {
  //   style: {
  //     width: '100%',
  //     height: '100%',
  //     backgroundColor: 'black',
  //     padding: 12,
  //     flexDirection: 'row',
  //     justifyContent: 'spaceEvenly',
  //     alignItems: 'center',
  //   },
  // });

  // const child1Id = await vTree.createElement('div', {
  //   style: {
  //     width: '30%',
  //     height: 220,
  //     backgroundColor: 'pink',
  //     borderRadius: 20,
  //   },
  // });

  // const child2Id = await vTree.createElement('div', {
  //   style: {
  //     width: '30%',
  //     height: 220,
  //     backgroundColor: 'magenta',
  //     borderRadius: 20,
  //   },
  // });

  // await vTree.addChild(child1Id, parent);
  // await vTree.addChild(child2Id, parent);
})();
