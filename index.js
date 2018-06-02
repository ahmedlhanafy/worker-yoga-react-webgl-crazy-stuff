import { registerNativeModules } from './nativeModules';
import { subscribe } from './utils/WorkerRegistry';

const worker = new Worker('./src/index.js');

worker.onmessage = ({ data }) => subscribe(worker)(data);

registerNativeModules();
