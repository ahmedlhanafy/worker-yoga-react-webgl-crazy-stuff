/* @flow */

import uuid from 'uuid/v4';

const registeredFunctions: { [string]: (any) => any } = {};

const getReturnedFuncName = (func: string, id: string) => `${func}$${id}`;

const unregister = (id: string) => {
  delete registeredFunctions[id];
};

export const register = (name: string, func: any => any) => {
  registeredFunctions[name] = func;
};

export const subscribe = worker => (foreignFunction: any) => {
  Object.keys(registeredFunctions).forEach(async functionName => {
    if (functionName === foreignFunction.name) {
      const res = await registeredFunctions[functionName](
        ...foreignFunction.args,
      );
      if (foreignFunction.id) {
        const returnedFunctionName = getReturnedFuncName(
          functionName,
          foreignFunction.id,
        );
        worker.postMessage({ name: returnedFunctionName, args: [res] });
      }
    }
  });
};

export const send = worker => (foreignFunction: any): Promise<any> => {
  const id = uuid();
  //Send message over the bridge
  worker.postMessage({ ...foreignFunction, id });

  // Wait until we get a response
  return new Promise(res => {
    const returnedFunctionName = getReturnedFuncName(foreignFunction.name, id);

    register(returnedFunctionName, (...args) => {
      unregister(id);
      res(...args);
    });
  });
};
