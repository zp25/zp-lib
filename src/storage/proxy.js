import {
  read,
  save,
  StorageTypeError,
} from './base';

/**
 * @module storage.proxy
 * @description 更接近obj操作
 * @see {@link https://davidwalsh.name/javascript-proxy-with-storage}
 * @param {string} item - 标记
 * @param {Object} config - 选项
 * @param {localStorage|sessionStorage} [config.engine=localStorage] - 存储方式
 * @param {boolean} [config.forceUpdate=true] - 默认若格式不统一，会覆盖原先值。设置false不强制覆盖，总是抛出错误
 * @return {Proxy}
 */
const storage = (item, config = {}) => {
  const {
    engine = localStorage,
    forceUpdate = true,
  } = config;

  return new Proxy({}, {
    /**
     * 读数据
     */
    get(target, name) {
      const data = read(engine, item);

      if (data === null || typeof data !== 'object') {
        return undefined;
      }

      return data[name];
    },

    /**
     * 写数据
     */
    set(target, name, value) {
      const data = read(engine, item);

      // 无数据(原先数据为null作为无数据处理)
      if (data === null) {
        save(engine, item, { [name]: value });
        return true;
      }

      // 非法数据
      if (typeof data !== 'object') {
        if (!forceUpdate) {
          throw new StorageTypeError();
        }

        save(engine, item, { [name]: value });
        return true;
      }

      save(engine, item, {
        ...data,
        [name]: value,
      });
      return true;
    },

    /**
     * 删数据
     */
    deleteProperty(target, name) {
      const data = read(engine, item);

      // 无数据
      if (data === null) {
        save(engine, item, {});
        return true;
      }

      // 非法数据
      if (typeof data !== 'object') {
        if (!forceUpdate) {
          throw new StorageTypeError();
        }

        save(engine, item, {});
        return true;
      }

      const rest = Object.entries(data).reduce((prev, [key, val]) => {
        if (key === name) {
          return prev;
        }

        return {
          ...prev,
          [key]: val,
        };
      }, {});

      save(engine, item, rest);
      return true;
    },

    /**
     * 查看keys
     */
    ownKeys() {
      const data = read(engine, item);

      if (data === null || typeof data !== 'object') {
        return [];
      }

      return Object.keys(data);
    },

    /**
     * 修改属性descriptor
     * @description Object.keys仅返回自有可枚举属性,Object.getOwnPropertyNames返回包括不可枚举属性
     * @see {@link https://stackoverflow.com/questions/40352613/why-does-object-keys-and-object-getownpropertynames-produce-different-output}
     * @return {Object|undefined}
     */
    getOwnPropertyDescriptor(target, name) {
      const data = read(engine, item);

      if (
        data === null
        || typeof data !== 'object'
        || !{}.hasOwnProperty.call(data, name)
      ) {
        return undefined;
      }

      return {
        configurable: true,
        enumerable: true,
      };
    },

    /**
     * in操作符
     */
    has(target, name) {
      const data = read(engine, item);

      if (
        data === null
        || typeof data !== 'object'
        || !{}.hasOwnProperty.call(data, name)
      ) {
        return false;
      }

      return true;
    },
  });
};

export default storage;
