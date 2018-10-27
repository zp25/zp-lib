/**
 * @module api
 * @description 接口
 */

const MIME_JSON = 'application/json';
const MIME_FORMDATA = 'multipart/form-data';

/**
 * 错误处理，例如404
 * @param {Response} res - 服务器响应
 * @return {(Response|Promise)}
 * @private
 */
const handleError = (res) => {
  // const { ok, statusText } = res;
  const { ok, status } = res;

  if (ok) {
    return res;
  }

  // status替代statusText
  // 因为res.body有message字段描述错误，但没有status/code字段
  const err = new Error(status);

  return res.json().then((body) => {
    err.body = body;

    return Promise.reject(err);
  });
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
 * 整理请求数据
 * @param {(FormData|JSON)} body
 * @return {Object}
 * @private
 */
const reqData = (body) => {
  if (body instanceof FormData) {
    return {
      mime: MIME_FORMDATA,
      data: body,
    };
  }

  return {
    mime: MIME_JSON,
    data: JSON.stringify(body),
  };
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

  const { mime, data } = reqData(body);

  const h = new Headers(headers);
  h.set('Content-Type', mime);
  h.set('Accept', MIME_JSON);

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
  h.set('Accept', MIME_JSON);

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
 * @param {Object} init - 额外参数
 * @param {Object} init.headers
 * @param {(FormData|JSON)} init.body
 * @param {string} init.mode
 * @return {Promise}
 */
const put = (input, init = {}) => {
  const {
    headers,
    body = '',
    mode = 'no-cors',
  } = init;

  const { mime, data } = reqData(body);

  const h = new Headers(headers);
  h.set('Content-Type', mime);
  h.set('Accept', MIME_JSON);

  return fetch(input, {
    method: 'PUT',
    headers: h,
    body: data,
    mode,
  })
    .then(handleError)
    .then(handleContent);
};

/**
 * 删
 * @function delete
 * @param {string} input - 请求URL
 * @param {Object} init - 额外参数
 * @param {Object} init.headers
 * @param {string} init.mode
 * @return {Promise}
 */
const del = (input, init = {}) => {
  const { headers, mode = 'no-cors' } = init;

  const h = new Headers(headers);
  h.set('Accept', MIME_JSON);

  return fetch(input, {
    method: 'DELETE',
    headers: h,
    mode,
  })
    .then(handleError)
    .then(handleContent);
};

/**
 * api
 * @type {Object}
 * @ignore
 */
const api = {
  post,
  get,
  put,
  delete: del,
};

export default api;
