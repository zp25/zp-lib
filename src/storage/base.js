/**
 * 读取localStorage/sessionStorage
 * @param {localStorage|sessionStorage} store - 存储方式
 * @param {string} key
 * @return {(Object|string|null)} 若没有匹配key，返回null
 * @ignore
 */
const read = (store, key) => {
  const data = store.getItem(key);

  try {
    return JSON.parse(data);
  } catch {
    return data;
  }
};

/**
 * 写入localStorage/sessionStorage
 * @param {localStorage|sessionStorage} store - 存储方式
 * @param {*} data - 可序列化数据
 * @ignore
 */
const save = (store, key, data) => store.setItem(key, JSON.stringify(data));

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

export {
  read,
  save,
  StorageTypeError,
};
