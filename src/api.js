/**
 * @module api
 * @description API Abstraction，请求数据仅支持json和form-data，响应数据仅支持json
 */

const MIME_JSON = 'application/json';
const MIME_FORMDATA = 'multipart/form-data';

/**
 * res.ok非true
 * @param {string} message
 * @ignore
 */
function ResponseNotOkError(message) {
  this.name = 'ResponseNotOkError';
  this.message = message || 'Response not Ok Error';
}

ResponseNotOkError.prototype = Object.create(Error.prototype);
ResponseNotOkError.prototype.constructor = ResponseNotOkError;

/**
 * res.body数据格式不规范错误
 * @param {string} message
 * @ignore
 */
function ResponseNotJSONError(message) {
  this.name = 'ResponseNotJSONError';
  this.message = message || 'Response not JSON Error';
}

ResponseNotJSONError.prototype = Object.create(Error.prototype);
ResponseNotJSONError.prototype.constructor = ResponseNotJSONError;

/**
 * 错误处理，例如404
 * @param {Response} res - 服务器响应
 * @return {(Response|Promise)}
 * @private
 */
const handleError = (res) => {
  const {
    ok,
    status,
    statusText,
  } = res;

  if (ok) {
    return res;
  }

  const err = new ResponseNotOkError(`${status} - ${statusText}`);

  return Promise.reject(err);
};

/**
 * 数据类型过滤，仅接收JSON
 * @param {Response} res - 服务器响应
 * @return {Promise}
 * @private
 */
const handleContent = (res) => {
  const contentType = res.headers.get('content-type');
  const isJson = new RegExp(MIME_JSON, 'i');

  if (isJson.test(contentType)) {
    return res.json();
  }

  const err = new ResponseNotJSONError();

  return Promise.reject(err);
};

/**
 * fetch统一逻辑
 * @description 处理非网络错误、要求res必须是application/json
 * @param {(Request|string)} input - 请求地址
 * @param {Object} init - fetch配置
 * @return {Promise}
 * @private
 */
const fetchProcess = (input, init) => (
  fetch(input, init)
    .then(handleError)
    .then(handleContent)
);

/**
 * 整理请求数据，返回mime类型和规范的data格式
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
 * 整理请求实体，添加必要的Header
 * @param {Object} init
 * @param {Object} [init.headers]
 * @param {(FormData|JSON)} [init.body]
 * @return {Object}
 * @private
 */
const reqHeadersAndBody = (init = {}) => {
  const {
    headers = {},
    body,
  } = init;

  // edge传入undefined报参数无效错误, headers改为空对象
  const h = new Headers(headers);
  h.set('Accept', MIME_JSON);

  if (typeof body === 'undefined') {
    return {
      headers: h,
    };
  }

  const { mime, data } = reqData(body);
  h.set('Content-Type', mime);

  return {
    headers: h,
    body: data,
  };
};

/**
 * 增
 * @param {string} input - 请求URL
 * @param {Object} init - 额外参数
 * @param {Object} [init.headers]
 * @param {(FormData|JSON)} [init.body]
 * @param {string} [init.mode]
 * @return {Promise}
 */
const post = (input, init = {}) => {
  const {
    headers,
    body = '',
    mode = 'no-cors',
    ...rest
  } = init;

  return fetchProcess(input, {
    ...rest,
    method: 'POST',
    ...reqHeadersAndBody({ headers, body }),
    mode,
  });
};

/**
 * 查
 * @param {string} input - 请求URL
 * @param {Object} init - 额外参数
 * @param {Object} [init.headers]
 * @param {string} [init.mode]
 * @return {Promise}
 */
const get = (input, init = {}) => {
  const {
    headers,
    mode = 'no-cors',
    ...rest
  } = init;

  return fetchProcess(input, {
    ...rest,
    method: 'GET',
    ...reqHeadersAndBody({ headers }),
    mode,
  });
};

/**
 * 改
 * @param {string} input - 请求URL
 * @param {Object} init - 额外参数
 * @param {Object} [init.headers]
 * @param {(FormData|JSON)} [init.body]
 * @param {string} [init.mode]
 * @return {Promise}
 */
const put = (input, init = {}) => {
  const {
    headers,
    body = '',
    mode = 'no-cors',
    ...rest
  } = init;

  return fetchProcess(input, {
    ...rest,
    method: 'PUT',
    ...reqHeadersAndBody({ headers, body }),
    mode,
  });
};

/**
 * 删
 * @function delete
 * @param {string} input - 请求URL
 * @param {Object} init - 额外参数
 * @param {Object} [init.headers]
 * @param {string} [init.mode]
 * @return {Promise}
 */
const del = (input, init = {}) => {
  const {
    headers,
    mode = 'no-cors',
    ...rest
  } = init;

  return fetchProcess(input, {
    ...rest,
    method: 'DELETE',
    ...reqHeadersAndBody({ headers }),
    mode,
  });
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
export {
  ResponseNotOkError,
  ResponseNotJSONError,
  handleError,
  handleContent,
  reqData,
  reqHeadersAndBody,
};
