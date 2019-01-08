/**
 * @typedef {Object} storage
 * @property {function} get - 读数据
 * @property {function} set - 写数据
 * @property {function} remove - 删数据
 * @description 不知道怎么写
 */

/**
 * 读取localStorage
 * @param {string} key
 * @return {(Object|string|null)} 若没有匹配key，返回null
 * @description 读取，没有匹配项返回null
 * @ignore
 */
const read = key => JSON.parse(localStorage.getItem(key));

/**
 * 写入localStorage
 * @param {*} data - 可序列化数据
 * @ignore
 */
const save = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

/**
 * 自定义错误
 * @param {string} message
 * @ignore
 */
function StorageTypeError(message) {
  this.name = 'StorageTypeError';
  this.message = message || 'Storage Type Error';
}

StorageTypeError.prototype = Object.create(Error.prototype);
StorageTypeError.prototype.constructor = StorageTypeError;

/**
 * @module storage
 * @description 主要为了统一存取格式。如果遇到不统一格式，读取总是返回undefined，写入会强制替换
 * @param {string} item - 标记
 * @param {boolean} [forceUpdate=true] - 默认若格式不统一，会覆盖原先值。设置false不强制覆盖，总是抛出错误
 * @return {storage}
 */
const storage = (item, forceUpdate = true) => {
  /**
   * 读数据
   * @param {string} key
   * @throws {StorageTypeError}
   */
  const get = (key) => {
    const data = read(item);

    // 区分未设置的item
    if (data === null) {
      return null;
    }

    if (typeof data !== 'object') {
      if (!forceUpdate) {
        throw new StorageTypeError();
      }

      save(item, {});
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
    let data = read(item);

    if (typeof data !== 'object') {
      if (!forceUpdate) {
        throw new StorageTypeError();
      }

      data = null;
    }

    data = Object.assign({}, data, {
      [key]: val,
    });

    save(item, data);
  };

  /**
   * 删数据
   * @param {string} key
   * @return {undefined}
   * @throws {StorageTypeError}
   */
  const del = (key) => {
    let data = read(item);

    if (data === null) {
      data = {};
    }

    if (typeof data !== 'object') {
      if (!forceUpdate) {
        throw new StorageTypeError();
      }

      data = {};
    }

    const rest = Object.entries(data).reduce((prev, [k, v]) => {
      if (k === key) {
        return prev;
      }

      return Object.assign({}, prev, { [k]: v });
    }, {});

    save(item, rest);
  };

  /**
   * 查看keys
   * @return {Array.<string>|null}
   * @throws {StorageTypeError}
   */
  const keys = () => {
    const data = read(item);

    // 区分未设置的item
    if (data === null) {
      return null;
    }

    if (typeof data !== 'object') {
      if (!forceUpdate) {
        throw new StorageTypeError();
      }

      save(item, {});
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
export {
  StorageTypeError,
};
