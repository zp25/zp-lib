/**
 * FSA Factory
 * @see {@link https://github.com/acdlite/redux-actions/blob/master/src/createAction.js}
 * @param {string} type - Action type
 * @param {function} [payloadCreator] - payload创建函数
 * @param {function} [metaCreator] - meta数据创建函数
 * @return {function} Action创建函数
 */
export default (type, payloadCreator, metaCreator) => {
  const finalPayloadCreator = typeof payloadCreator === 'function'
    ? payloadCreator
    : t => t;

  const hasMeta = typeof metaCreator === 'function';
  const typeString = type.toString();

  const actionCreator = (...args) => {
    const payload = finalPayloadCreator(...args);
    const action = {
      type,
    };

    if (payload instanceof Error) {
      action.error = true;
    }

    if (payload !== undefined) {
      action.payload = payload;
    }

    if (hasMeta) {
      action.meta = metaCreator(...args);
    }

    return action;
  };

  actionCreator.toString = () => typeString;

  return actionCreator;
};
