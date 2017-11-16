import 'core-js/modules/es6.promise';
import 'whatwg-fetch';
import 'core-js/modules/es6.array.from';
import 'core-js/modules/es6.regexp.replace';
import 'core-js/modules/es7.object.entries';
import 'core-js/modules/es6.map';
import 'core-js/modules/es6.function.name';
import 'core-js/modules/es6.object.assign';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

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

var api = (function () {
  /**
   * 错误处理，例如404
   * @param {Response} res - 服务器响应
   * @return {(Response|Promise)}
   * @private
   */
  var handleError = function handleError(res) {
    var ok = res.ok,
        statusText = res.statusText;
    return ok ? res : Promise.reject(new Error(statusText));
  };
  /**
   * 数据类型过滤，仅接收JSON
   * @param {Response} res - 服务器响应
   * @return {(Response|Promise)}
   * @private
   */


  var handleContent = function handleContent(res) {
    var contentType = res.headers.get('content-type');

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


  var post = function post(input, data) {
    return fetch(input, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      data: JSON.stringify(data)
    }).then(handleError).then(handleContent);
  };
  /**
   * 查
   * @param {string} input - 请求URL
   * @return {Promise}
   */


  var get = function get(input) {
    return fetch(input, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json'
      })
    }).then(handleError).then(handleContent);
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
    post: post,
    get: get // put,
    // delete: del,

  };
})();

/**
 * base64编码
 * @param  {string} str 需编码字符串
 * @return {string}
 */
var encodeBase64 = function encodeBase64(str) {
  return window.btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode("0x".concat(p1));
  }));
};
/**
 * base64解码
 * @param  {string} str 需解码字符串，原字符串需utf-8编码
 * @return {string}
 */


var decodeBase64 = function decodeBase64(str) {
  return decodeURIComponent(Array.from(window.atob(str)).map(function (c) {
    return "%".concat("00".concat(c.charCodeAt(0).toString(16)).slice(-2));
  }).join(''));
};

/**
 * @module bindCustomEvent
 * @description 绑定自定义事件
 * @param {Object.<string, function>} obj - 自定义事件和处理函数映射表
 * @example  <caption>传入自定义事件名和处理函数的映射表</caption>
 * function customEventTrigger(type, data) {
 *   const event = new CustomEvent(type, {
 *     detail: data || { name: type },
 *   });
 *
 *   window.dispatchEvent(event);
 * }
 *
 * function eventATrigger(data) {
 *   customEventTrigger('eventA', { data });
 * }
 * @example
 * const customEvents = {
 *   eventA: (e) => {
 *     const { data } = e.detail;
 *
 *     console.log(data);
 *   },
 * };
 *
 * bindCustomEvent(customEvents);
 *
 * eventATrigger({ data: true });
 */
var bindCustomEvent = (function (obj) {
  var eventMap = new Map(Object.entries(obj));
  eventMap.forEach(function (handler, event) {
    window.addEventListener(event, handler, false);
  });
});

/**
 * @module dispatch
 * @description 事件分发
 * @param {Object.<string, function>} handlers - 事件处理函数组成的对象
 * @return {function} 分发函数
 * @example  <caption>事件代理利用e.target.dataset.trigger查找handlers中匹配处理函数</caption>
 * <ul class="anchor-list">
 *   <li><a href="#linkA" data-trigger="link" data-value="A">Link A</a></li>
 *   <li><a href="#linkB" data-trigger="link" data-value="B">Link B</a></li>
 *   <li><a href="#linkC" data-trigger="link" data-value="C">Link C</a></li>
 * </ul>
 * @example
 * const createClickHandlers = () => {
 *   const link = (e) => {
 *     const { value } = e.target.dataset;
 *
 *     alert(value);
 *   };
 *
 *   return {
 *     link,
 *   };
 * };
 *
 * const clickHandlers = createClickHandlers();
 * document.body.addEventListener('click', dispatch(clickHandlers), false);
 */
var dispatch = (function (handlers) {
  return function (e) {
    var trigger = e.target.dataset.trigger;

    if (trigger && {}.hasOwnProperty.call(handlers, trigger)) {
      handlers[trigger](e);
    }
  };
});

/**
 * @module templater
 * @description 模版引擎
 * @example <caption>通过string查找</caption>
 * const template = templater`
 *   <div class="content">
 *     <p>${'content'}</p>
 *     <p>${'nil'}</p>
 *   </div>
 * `;
 *
 * const context = { content: 'Hello World' };
 * const result = template(context);
 *
 * document.querySelector('#target').insertAdjacentHTML('beforeend', result);
 *
 * @example <caption>通过function查找，注意设置函数的displayName属性为data对应的key</caption>
 * const content = data => (
 *   Array.isArray(data) ?
 *     data.reduce((prev, d) => `${prev}<p>${d}</p>`, '') :
 *     `<p>${data}</p>`
 * );
 * content.displayName = 'content';
 *
 * const template = templater`
 *   <div class="content">${content}</div>
 * `;
 *
 * const context = { content: ['foo', 'bar', 'baz'] };
 * const result = template(context);
 *
 * document.querySelector('#target').insertAdjacentHTML('beforeend', result);
 *
 * @example <caption>通过object查找，若function的displayName和data的key不匹配，设置{ name, content }映射关系</caption>
 * const content = () => ({
 *   name: 'key',
 *   content: data => data,
 * });
 *
 * const template = templater`
 *   <p class="content">${content()}</p>
 * `;
 *
 * const context = { key: 'foo' };
 * const result = template(context);
 *
 * document.querySelector('#target').insertAdjacentHTML('beforeend', result);
 *
 * @example <caption>通过object查找的另一种用法</caption>
 * const content = (type) => {
 *   const foo = {
 *     name: 'keyA',
 *     content: data => `content A: ${data}`,
 *   };
 *
 *   const bar = {
 *     name: 'keyB',
 *     content: data => `content B: ${data}`,
 *   };
 *
 *   return type === 1 ? foo : bar;
 * };
 *
 * const template = templater`
 *   <div class="content">
 *     <p>${content(1)}</p>
 *     <p>${content()}</p>
 *   </div>
 * `;
 *
 * const context = { keyA: 'foo', keyB: 'bar' };
 * const result = template(context);
 *
 * document.querySelector('#target').insertAdjacentHTML('beforeend', result);
 */
var templater = (function (strs) {
  for (var _len = arguments.length, keys = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keys[_key - 1] = arguments[_key];
  }

  return function (data) {
    var arr = Array.isArray(data) ? data.slice() : [Object.assign({}, data)];
    var lastIndex = strs.length - 1;
    var dataArr = arr.map(function (d) {
      return keys.map(function (key, i) {
        var replace = '';

        if (typeof key === 'function') {
          replace = key(d[key.displayName]);
        } else if (_typeof(key) === 'object') {
          replace = key.content(d[key.name]);
        } else {
          replace = d[key] === undefined ? key : d[key];
        }

        return strs[i] + replace;
      }).join('') + strs[lastIndex];
    });
    return dataArr.join('');
  };
});

export { api, encodeBase64, decodeBase64, bindCustomEvent, dispatch, templater };
//# sourceMappingURL=index.esm.js.map
