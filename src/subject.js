/* eslint no-underscore-dangle:0, max-classes-per-file:0 */

/**
 * @typedef {Object} Observer
 * @property {Function} update - 更新状态
 */

/**
 * 不规范observer错误
 * @param {string} message
 * @ignore
 */
function InvalidObserverError(message) {
  this.name = 'InvalidObserverError';
  this.message = message || 'Invalid Observer Error';
}

InvalidObserverError.prototype = Object.create(Error.prototype);
InvalidObserverError.prototype.constructor = InvalidObserverError;

/**
 * @class
 * @description 目标
 */
class Subject {
  /**
   * 判断是否为合规observer
   * @param {*} observer - 需检查内容
   * @return {boolean}
   * @static
   */
  static isValidObserver(observer) {
    return !!(
      observer
      && typeof observer === 'object'
      // && ({}).hasOwnProperty.call(observer, 'update')
      && typeof observer.update === 'function'
    );
  }

  /**
   * 观察者列表
   * @type {Array.<Observer>}
   * @protected
   */
  _observers = [];

  /**
   * 目标状态
   * @type {Object}
   * @protected
   */
  _state = {};

  /**
   * 绑定观察者
   * @param {Observer|Observer[]} observers - 观察者对象
   * @return {number} 完成后observers个数
   * @throws {InvalidObserverError} 存在不合规observer
   * @public
   */
  attach(observers) {
    const list = Array.isArray(observers) ? observers : [observers];

    list.forEach((o) => {
      if (!this.constructor.isValidObserver(o)) {
        throw new InvalidObserverError();
      }

      if (!this._observers.includes(o)) {
        this._observers.push(o);
      }
    });

    return this._observers.length;
  }

  /**
   * 解绑观察者
   * @param {Observer} observers - 观察者对象
   * @return {number} 剩余observers个数
   * @public
   */
  detach(observers) {
    const list = Array.isArray(observers) ? observers : [observers];

    this._observers = this._observers.filter(o => !list.includes(o));

    return this._observers.length;
  }

  /**
   * 获取观察者列表
   * @type {Array.<Observer>}
   * @desc 避免外部直接修改observers而添加getter，类内部总是使用this._observers
   * @public
   */
  get observers() {
    return this._observers;
  }

  /**
   * 获取状态
   * @type {Object}
   * @public
   */
  get state() {
    return { ...this._state };
  }

  /**
   * 初始化状态
   */
  set state(obj) {
    if (typeof obj !== 'object' || !obj) {
      throw new TypeError('not an Object');
    }

    this._state = { ...obj };
  }

  /**
   * 更新状态
   * @param {Object} state - 额外数据，用于合并到state
   * @public
   */
  setState(state) {
    const prevState = this.state;
    this._state = {
      ...prevState,
      ...state,
    };

    this.notify(prevState);
  }

  /**
   * 通知观察者状态变化
   * @param {Object} prevState - 原状态
   * @protected
   */
  notify(prevState) {
    this._observers.forEach((o) => {
      if (this.constructor.isValidObserver(o)) {
        o.update(this.state, prevState);
      }
    });
  }
}

/**
 * @class
 * @description 观察者, 可以绑定到多个目标
 */
class Observer {
  constructor(subject) {
    if (subject instanceof Subject) {
      subject.attach(this);
    }
  }

  /**
   * 必有方法
   * @param {Subject} - 目标实例
   * @return {Object}
   */
  update(subject) { // eslint-disable-line class-methods-use-this
    if (subject instanceof Subject) {
      return subject.state;
    }

    return undefined;
  }
}

export default Subject;
export {
  InvalidObserverError,
  Observer,
};
