import { subscribe } from '../utils/WorkerRegistry';

self.onmessage = ({ data }) => subscribe(self)(data);
