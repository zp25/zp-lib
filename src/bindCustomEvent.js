/**
 * @module bindCustomEvent
 * @description 绑定自定义事件
 * @param {Object.<string, function>} obj - 自定义事件和处理函数映射表
 * @example  <caption>传入自定义事件名和处理函数的映射表</caption>
 * function customEventTrigger(type, data) {
 *   const event = new CustomEvent(type, {
 *     detail: data || { name: type },
 *   });
 *
 *   window.dispatchEvent(event);
 * }
 *
 * function eventATrigger(data) {
 *   customEventTrigger('eventA', { data });
 * }
 * @example
 * const customEvents = {
 *   eventA: (e) => {
 *     const { data } = e.detail;
 *
 *     console.log(data);
 *   },
 * };
 *
 * bindCustomEvent(customEvents);
 *
 * eventATrigger({ data: true });
 */

export default (obj) => {
  const eventMap = new Map(Object.entries(obj));

  eventMap.forEach((handler, event) => {
    document.addEventListener(event, handler, false);
  });
};
