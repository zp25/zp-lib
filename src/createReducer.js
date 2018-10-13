/**
 * Reducer Factory
 * @param {*} initState - state tree特定部分的默认值
 * @param {Object} handlers - 处理函数映射表
 * @return {function} Reducer
 */
export default (initState, handlers) => (state = initState, action) => {
  const { type } = action;

  if ({}.hasOwnProperty.call(handlers, type)) {
    return handlers[type](state, action);
  }

  return state;
};
