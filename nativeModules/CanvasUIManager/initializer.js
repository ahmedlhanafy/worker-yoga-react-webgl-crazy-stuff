/* @flow */

import { send } from '../../utils/WorkerRegistry';

export default worker => {
  const sendWithWorker = send(worker);
  return {
    createElement: async (...args) =>
      await sendWithWorker({ name: 'createElement', args }),

    addChild: async (...args) =>
      await sendWithWorker({ name: 'addChild', args }),

    getAvailableSize: async () =>
      await sendWithWorker({ name: 'getAvailableSize', args: [] }),

    updateStyles: async (...args) =>
      await sendWithWorker({ name: 'updateStyles', args }),
  };
};
