"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,r){for(var t=0;t<r.length;t++){var o=r[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function _createClass(e,r,t){return r&&_defineProperties(e.prototype,r),t&&_defineProperties(e,t),e}function _defineProperty(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,o)}return t}function _objectSpread2(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(t,!0).forEach(function(r){_defineProperty(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(t).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}function _objectWithoutPropertiesLoose(e,r){if(null==e)return{};var t,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],r.indexOf(t)>=0||(n[t]=e[t]);return n}function _objectWithoutProperties(e,r){if(null==e)return{};var t,o,n=_objectWithoutPropertiesLoose(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)t=a[o],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}function _slicedToArray(e,r){return _arrayWithHoles(e)||_iterableToArrayLimit(e,r)||_nonIterableRest()}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_nonIterableSpread()}function _arrayWithoutHoles(e){if(Array.isArray(e)){for(var r=0,t=new Array(e.length);r<e.length;r++)t[r]=e[r];return t}}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _iterableToArray(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function _iterableToArrayLimit(e,r){var t=[],o=!0,n=!1,a=void 0;try{for(var i,s=e[Symbol.iterator]();!(o=(i=s.next()).done)&&(t.push(i.value),!r||t.length!==r);o=!0);}catch(e){n=!0,a=e}finally{try{o||null==s.return||s.return()}finally{if(n)throw a}}return t}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}Object.defineProperty(exports,"__esModule",{value:!0});var MIME_JSON="application/json";function ResponseNotOkError(e,r){this.code=e,this.name="ResponseNotOkError",this.message=r||"Response not Ok"}function ResponseNotJSONError(e){this.name="ResponseNotJSONError",this.message=e||"Response not JSON Error"}ResponseNotOkError.prototype=Object.create(Error.prototype),ResponseNotOkError.prototype.constructor=ResponseNotOkError,ResponseNotJSONError.prototype=Object.create(Error.prototype),ResponseNotJSONError.prototype.constructor=ResponseNotJSONError;var handleError=function(e){var r=e.ok,t=e.status,o=e.statusText;if(r)return e;var n=new ResponseNotOkError(t,o);return Promise.reject(n)},handleContent=function(e){var r=e.headers.get("content-type");if(new RegExp(MIME_JSON,"i").test(r))return e.json();var t=new ResponseNotJSONError;return Promise.reject(t)},fetchProcess=function(e,r){return fetch(e,r).then(handleError).then(handleContent)},reqHeadersAndBody=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.headers,t=void 0===r?{}:r,o=e.body,n=new Headers(t);return n.set("accept",MIME_JSON),void 0===o?{headers:n}:o instanceof FormData?{headers:n,body:o}:(n.set("content-type",MIME_JSON),{headers:n,body:JSON.stringify(o)})},post=function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=r.headers,o=r.body,n=void 0===o?"":o,a=r.mode,i=void 0===a?"no-cors":a,s=_objectWithoutProperties(r,["headers","body","mode"]);return fetchProcess(e,_objectSpread2({},s,{method:"POST"},reqHeadersAndBody({headers:t,body:n}),{mode:i}))},get=function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=r.headers,o=r.mode,n=void 0===o?"no-cors":o,a=_objectWithoutProperties(r,["headers","mode"]);return fetchProcess(e,_objectSpread2({},a,{method:"GET"},reqHeadersAndBody({headers:t}),{mode:n}))},put=function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=r.headers,o=r.body,n=void 0===o?"":o,a=r.mode,i=void 0===a?"no-cors":a,s=_objectWithoutProperties(r,["headers","body","mode"]);return fetchProcess(e,_objectSpread2({},s,{method:"PUT"},reqHeadersAndBody({headers:t,body:n}),{mode:i}))},del=function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=r.headers,o=r.mode,n=void 0===o?"no-cors":o,a=_objectWithoutProperties(r,["headers","mode"]);return fetchProcess(e,_objectSpread2({},a,{method:"DELETE"},reqHeadersAndBody({headers:t}),{mode:n}))},api={post:post,get:get,put:put,delete:del},encodeBase64=function(e){return window.btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g,function(e,r){return String.fromCharCode("0x".concat(r))}))},decodeBase64=function(e){return decodeURIComponent(Array.from(window.atob(e)).map(function(e){return"%".concat("00".concat(e.charCodeAt(0).toString(16)).slice(-2))}).join(""))},bindCustomEvent=function(e){new Map(Object.entries(e)).forEach(function(e,r){document.addEventListener(r,e,!1)})},createAction=function(e,r,t){var o="function"==typeof r?r:function(e){return e},n="function"==typeof t,a=e.toString(),i=function(){var r=o.apply(void 0,arguments),a={type:e};return r instanceof Error&&(a.error=!0),void 0!==r&&(a.payload=r),n&&(a.meta=t.apply(void 0,arguments)),a};return i.toString=function(){return a},i},createReducer=function(e,r){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e,o=arguments.length>1?arguments[1]:void 0,n=o.type;return{}.hasOwnProperty.call(r,n)?r[n](t,o):t}},dispatch=function(e){return function(r){var t=r.target.dataset.trigger;t&&{}.hasOwnProperty.call(e,t)&&e[t](r)}},escapeHTML=function(e){var r={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"};return e.replace(/[&<>"']/g,function(e){return r[e]})},machine=function(e){return function(r){return function(t){var o=e[r];return!(!o||!{}.hasOwnProperty.call(o,t))&&o[t]}}},searchParams=function(e){if("function"==typeof URLSearchParams){var r=new URLSearchParams(e);return Object.fromEntries(_toConsumableArray(r).map(function(e){var r=_slicedToArray(e,2);return[r[0],r[1]||!0]}))}for(var t=/([^?&=]+)=?([^&]*)/g,o={},n="";n=t.exec(e);)o=_objectSpread2({},o,_defineProperty({},n[1],!n[2]||decodeURIComponent(n[2])));return o},read=function(e,r){var t=e.getItem(r);try{return JSON.parse(t)}catch(e){return t}},save=function(e,r,t){return e.setItem(r,JSON.stringify(t))};function StorageTypeError(e){this.name="StorageTypeError",this.message=e||"Storage Type Error"}StorageTypeError.prototype=Object.create(Error.prototype),StorageTypeError.prototype.constructor=StorageTypeError;var storage=function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=r.engine,o=void 0===t?localStorage:t,n=r.forceUpdate,a=void 0===n||n,i=function(r){var t=read(o,e);if(null!==t&&"object"===_typeof(t))return t[r]},s=function(r,t){var n=read(o,e);if(null===n)return save(o,e,_defineProperty({},r,t));if("object"!==_typeof(n)){if(!a)throw new StorageTypeError;return save(o,e,_defineProperty({},r,t))}return save(o,e,_objectSpread2({},n,_defineProperty({},r,t)))},c=function(r){var t=read(o,e);if(null===t)return save(o,e,{});if("object"!==_typeof(t)){if(!a)throw new StorageTypeError;return save(o,e,{})}var n=Object.entries(t).reduce(function(e,t){var o=_slicedToArray(t,2),n=o[0],a=o[1];return n===r?e:_objectSpread2({},e,_defineProperty({},n,a))},{});return save(o,e,n)},u=function(){var r=read(o,e);return null===r||"object"!==_typeof(r)?[]:Object.keys(r)};return{get:i,set:s,delete:c,keys:u}},storage$1=function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=r.engine,o=void 0===t?localStorage:t,n=r.forceUpdate,a=void 0===n||n;return new Proxy({},{get:function(r,t){var n=read(o,e);if(null!==n&&"object"===_typeof(n))return n[t]},set:function(r,t,n){var i=read(o,e);if(null===i)return save(o,e,_defineProperty({},t,n)),!0;if("object"!==_typeof(i)){if(!a)throw new StorageTypeError;return save(o,e,_defineProperty({},t,n)),!0}return save(o,e,_objectSpread2({},i,_defineProperty({},t,n))),!0},deleteProperty:function(r,t){var n=read(o,e);if(null===n)return save(o,e,{}),!0;if("object"!==_typeof(n)){if(!a)throw new StorageTypeError;return save(o,e,{}),!0}var i=Object.entries(n).reduce(function(e,r){var o=_slicedToArray(r,2),n=o[0],a=o[1];return n===t?e:_objectSpread2({},e,_defineProperty({},n,a))},{});return save(o,e,i),!0},ownKeys:function(){var r=read(o,e);return null===r||"object"!==_typeof(r)?[]:Object.keys(r)},getOwnPropertyDescriptor:function(r,t){var n=read(o,e);if(null!==n&&"object"===_typeof(n)&&{}.hasOwnProperty.call(n,t))return{configurable:!0,enumerable:!0}},has:function(r,t){var n=read(o,e);return!(null===n||"object"!==_typeof(n)||!{}.hasOwnProperty.call(n,t))}})};function InvalidObserverError(e){this.name="InvalidObserverError",this.message=e||"Invalid Observer Error"}InvalidObserverError.prototype=Object.create(Error.prototype),InvalidObserverError.prototype.constructor=InvalidObserverError;var Subject=function(){function e(){_classCallCheck(this,e),_defineProperty(this,"_observers",[]),_defineProperty(this,"_state",{})}return _createClass(e,[{key:"attach",value:function(e){var r=this;return(Array.isArray(e)?e:[e]).forEach(function(e){if(!r.constructor.isValidObserver(e))throw new InvalidObserverError;r._observers.includes(e)||r._observers.push(e)}),this._observers.length}},{key:"detach",value:function(e){var r=Array.isArray(e)?e:[e];return this._observers=this._observers.filter(function(e){return!r.includes(e)}),this._observers.length}},{key:"setState",value:function(e){var r=this.state;this._state=_objectSpread2({},r,{},e),this.notify(r)}},{key:"notify",value:function(e){var r=this;this._observers.forEach(function(t){r.constructor.isValidObserver(t)&&t.update(r.state,e)})}},{key:"observers",get:function(){return this._observers}},{key:"state",get:function(){return _objectSpread2({},this._state)},set:function(e){if("object"!==_typeof(e)||!e)throw new TypeError("not an Object");this._state=_objectSpread2({},e)}}],[{key:"isValidObserver",value:function(e){return!(!e||"object"!==_typeof(e)||"function"!=typeof e.update)}}]),e}(),Observer=function(){function e(r){_classCallCheck(this,e),r instanceof Subject&&r.attach(this)}return _createClass(e,[{key:"update",value:function(e){if(e instanceof Subject)return e.state}}]),e}(),core=function(e){return function(r){return"function"==typeof r?r(e[r.displayName]):"object"===_typeof(r)?r.content(e[r.name]):void 0===e[r]?r:e[r]}},templater=function(e){for(var r=arguments.length,t=new Array(r>1?r-1:0),o=1;o<r;o++)t[o-1]=arguments[o];return function(r){return(Array.isArray(r)?r:[r]).map(function(r){var o=core(r);return t.reduce(function(r,t,n){return r+o(t)+e[n+1]},e[0])}).join("")}},templaterAsync=function(e){for(var r=arguments.length,t=new Array(r>1?r-1:0),o=1;o<r;o++)t[o-1]=arguments[o];return function(r){var o=Array.isArray(r)?r:[r];return Promise.all(o.map(function(r){var o=core(r);return Promise.all(t.map(o)).then(function(r){return r.reduce(function(r,t,o){return r+t+e[o+1]},e[0])})})).then(function(e){return e.join("")})}};storage.proxy=storage$1,exports.Observer=Observer,exports.Subject=Subject,exports.api=api,exports.bindCustomEvent=bindCustomEvent,exports.createAction=createAction,exports.createReducer=createReducer,exports.decodeBase64=decodeBase64,exports.dispatch=dispatch,exports.encodeBase64=encodeBase64,exports.escapeHTML=escapeHTML,exports.machine=machine,exports.searchParams=searchParams,exports.storage=storage,exports.templater=templater,exports.templaterAsync=templaterAsync;
//# sourceMappingURL=index.cjs.js.map
