/**
 * @module bindCustomEvent
 * @description 绑定自定义事件
 * @param {Object.<string, function>} obj - 自定义事件和处理函数映射表
 */

export default (obj) => {
  const eventMap = new Map(Object.entries(obj));

  eventMap.forEach((handler, event) => {
    window.addEventListener(event, handler, false);
  });
};
