// import Konva from 'konva';
import registerNativeModules from './nativeModules/registerer';
import { subscribe } from './utils/WorkerRegistry';

const worker = new Worker('./src/index.js');

worker.onmessage = ({ data }) => subscribe(worker)(data);

registerNativeModules();


// var stage = new Konva.Stage({
//     container: document.body,
//     width: window.innerWidth,
//     height: window.innerHeight
// });

// // add canvas element
// var layer = new Konva.Layer({
//     x: 10
// });

// stage.add(layer);

// // create shape
// var box = new Konva.Rect({
//     x: 0,
//     y: 0,
//     width: 100,
//     height: 50,
//     fill: '#00D2FF',
//     stroke: 'black',
//     strokeWidth: 4,
//     draggable: true
// });
// layer.add(box);
// console.log(box.getAttr('height'))

// layer.draw();
// document.body.style.margin = 0;
// // add cursor styling
// box.on('mouseover', function() {
//     document.body.style.cursor = 'pointer';
// });
// box.on('mouseout', function() {
//     document.body.style.cursor = 'default';
// });