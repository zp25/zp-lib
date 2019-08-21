/* eslint no-underscore-dangle: 0, no-unused-expressions: 0 */

import chai from 'chai';
import sinon from 'sinon';
import {
  save,
  StorageTypeError,
} from '../src/storage/base';
import storage from '../src/storage/proxy';

chai.should();

const fakestore = {
  dataset: {
    illegal: 'illegal data',
    str: '"string data"',
    obj: '{"foo":123,"bar":"hello world"}',
  },

  // 无匹配返回null，其余总是返回string
  getItem(key) {
    return this.dataset[key] || null;
  },

  // web storage总是返回undefined，此处返回值方便测试
  setItem(key, val) {
    return [key, val];
  },

  get rawStr() {
    return JSON.parse(this.dataset.str);
  },

  get rawObj() {
    return JSON.parse(this.dataset.obj);
  },
};

global.localStorage = fakestore;

describe('storage.proxy', function() {
  describe('get', function() {
    it('无匹配item返回undefined', function() {
      const store = storage('null');

      (typeof store.foo === 'undefined').should.be.true;
    });

    it('原数据格式不合法返回undefined', function() {
      const store = storage('illegal');

      (typeof store.foo === 'undefined').should.be.true;
    });

    it('正确返回值', () => {
      const store = storage('obj');

      const { foo, bar, baz } = fakestore.rawObj;

      [
        store.foo,
        store.bar,
        store.baz,
      ].should.eql([
        foo,
        bar,
        baz,
      ]);
    });
  });

  describe('set', function() {
    before(function() {
      this.spy = sinon.spy(fakestore, 'setItem');

      this.foo = fakestore.rawStr;
      this.result = JSON.stringify({ foo: this.foo });
    });

    afterEach(function() {
      this.spy.resetHistory();
    });

    after(function() {
      this.spy.restore();
    });

    it('无匹配item时直接写入', function() {
      const store = storage('null');
      const storeThrows = storage('null', { forceUpdate: false });

      store.foo = this.foo;
      storeThrows.foo = this.foo;

      this.spy.firstCall.calledWith('null', this.result).should.be.true;
      this.spy.secondCall.calledWith('null', this.result).should.be.true;
    });

    it('原数据格式不合法默认新建object覆盖原值', function() {
      const illegalStore = storage('illegal');

      illegalStore.foo = this.foo;

      this.spy.calledOnceWith('illegal', this.result).should.be.true;
    });

    it('原数据格式不合法但取消forceUpdate, 写入时抛出错误', function() {
      const illegalStore = storage('illegal', { forceUpdate: false });

      const fn = () => { illegalStore.foo = this.foo; };
      fn.should.throw(StorageTypeError);
      this.spy.notCalled.should.be.true;
    });

    it('正确更新值', function() {
      const result = JSON.stringify(Object.assign({}, fakestore.rawObj, {
        foo: 666,
      }));

      const store = storage('obj');
      store.foo = 666;

      this.spy.calledOnceWith('obj', result).should.be.true;
    });
  });

  describe('delete', function() {
    before(function() {
      this.spy = sinon.spy(fakestore, 'setItem');

      this.result = JSON.stringify({});
    });

    afterEach(function() {
      this.spy.resetHistory();
    });

    after(function() {
      this.spy.restore();
    });

    it('无匹配item将新建，写入空object', function() {
      const store = storage('null');
      const storeThrows = storage('null', { forceUpdate: false });

      delete store.foo;
      delete storeThrows.foo;

      this.spy.firstCall.calledWith('null', this.result).should.be.true;
      this.spy.secondCall.calledWith('null', this.result).should.be.true;
    });

    it('原数据格式不合法默认新建空object覆盖原值', function() {
      const illegalStore = storage('illegal');

      delete illegalStore.foo;

      this.spy.calledOnceWith('illegal', this.result).should.be.true;
    });

    it('原数据格式不合法但取消forceUpdate, 删除时抛出错误', function() {
      const illegalStore = storage('illegal', { forceUpdate: false });

      const fn = () => { delete illegalStore.foo; };
      fn.should.throw(StorageTypeError);
      this.spy.notCalled.should.be.true;
    });

    it('正确删除值', function() {
      const result = JSON.stringify(Object.assign({}, fakestore.rawObj, {
        foo: undefined,
      }));

      const store = storage('obj');
      delete store.foo;

      this.spy.calledOnceWith('obj', result).should.be.true;
    });
  });

  describe('Object.keys', function() {
    it('无匹配item返回空数组', function() {
      const store = storage('null');

      Object.keys(store).should.eql([]);
    });

    it('原数据格式不合法返回空数组', function() {
      const store = storage('illegal');

      Object.keys(store).should.eql([]);
    });

    it('正确返回值keys', function() {
      const store = storage('obj');

      const result = Object.keys(fakestore.rawObj);

      Object.keys(store).should.eql(result);
    });
  });

  describe('in operator', function() {
    it('无匹配item返回false', function() {
      const store = storage('null');

      ('foo' in store).should.be.false;
    });

    it('原数据格式不合法返回false', function() {
      const store = storage('illegal');

      ('foo' in store).should.be.false;
    });

    it('可通过in判断是否包含键', function() {
      const store = storage('obj');

      ('foo' in store).should.be.true;
      ('bar' in store).should.be.true;
      ('baz' in store).should.be.false;
    });
  });
});
