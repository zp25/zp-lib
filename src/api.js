/**
 * @module api
 * @description 接口
 */

import 'whatwg-fetch';

/**
 * @typedef {Object} api
 * @property {function} post - POST方法
 * @property {function} get - GET方法
 */

/**
 * @return {api}
 */
export default (() => {
  /**
   * 错误处理，例如404
   * @param {Response} res - 服务器响应
   * @return {(Response|Promise)}
   * @private
   */
  const handleError = (res) => {
    const { ok, statusText } = res;

    return ok ? res : Promise.reject(new Error(statusText));
  };

  /**
   * 数据类型过滤，仅接收JSON
   * @param {Response} res - 服务器响应
   * @return {(Response|Promise)}
   * @private
   */
  const handleContent = (res) => {
    const contentType = res.headers.get('content-type');

    if (/application\/json/i.test(contentType)) {
      return res.json();
    }

    return Promise.reject(new Error('Not a JSON'));
  };

  /**
   * 增
   * @param {string} input - 请求URL
   * @param {Object} data - 提交数据
   * @return {Promise}
   */
  const post = (input, data) => (
    fetch(input, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      data: JSON.stringify(data),
    })
      .then(handleError)
      .then(handleContent)
  );

  /**
   * 查
   * @param {string} input - 请求URL
   * @return {Promise}
   */
  const get = input => (
    fetch(input, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
      }),
    })
      .then(handleError)
      .then(handleContent)
  );

  /**
   * 改
   * @param {string} input - 请求URL
   * @return {Promise}
   */
  // const put = input => Promise.resolve('done');

  /**
   * 删
   * @param {string} input - 请求URL
   * @return {Promise}
   */
  // const del = input => Promise.resolve('done');

  return {
    post,
    get,
    // put,
    // delete: del,
  };
})();
