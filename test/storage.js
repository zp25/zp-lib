/* eslint no-underscore-dangle: 0, no-unused-expressions: 0 */

import chai from 'chai';
import {
  read,
  save,
  StorageTypeError,
} from '../src/storage/base';
import storage from '../src/storage';

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

describe('base', () => {
  describe('read', () => {
    it('序列化字符串可返序列化', () => {
      read(fakestore, 'str').should.eql(fakestore.rawStr);
      read(fakestore, 'obj').should.eql(fakestore.rawObj);
    });

    it('非序列化字符串返回原值', () => {
      read(fakestore, 'illegal').should.eql(fakestore.dataset.illegal);
    });

    it('不存在返回null', () => {
      (read(fakestore, 'null') === null).should.be.true;
    });
  });

  describe('save', () => {
    it('总是序列化传入值', () => {
      save(fakestore, 'str', fakestore.rawStr).should.eql([
        'str',
        fakestore.dataset.str
      ]);

      save(fakestore, 'obj', fakestore.rawObj).should.eql([
        'obj',
        fakestore.dataset.obj,
      ]);
    });
  });
});

describe('storage', function() {
  describe('get', function() {
    it('无匹配item返回undefined', function() {
      const store = storage('null');

      (typeof store.get('foo') === 'undefined').should.be.true;
    });

    it('原数据格式不合法返回undefined', function() {
      const store = storage('illegal');

      (typeof store.get('foo') === 'undefined').should.be.true;
    });

    it('正确返回值', () => {
      const store = storage('obj');

      const { foo, bar, baz } = fakestore.rawObj;

      [
        store.get('foo'),
        store.get('bar'),
        store.get('baz'),
      ].should.eql([
        foo,
        bar,
        baz,
      ]);
    });
  });

  describe('set', function() {
    before(function() {
      this.foo = fakestore.rawStr;
      this.result = JSON.stringify({ foo: this.foo });
    });

    it('无匹配item时直接写入', function() {
      const store = storage('null');
      const storeThrows = storage('null', { forceUpdate: false });

      store.set('foo', this.foo).should.eql(['null', this.result]);
      storeThrows.set('foo', this.foo).should.eql(['null', this.result]);
    });

    it('原数据格式不合法默认新建object覆盖原值', function() {
      const illegalStore = storage('illegal');

      illegalStore.set('foo', this.foo).should.eql([
        'illegal',
        this.result,
      ]);
    });

    it('原数据格式不合法但取消forceUpdate, 写入时抛出错误', function() {
      const illegalStore = storage('illegal', { forceUpdate: false });

      const fn = () => { illegalStore.set('foo', this.foo); };
      fn.should.throw(StorageTypeError);
    });

    it('正确更新值', function() {
      const result = JSON.stringify(Object.assign({}, fakestore.rawObj, {
        foo: 666,
      }));

      const store = storage('obj');
      store.set('foo', 666).should.eql(['obj', result]);
    });
  });

  describe('delete', function() {
    before(function() {
      this.result = JSON.stringify({});
    });

    it('无匹配item将新建，写入空object', function() {
      const store = storage('null');
      const storeThrows = storage('null', { forceUpdate: false });

      store.delete('foo').should.eql(['null', this.result]);
      storeThrows.delete('foo').should.eql(['null', this.result]);
    });

    it('原数据格式不合法默认新建空object覆盖原值', function() {
      const illegalStore = storage('illegal');

      illegalStore.delete('foo').should.eql(['illegal', this.result]);
    });

    it('原数据格式不合法但取消forceUpdate, 删除时抛出错误', function() {
      const illegalStore = storage('illegal', { forceUpdate: false });

      const fn = () => { illegalStore.delete('foo'); };
      fn.should.throw(StorageTypeError);
    });

    it('正确删除值', function() {
      const result = JSON.stringify(Object.assign({}, fakestore.rawObj, {
        foo: undefined,
      }));

      const store = storage('obj');
      store.delete('foo').should.eql(['obj', result]);
    });
  });

  describe('keys', function() {
    it('无匹配item返回空数组', function() {
      const store = storage('null');

      store.keys().should.eql([]);
    });

    it('原数据格式不合法返回空数组', function() {
      const store = storage('illegal');

      store.keys().should.eql([]);
    });

    it('正确返回值', function() {
      const store = storage('obj');

      const result = Object.keys(fakestore.rawObj);

      store.keys().should.eql(result);
    });
  });
});
