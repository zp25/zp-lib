/**
 * @module api
 * @description 接口
 */

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
   * @param {Object} init - 额外参数
   * @param {Object} init.headers
   * @param {(FormData|JSON)} init.body
   * @param {string} init.mode
   * @return {Promise}
   */
  const post = (input, init = {}) => {
    const {
      headers,
      body = '',
      mode = 'no-cors',
    } = init;

    let data = '';
    let mime = '';
    if (body instanceof FormData) {
      data = body;
      mime = 'multipart/form-data';
    } else {
      data = JSON.stringify(body);
      mime = 'application/json';
    }

    const h = new Headers(headers);
    h.set('Content-Type', mime);
    h.set('Accept', 'application/json');

    return fetch(input, {
      method: 'POST',
      headers: h,
      body: data,
      mode,
    })
      .then(handleError)
      .then(handleContent);
  };

  /**
   * 查
   * @param {string} input - 请求URL
   * @param {Object} init - 额外参数
   * @param {Object} init.headers
   * @param {string} init.mode
   * @return {Promise}
   */
  const get = (input, init = {}) => {
    const { headers, mode = 'no-cors' } = init;

    const h = new Headers(headers);
    h.set('Accept', 'application/json');

    return fetch(input, {
      method: 'GET',
      headers: h,
      mode,
    })
      .then(handleError)
      .then(handleContent);
  };

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
