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

  const createCard = async (styles, props) => vTree.createElement('div', {
    style: {
      width: '100%',
      height: 420,
      backgroundColor: 'white',
      shadowColor: 'rgba(0,0,0,0.2)',
      shadowOffset: {
        x: 0,
        y: 6,
      },
      shadowBlur: 8,
      borderRadius: 4,
      ...styles
    },
    ...props
  });

  const card = await createCard();
  const card1 = await createCard();

  const image = await vTree.createElement('img', {
    style: {
      height: 240,
    },
    source:
      'https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350',
  });

  const image1 = await vTree.createElement('img', {
    style: {
      height: 240,
    },
    source:
      'https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1511893446000/photosp/77569385-9c77-48a2-9dda-ef292ae7919b/stock-photo-nature-water-sun-sky-sea-sunset-beach-sand-mountain-77569385-9c77-48a2-9dda-ef292ae7919b.jpg',
  });

  const text = await vTree.createElement('text', {
    style: {
      fontSize: 20,
      fontWeight: 700,
      color: 'white',
    },
    value: 'Hello World',
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

  const cardContainer = await vTree.createElement('div', {
    style: {
      flex: 1,
      padding: 16,
    },
  });

  const textLines = await vTree.createElement('text', {
    style: {
      fontSize: 20,
      fontWeight: 700,
      color: '#212121',
    },
    value: 'Beautiful Landscapes',
  });

  const textLines1 = await vTree.createElement('text', {
    style: {
      fontSize: 20,
      color: '#212121',
      marginTop: 36,
    },
    value:
      'Sunt fugiat cillum ullamco enim non reprehenderit veniam velit ex voluptate.',
  });

  await vTree.addChild(statusbar, rootId);
  await vTree.addChild(header, rootId);
  await vTree.addChild(container, rootId);
  await vTree.addChild(card, container);

  await vTree.addChild(image, card);
  await vTree.addChild(cardContainer, card);
  await vTree.addChild(textLines, cardContainer);
  await vTree.addChild(textLines1, cardContainer);

  await vTree.addChild(card1, container);
  await vTree.addChild(image1, card1);
  await vTree.addChild(text, header);
  await vTree.addChild(fab, rootId);
  await vTree.addChild(plusSign1, fab);
  await vTree.addChild(plusSign2, fab);
})();
