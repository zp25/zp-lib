/* eslint no-underscore-dangle:0 */

/**
 * @typedef {Object} Observer
 * @property {Function} update - 更新状态
 */

/**
 * @class
 * @description 目标
 */
class Subject {
  constructor() {
    /**
     * 观察者列表
     * @type {Array.<Observer>}
     * @private
     */
    this._observers = [];
    /**
     * 目标状态
     * @type {Object}
     * @private
     */
    this._state = {};
  }

  /**
   * 绑定观察者
   * @param {Observer} observer - 观察者对象
   * @public
   */
  attach(observer) {
    if (!this._observers.includes(observer)) {
      this._observers = this._observers.concat(observer);
    }
  }

  /**
   * 解绑观察者
   * @param {Observer} observer - 观察者对象
   * @public
   */
  detach(observer) {
    this._observers = this._observers.filter(o => o !== observer);
  }

  /**
   * 获取观察者列表
   * @type {Array.<Observer>}
   * @public
   */
  get observers() {
    return this._observers;
  }

  /**
   * 获取和设置目标状态
   * @type {Object}
   * @public
   */
  get state() {
    return Object.assign({}, this._state);
  }

  set state(newState) {
    const prevState = this.state;
    this._state = Object.assign({}, prevState, newState);

    this.notify(prevState);
  }

  /**
   * 通知观察者状态变化
   * @param {Object} prevState - 原状态
   * @private
   */
  notify(prevState) {
    this._observers.forEach((o) => {
      if ({}.hasOwnProperty.call(o, 'update')) {
        o.update(this.state, prevState);
      }
    });
  }
}

export default Subject;
