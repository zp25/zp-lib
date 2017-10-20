'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('babel-polyfill/lib/core-js/modules/es6.promise');
require('whatwg-fetch');
require('babel-polyfill/lib/core-js/modules/es6.array.from');
require('babel-polyfill/lib/core-js/modules/es6.regexp.replace');
require('babel-polyfill/lib/core-js/modules/es7.object.entries');
require('babel-polyfill/lib/core-js/modules/es6.map');
require('babel-polyfill/lib/core-js/modules/es6.object.assign');

/**
 * @module api
 * @description 接口
 */
var buildAPI = function buildAPI() {
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
};

var api = buildAPI();

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

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    var _typeof = _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    var _typeof = _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var _typeof = _typeof;




function AwaitValue(value) {
  this.value = value;
}

function AsyncGenerator(gen) {
  var front, back;

  function send(key, arg) {
    return new Promise(function (resolve, reject) {
      var request = {
        key: key,
        arg: arg,
        resolve: resolve,
        reject: reject,
        next: null
      };

      if (back) {
        back = back.next = request;
      } else {
        front = back = request;
        resume(key, arg);
      }
    });
  }

  function resume(key, arg) {
    try {
      var result = gen[key](arg);
      var value = result.value;

      if (value instanceof AwaitValue) {
        Promise.resolve(value.value).then(function (arg) {
          resume("next", arg);
        }, function (arg) {
          resume("throw", arg);
        });
      } else {
        settle(result.done ? "return" : "normal", result.value);
      }
    } catch (err) {
      settle("throw", err);
    }
  }

  function settle(type, value) {
    switch (type) {
      case "return":
        front.resolve({
          value: value,
          done: true
        });
        break;

      case "throw":
        front.reject(value);
        break;

      default:
        front.resolve({
          value: value,
          done: false
        });
        break;
    }

    front = front.next;

    if (front) {
      resume(front.key, front.arg);
    } else {
      back = null;
    }
  }

  this._invoke = send;

  if (typeof gen.return !== "function") {
    this.return = undefined;
  }
}

if (typeof Symbol === "function" && Symbol.asyncIterator) {
  AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
    return this;
  };
}

AsyncGenerator.prototype.next = function (arg) {
  return this._invoke("next", arg);
};

AsyncGenerator.prototype.throw = function (arg) {
  return this._invoke("throw", arg);
};

AsyncGenerator.prototype.return = function (arg) {
  return this._invoke("return", arg);
};

/**
 * @module templater
 * @description 模版引擎
 * @example <caption>通过string查找</caption>
 * const template = templater`
 *   <p class="content">${'content'}</p>
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
 * const context = { content: ['A', 'B', 'C'] };
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
          replace = d[key];
        }

        return strs[i] + replace;
      }).join('') + strs[lastIndex];
    });
    return dataArr.join('');
  };
});

exports.api = api;
exports.encodeBase64 = encodeBase64;
exports.decodeBase64 = decodeBase64;
exports.bindCustomEvent = bindCustomEvent;
exports.dispatch = dispatch;
exports.templater = templater;
//# sourceMappingURL=index.cjs.js.map
