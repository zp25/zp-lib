/**
 * @typedef {Object} storage
 * @property {function} get - 读数据
 * @property {function} set - 写数据
 * @property {function} remove - 删数据
 * @description 不知道怎么写
 */

import {
  read,
  save,
  StorageTypeError,
} from './base';

/**
 * @module storage
 * @description 主要为了统一存取格式。如果遇到不统一格式，读取总是返回undefined，写入会强制替换
 * @param {string} item - 标记
 * @param {Object} config - 选项
 * @param {localStorage|sessionStorage} [config.engine=localStorage] - 存储方式
 * @param {boolean} [config.forceUpdate=true] - 默认若格式不统一，会覆盖原先值。设置false不强制覆盖，总是抛出错误
 * @return {storage}
 */
const storage = (item, config = {}) => {
  const {
    engine = localStorage,
    forceUpdate = true,
  } = config;

  /**
   * 读数据
   * @description 读取操作不应覆盖非法数据
   * @param {string} key
   * @throws {StorageTypeError}
   */
  const get = (key) => {
    const data = read(engine, item);

    if (data === null || typeof data !== 'object') {
      return undefined;
    }

    return data[key];
  };

  /**
   * 写数据
   * @param {string} key
   * @param {*} val - 可序列化数据
   * @return {undefined}
   * @throws {StorageTypeError}
   */
  const set = (key, val) => {
    const data = read(engine, item);

    // 无数据(原先数据为null作为无数据处理)
    if (data === null) {
      return save(engine, item, { [key]: val });
    }

    // 非法数据
    if (typeof data !== 'object') {
      if (!forceUpdate) {
        throw new StorageTypeError();
      }

      return save(engine, item, { [key]: val });
    }

    return save(engine, item, {
      ...data,
      [key]: val,
    });
  };

  /**
   * 删数据
   * @param {string} key
   * @return {undefined}
   * @throws {StorageTypeError}
   */
  const del = (key) => {
    const data = read(engine, item);

    // 无数据
    if (data === null) {
      return save(engine, item, {});
    }

    // 非法数据
    if (typeof data !== 'object') {
      if (!forceUpdate) {
        throw new StorageTypeError();
      }

      return save(engine, item, {});
    }

    const rest = Object.entries(data).reduce((prev, [k, v]) => {
      if (k === key) {
        return prev;
      }

      return {
        ...prev,
        [k]: v,
      };
    }, {});

    return save(engine, item, rest);
  };

  /**
   * 查看keys
   * @description 读取操作不应覆盖非法数据
   * @return {Array.<string>|null}
   * @throws {StorageTypeError}
   */
  const keys = () => {
    const data = read(engine, item);

    if (data === null || typeof data !== 'object') {
      return [];
    }

    return Object.keys(data);
  };

  return {
    get,
    set,
    delete: del,
    keys,
  };
};

export default storage;
