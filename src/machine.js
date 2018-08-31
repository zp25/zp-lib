/**
 * @module machine
 * @description 有限状态机
 * @param {Object.<string, string>} dict - 状态查询字典
 * @return {function}
 * @example
 * const dict = {
 *   start: {
 *     MOVE: 'move',
 *     END: 'end',
 *   },
 *   move: {
 *     MOVE: 'move',
 *     END: 'end',
 *   },
 *   end: {
 *     START: 'start',
 *   },
 * };
 *
 * const transition = machine(dict);
 *
 * // 根据当前状态start和输入END确定输出状态
 * const nextState = transition('start')('END');
 */

export default dict => currentState => (action) => {
  const transition = dict[currentState];

  if (transition && {}.hasOwnProperty.call(transition, action)) {
    return transition[action];
  }

  return false;
};
