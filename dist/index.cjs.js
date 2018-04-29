'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('whatwg-fetch');

var _library = false;

var _library$1 = /*#__PURE__*/Object.freeze({
	default: _library,
	__moduleExports: _library
});

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _global$1 = /*#__PURE__*/Object.freeze({
	default: _global,
	__moduleExports: _global
});

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

var _aFunction$1 = /*#__PURE__*/Object.freeze({
	default: _aFunction,
	__moduleExports: _aFunction
});

var aFunction = ( _aFunction$1 && _aFunction ) || _aFunction$1;

// optional / simple context binding

var _ctx = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var _ctx$1 = /*#__PURE__*/Object.freeze({
	default: _ctx,
	__moduleExports: _ctx
});

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

var _cof$1 = /*#__PURE__*/Object.freeze({
	default: _cof,
	__moduleExports: _cof
});

var global$1 = ( _global$1 && _global ) || _global$1;

var SHARED = '__core-js_shared__';
var store = global$1[SHARED] || (global$1[SHARED] = {});
var _shared = function (key) {
  return store[key] || (store[key] = {});
};

var _shared$1 = /*#__PURE__*/Object.freeze({
	default: _shared,
	__moduleExports: _shared
});

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _uid$1 = /*#__PURE__*/Object.freeze({
	default: _uid,
	__moduleExports: _uid
});

var require$$0 = ( _shared$1 && _shared ) || _shared$1;

var uid = ( _uid$1 && _uid ) || _uid$1;

var _wks = createCommonjsModule(function (module) {
var store = require$$0('wks');

var Symbol = global$1.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
});

var _wks$1 = /*#__PURE__*/Object.freeze({
	default: _wks,
	__moduleExports: _wks
});

var cof = ( _cof$1 && _cof ) || _cof$1;

var require$$1 = ( _wks$1 && _wks ) || _wks$1;

// getting tag from 19.1.3.6 Object.prototype.toString()

var TAG = require$$1('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

var _classof = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

var _classof$1 = /*#__PURE__*/Object.freeze({
	default: _classof,
	__moduleExports: _classof
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var _core$1 = /*#__PURE__*/Object.freeze({
	default: _core,
	__moduleExports: _core,
	version: _core_1
});

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _isObject$1 = /*#__PURE__*/Object.freeze({
	default: _isObject,
	__moduleExports: _isObject
});

var isObject = ( _isObject$1 && _isObject ) || _isObject$1;

var _anObject = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _anObject$1 = /*#__PURE__*/Object.freeze({
	default: _anObject,
	__moduleExports: _anObject
});

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

var _fails$1 = /*#__PURE__*/Object.freeze({
	default: _fails,
	__moduleExports: _fails
});

var require$$1$1 = ( _fails$1 && _fails ) || _fails$1;

// Thank's IE8 for his funny defineProperty
var _descriptors = !require$$1$1(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var _descriptors$1 = /*#__PURE__*/Object.freeze({
	default: _descriptors,
	__moduleExports: _descriptors
});

var document$1 = global$1.document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document$1) && isObject(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};

var _domCreate$1 = /*#__PURE__*/Object.freeze({
	default: _domCreate,
	__moduleExports: _domCreate
});

var require$$0$1 = ( _descriptors$1 && _descriptors ) || _descriptors$1;

var require$$2 = ( _domCreate$1 && _domCreate ) || _domCreate$1;

var _ie8DomDefine = !require$$0$1 && !require$$1$1(function () {
  return Object.defineProperty(require$$2('div'), 'a', { get: function () { return 7; } }).a != 7;
});

var _ie8DomDefine$1 = /*#__PURE__*/Object.freeze({
	default: _ie8DomDefine,
	__moduleExports: _ie8DomDefine
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var _toPrimitive$1 = /*#__PURE__*/Object.freeze({
	default: _toPrimitive,
	__moduleExports: _toPrimitive
});

var anObject = ( _anObject$1 && _anObject ) || _anObject$1;

var IE8_DOM_DEFINE = ( _ie8DomDefine$1 && _ie8DomDefine ) || _ie8DomDefine$1;

var toPrimitive = ( _toPrimitive$1 && _toPrimitive ) || _toPrimitive$1;

var dP = Object.defineProperty;

var f = require$$0$1 ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _objectDp$1 = /*#__PURE__*/Object.freeze({
	default: _objectDp,
	__moduleExports: _objectDp,
	f: f
});

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _propertyDesc$1 = /*#__PURE__*/Object.freeze({
	default: _propertyDesc,
	__moduleExports: _propertyDesc
});

var dP$1 = ( _objectDp$1 && _objectDp ) || _objectDp$1;

var createDesc = ( _propertyDesc$1 && _propertyDesc ) || _propertyDesc$1;

var _hide = require$$0$1 ? function (object, key, value) {
  return dP$1.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var _hide$1 = /*#__PURE__*/Object.freeze({
	default: _hide,
	__moduleExports: _hide
});

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var _has$1 = /*#__PURE__*/Object.freeze({
	default: _has,
	__moduleExports: _has
});

var require$$0$2 = ( _hide$1 && _hide ) || _hide$1;

var has = ( _has$1 && _has ) || _has$1;

var require$$1$2 = ( _core$1 && _core ) || _core$1;

var _redefine = createCommonjsModule(function (module) {
var SRC = uid('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

require$$1$2.inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || require$$0$2(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || require$$0$2(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global$1) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    require$$0$2(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    require$$0$2(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
});

var _redefine$1 = /*#__PURE__*/Object.freeze({
	default: _redefine,
	__moduleExports: _redefine
});

var redefine = ( _redefine$1 && _redefine ) || _redefine$1;

var require$$0$3 = ( _ctx$1 && _ctx ) || _ctx$1;

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global$1 : IS_STATIC ? global$1[name] || (global$1[name] = {}) : (global$1[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? require$$1$2 : require$$1$2[name] || (require$$1$2[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? require$$0$3(out, global$1) : IS_PROTO && typeof out == 'function' ? require$$0$3(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) require$$0$2(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global$1.core = require$$1$2;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

var _export$1 = /*#__PURE__*/Object.freeze({
	default: _export,
	__moduleExports: _export
});

var _anInstance = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

var _anInstance$1 = /*#__PURE__*/Object.freeze({
	default: _anInstance,
	__moduleExports: _anInstance
});

// call something on iterator step with safe closing on error

var _iterCall = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

var _iterCall$1 = /*#__PURE__*/Object.freeze({
	default: _iterCall,
	__moduleExports: _iterCall
});

var _iterators = {};

var _iterators$1 = /*#__PURE__*/Object.freeze({
	default: _iterators,
	__moduleExports: _iterators
});

var Iterators = ( _iterators$1 && _iterators ) || _iterators$1;

// check on default Array iterator

var ITERATOR = require$$1('iterator');
var ArrayProto = Array.prototype;

var _isArrayIter = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

var _isArrayIter$1 = /*#__PURE__*/Object.freeze({
	default: _isArrayIter,
	__moduleExports: _isArrayIter
});

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

var _toInteger$1 = /*#__PURE__*/Object.freeze({
	default: _toInteger,
	__moduleExports: _toInteger
});

var toInteger = ( _toInteger$1 && _toInteger ) || _toInteger$1;

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var _toLength$1 = /*#__PURE__*/Object.freeze({
	default: _toLength,
	__moduleExports: _toLength
});

var classof = ( _classof$1 && _classof ) || _classof$1;

var ITERATOR$1 = require$$1('iterator');

var core_getIteratorMethod = require$$1$2.getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$1]
    || it['@@iterator']
    || Iterators[classof(it)];
};

var core_getIteratorMethod$1 = /*#__PURE__*/Object.freeze({
	default: core_getIteratorMethod,
	__moduleExports: core_getIteratorMethod
});

var call = ( _iterCall$1 && _iterCall ) || _iterCall$1;

var isArrayIter = ( _isArrayIter$1 && _isArrayIter ) || _isArrayIter$1;

var toLength = ( _toLength$1 && _toLength ) || _toLength$1;

var getIterFn = ( core_getIteratorMethod$1 && core_getIteratorMethod ) || core_getIteratorMethod$1;

var _forOf = createCommonjsModule(function (module) {
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = require$$0$3(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;
});

var _forOf$1 = /*#__PURE__*/Object.freeze({
	default: _forOf,
	__moduleExports: _forOf
});

// 7.3.20 SpeciesConstructor(O, defaultConstructor)


var SPECIES = require$$1('species');
var _speciesConstructor = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

var _speciesConstructor$1 = /*#__PURE__*/Object.freeze({
	default: _speciesConstructor,
	__moduleExports: _speciesConstructor
});

// fast apply, http://jsperf.lnkit.com/fast-apply/5
var _invoke = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

var _invoke$1 = /*#__PURE__*/Object.freeze({
	default: _invoke,
	__moduleExports: _invoke
});

var document$2 = global$1.document;
var _html = document$2 && document$2.documentElement;

var _html$1 = /*#__PURE__*/Object.freeze({
	default: _html,
	__moduleExports: _html
});

var invoke = ( _invoke$1 && _invoke ) || _invoke$1;

var require$$2$1 = ( _html$1 && _html ) || _html$1;

var process = global$1.process;
var setTask = global$1.setImmediate;
var clearTask = global$1.clearImmediate;
var MessageChannel = global$1.MessageChannel;
var Dispatch = global$1.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (cof(process) == 'process') {
    defer = function (id) {
      process.nextTick(require$$0$3(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(require$$0$3(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = require$$0$3(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global$1.addEventListener && typeof postMessage == 'function' && !global$1.importScripts) {
    defer = function (id) {
      global$1.postMessage(id + '', '*');
    };
    global$1.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in require$$2('script')) {
    defer = function (id) {
      require$$2$1.appendChild(require$$2('script'))[ONREADYSTATECHANGE] = function () {
        require$$2$1.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(require$$0$3(run, id, 1), 0);
    };
  }
}
var _task = {
  set: setTask,
  clear: clearTask
};
var _task_1 = _task.set;
var _task_2 = _task.clear;

var _task$1 = /*#__PURE__*/Object.freeze({
	default: _task,
	__moduleExports: _task,
	set: _task_1,
	clear: _task_2
});

var require$$0$4 = ( _task$1 && _task ) || _task$1;

var macrotask = require$$0$4.set;
var Observer = global$1.MutationObserver || global$1.WebKitMutationObserver;
var process$1 = global$1.process;
var Promise$1 = global$1.Promise;
var isNode = cof(process$1) == 'process';

var _microtask = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process$1.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process$1.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global$1.navigator && global$1.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise$1 && Promise$1.resolve) {
    var promise = Promise$1.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global$1, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

var _microtask$1 = /*#__PURE__*/Object.freeze({
	default: _microtask,
	__moduleExports: _microtask
});

// 25.4.1.5 NewPromiseCapability(C)


function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

var f$1 = function (C) {
  return new PromiseCapability(C);
};

var _newPromiseCapability = {
	f: f$1
};

var _newPromiseCapability$1 = /*#__PURE__*/Object.freeze({
	default: _newPromiseCapability,
	__moduleExports: _newPromiseCapability,
	f: f$1
});

var _perform = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

var _perform$1 = /*#__PURE__*/Object.freeze({
	default: _perform,
	__moduleExports: _perform
});

var newPromiseCapability = ( _newPromiseCapability$1 && _newPromiseCapability ) || _newPromiseCapability$1;

var _promiseResolve = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var _promiseResolve$1 = /*#__PURE__*/Object.freeze({
	default: _promiseResolve,
	__moduleExports: _promiseResolve
});

var _redefineAll = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};

var _redefineAll$1 = /*#__PURE__*/Object.freeze({
	default: _redefineAll,
	__moduleExports: _redefineAll
});

var def = dP$1.f;

var TAG$1 = require$$1('toStringTag');

var _setToStringTag = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG$1)) def(it, TAG$1, { configurable: true, value: tag });
};

var _setToStringTag$1 = /*#__PURE__*/Object.freeze({
	default: _setToStringTag,
	__moduleExports: _setToStringTag
});

var SPECIES$1 = require$$1('species');

var _setSpecies = function (KEY) {
  var C = global$1[KEY];
  if (require$$0$1 && C && !C[SPECIES$1]) dP$1.f(C, SPECIES$1, {
    configurable: true,
    get: function () { return this; }
  });
};

var _setSpecies$1 = /*#__PURE__*/Object.freeze({
	default: _setSpecies,
	__moduleExports: _setSpecies
});

var ITERATOR$2 = require$$1('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR$2]();
  riter['return'] = function () { SAFE_CLOSING = true; };
} catch (e) { /* empty */ }

var _iterDetect = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR$2]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR$2] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

var _iterDetect$1 = /*#__PURE__*/Object.freeze({
	default: _iterDetect,
	__moduleExports: _iterDetect
});

var LIBRARY = ( _library$1 && _library ) || _library$1;

var $export$1 = ( _export$1 && _export ) || _export$1;

var anInstance = ( _anInstance$1 && _anInstance ) || _anInstance$1;

var forOf = ( _forOf$1 && _forOf ) || _forOf$1;

var speciesConstructor = ( _speciesConstructor$1 && _speciesConstructor ) || _speciesConstructor$1;

var require$$1$3 = ( _microtask$1 && _microtask ) || _microtask$1;

var perform = ( _perform$1 && _perform ) || _perform$1;

var promiseResolve = ( _promiseResolve$1 && _promiseResolve ) || _promiseResolve$1;

var redefineAll = ( _redefineAll$1 && _redefineAll ) || _redefineAll$1;

var setToStringTag = ( _setToStringTag$1 && _setToStringTag ) || _setToStringTag$1;

var setSpecies = ( _setSpecies$1 && _setSpecies ) || _setSpecies$1;

var $iterDetect = ( _iterDetect$1 && _iterDetect ) || _iterDetect$1;

var task = require$$0$4.set;
var microtask = require$$1$3();



var PROMISE = 'Promise';
var TypeError$1 = global$1.TypeError;
var process$2 = global$1.process;
var $Promise = global$1[PROMISE];
var isNode$1 = classof(process$2) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability$1 = newGenericPromiseCapability = newPromiseCapability.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[require$$1('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode$1 || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError$1('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global$1, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode$1) {
          process$2.emit('unhandledRejection', value, promise);
        } else if (handler = global$1.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global$1.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global$1, function () {
    var handler;
    if (isNode$1) {
      process$2.emit('rejectionHandled', promise);
    } else if (handler = global$1.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, require$$0$3($resolve, wrapper, 1), require$$0$3($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(require$$0$3($resolve, this, 1), require$$0$3($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = redefineAll($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability$1(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode$1 ? process$2.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = require$$0$3($resolve, promise, 1);
    this.reject = require$$0$3($reject, promise, 1);
  };
  newPromiseCapability.f = newPromiseCapability$1 = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export$1($export$1.G + $export$1.W + $export$1.F * !USE_NATIVE, { Promise: $Promise });
setToStringTag($Promise, PROMISE);
setSpecies(PROMISE);
Wrapper = require$$1$2[PROMISE];

// statics
$export$1($export$1.S + $export$1.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability$1(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export$1($export$1.S + $export$1.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export$1($export$1.S + $export$1.F * !(USE_NATIVE && $iterDetect(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability$1(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability$1(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

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

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

var _defined$1 = /*#__PURE__*/Object.freeze({
	default: _defined,
	__moduleExports: _defined
});

var defined = ( _defined$1 && _defined ) || _defined$1;

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(defined(it));
};

var _toObject$1 = /*#__PURE__*/Object.freeze({
	default: _toObject,
	__moduleExports: _toObject
});

var _createProperty = function (object, index, value) {
  if (index in object) dP$1.f(object, index, createDesc(0, value));
  else object[index] = value;
};

var _createProperty$1 = /*#__PURE__*/Object.freeze({
	default: _createProperty,
	__moduleExports: _createProperty
});

var toObject = ( _toObject$1 && _toObject ) || _toObject$1;

var createProperty = ( _createProperty$1 && _createProperty ) || _createProperty$1;

$export$1($export$1.S + $export$1.F * !$iterDetect(function (iter) { }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = require$$0$3(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

var _fixReWks = function (KEY, length, exec) {
  var SYMBOL = require$$1(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (require$$1$1(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    require$$0$2(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};

var _fixReWks$1 = /*#__PURE__*/Object.freeze({
	default: _fixReWks,
	__moduleExports: _fixReWks
});

var require$$0$5 = ( _fixReWks$1 && _fixReWks ) || _fixReWks$1;

// @@replace logic
require$$0$5('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});

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

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

var _iobject$1 = /*#__PURE__*/Object.freeze({
	default: _iobject,
	__moduleExports: _iobject
});

var IObject = ( _iobject$1 && _iobject ) || _iobject$1;

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return IObject(defined(it));
};

var _toIobject$1 = /*#__PURE__*/Object.freeze({
	default: _toIobject,
	__moduleExports: _toIobject
});

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

var _toAbsoluteIndex$1 = /*#__PURE__*/Object.freeze({
	default: _toAbsoluteIndex,
	__moduleExports: _toAbsoluteIndex
});

var toIObject = ( _toIobject$1 && _toIobject ) || _toIobject$1;

var toAbsoluteIndex = ( _toAbsoluteIndex$1 && _toAbsoluteIndex ) || _toAbsoluteIndex$1;

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var _arrayIncludes$1 = /*#__PURE__*/Object.freeze({
	default: _arrayIncludes,
	__moduleExports: _arrayIncludes
});

var shared = require$$0('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

var _sharedKey$1 = /*#__PURE__*/Object.freeze({
	default: _sharedKey,
	__moduleExports: _sharedKey
});

var require$$0$6 = ( _arrayIncludes$1 && _arrayIncludes ) || _arrayIncludes$1;

var require$$0$7 = ( _sharedKey$1 && _sharedKey ) || _sharedKey$1;

var arrayIndexOf = require$$0$6(false);
var IE_PROTO = require$$0$7('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

var _objectKeysInternal$1 = /*#__PURE__*/Object.freeze({
	default: _objectKeysInternal,
	__moduleExports: _objectKeysInternal
});

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

var _enumBugKeys$1 = /*#__PURE__*/Object.freeze({
	default: _enumBugKeys,
	__moduleExports: _enumBugKeys
});

var $keys = ( _objectKeysInternal$1 && _objectKeysInternal ) || _objectKeysInternal$1;

var enumBugKeys = ( _enumBugKeys$1 && _enumBugKeys ) || _enumBugKeys$1;

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

var _objectKeys$1 = /*#__PURE__*/Object.freeze({
	default: _objectKeys,
	__moduleExports: _objectKeys
});

var f$2 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$2
};

var _objectPie$1 = /*#__PURE__*/Object.freeze({
	default: _objectPie,
	__moduleExports: _objectPie,
	f: f$2
});

var getKeys = ( _objectKeys$1 && _objectKeys ) || _objectKeys$1;

var pIE = ( _objectPie$1 && _objectPie ) || _objectPie$1;

var isEnum = pIE.f;
var _objectToArray = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

var _objectToArray$1 = /*#__PURE__*/Object.freeze({
	default: _objectToArray,
	__moduleExports: _objectToArray
});

var require$$0$8 = ( _objectToArray$1 && _objectToArray ) || _objectToArray$1;

// https://github.com/tc39/proposal-object-values-entries

var $entries = require$$0$8(true);

$export$1($export$1.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

var _objectDps = require$$0$1 ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP$1.f(O, P = keys[i++], Properties[P]);
  return O;
};

var _objectDps$1 = /*#__PURE__*/Object.freeze({
	default: _objectDps,
	__moduleExports: _objectDps
});

var dPs = ( _objectDps$1 && _objectDps ) || _objectDps$1;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



var IE_PROTO$1 = require$$0$7('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require$$2('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require$$2$1.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE$1][enumBugKeys[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

var _objectCreate$1 = /*#__PURE__*/Object.freeze({
	default: _objectCreate,
	__moduleExports: _objectCreate
});

var create = ( _objectCreate$1 && _objectCreate ) || _objectCreate$1;

var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require$$0$2(IteratorPrototype, require$$1('iterator'), function () { return this; });

var _iterCreate = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: createDesc(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

var _iterCreate$1 = /*#__PURE__*/Object.freeze({
	default: _iterCreate,
	__moduleExports: _iterCreate
});

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


var IE_PROTO$2 = require$$0$7('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO$2)) return O[IE_PROTO$2];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

var _objectGpo$1 = /*#__PURE__*/Object.freeze({
	default: _objectGpo,
	__moduleExports: _objectGpo
});

var $iterCreate = ( _iterCreate$1 && _iterCreate ) || _iterCreate$1;

var getPrototypeOf = ( _objectGpo$1 && _objectGpo ) || _objectGpo$1;

var ITERATOR$3 = require$$1('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR$3] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR$3] != 'function') require$$0$2(IteratorPrototype, ITERATOR$3, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR$3])) {
    require$$0$2(proto, ITERATOR$3, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export$1($export$1.P + $export$1.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

var _iterDefine$1 = /*#__PURE__*/Object.freeze({
	default: _iterDefine,
	__moduleExports: _iterDefine
});

var _iterStep = function (done, value) {
  return { value: value, done: !!done };
};

var _iterStep$1 = /*#__PURE__*/Object.freeze({
	default: _iterStep,
	__moduleExports: _iterStep
});

var _meta = createCommonjsModule(function (module) {
var META = uid('meta');


var setDesc = dP$1.f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require$$1$1(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};
});
var _meta_1 = _meta.KEY;
var _meta_2 = _meta.NEED;
var _meta_3 = _meta.fastKey;
var _meta_4 = _meta.getWeak;
var _meta_5 = _meta.onFreeze;

var _meta$1 = /*#__PURE__*/Object.freeze({
	default: _meta,
	__moduleExports: _meta,
	KEY: _meta_1,
	NEED: _meta_2,
	fastKey: _meta_3,
	getWeak: _meta_4,
	onFreeze: _meta_5
});

var _validateCollection = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

var _validateCollection$1 = /*#__PURE__*/Object.freeze({
	default: _validateCollection,
	__moduleExports: _validateCollection
});

var $iterDefine = ( _iterDefine$1 && _iterDefine ) || _iterDefine$1;

var step = ( _iterStep$1 && _iterStep ) || _iterStep$1;

var meta = ( _meta$1 && _meta ) || _meta$1;

var validate = ( _validateCollection$1 && _validateCollection ) || _validateCollection$1;

var dP$2 = dP$1.f;









var fastKey = meta.fastKey;

var SIZE = require$$0$1 ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

var _collectionStrong = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = require$$0$3(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (require$$0$1) dP$2(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};
var _collectionStrong_1 = _collectionStrong.getConstructor;
var _collectionStrong_2 = _collectionStrong.def;
var _collectionStrong_3 = _collectionStrong.getEntry;
var _collectionStrong_4 = _collectionStrong.setStrong;

var _collectionStrong$1 = /*#__PURE__*/Object.freeze({
	default: _collectionStrong,
	__moduleExports: _collectionStrong,
	getConstructor: _collectionStrong_1,
	def: _collectionStrong_2,
	getEntry: _collectionStrong_3,
	setStrong: _collectionStrong_4
});

var gOPD = Object.getOwnPropertyDescriptor;

var f$3 = require$$0$1 ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

var _objectGopd = {
	f: f$3
};

var _objectGopd$1 = /*#__PURE__*/Object.freeze({
	default: _objectGopd,
	__moduleExports: _objectGopd,
	f: f$3
});

var require$$1$4 = ( _objectGopd$1 && _objectGopd ) || _objectGopd$1;

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */


var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
var _setProto = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = require$$0$3(Function.call, require$$1$4.f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
var _setProto_1 = _setProto.set;
var _setProto_2 = _setProto.check;

var _setProto$1 = /*#__PURE__*/Object.freeze({
	default: _setProto,
	__moduleExports: _setProto,
	set: _setProto_1,
	check: _setProto_2
});

var require$$0$9 = ( _setProto$1 && _setProto ) || _setProto$1;

var setPrototypeOf = require$$0$9.set;
var _inheritIfRequired = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};

var _inheritIfRequired$1 = /*#__PURE__*/Object.freeze({
	default: _inheritIfRequired,
	__moduleExports: _inheritIfRequired
});

var inheritIfRequired = ( _inheritIfRequired$1 && _inheritIfRequired ) || _inheritIfRequired$1;

var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global$1[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !require$$1$1(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = require$$1$1(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && require$$1$1(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export$1($export$1.G + $export$1.W + $export$1.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

var _collection$1 = /*#__PURE__*/Object.freeze({
	default: _collection,
	__moduleExports: _collection
});

var strong = ( _collectionStrong$1 && _collectionStrong ) || _collectionStrong$1;

var require$$0$10 = ( _collection$1 && _collection ) || _collection$1;

var MAP = 'Map';

// 23.1 Map Objects
var es6_map = require$$0$10(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);

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

var dP$3 = dP$1.f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || require$$0$1 && dP$3(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

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

var f$4 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$4
};

var _objectGops$1 = /*#__PURE__*/Object.freeze({
	default: _objectGops,
	__moduleExports: _objectGops,
	f: f$4
});

var gOPS = ( _objectGops$1 && _objectGops ) || _objectGops$1;

// 19.1.2.1 Object.assign(target, source, ...)





var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || require$$1$1(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

var _objectAssign$1 = /*#__PURE__*/Object.freeze({
	default: _objectAssign,
	__moduleExports: _objectAssign
});

var require$$0$11 = ( _objectAssign$1 && _objectAssign ) || _objectAssign$1;

// 19.1.3.1 Object.assign(target, source)


$export$1($export$1.S + $export$1.F, 'Object', { assign: require$$0$11 });

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

exports.api = api;
exports.encodeBase64 = encodeBase64;
exports.decodeBase64 = decodeBase64;
exports.bindCustomEvent = bindCustomEvent;
exports.dispatch = dispatch;
exports.templater = templater;
//# sourceMappingURL=index.cjs.js.map
