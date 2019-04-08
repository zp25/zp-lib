/* eslint no-unused-expressions: 0 */

import chai from 'chai';
import sinon from 'sinon';
import Subject, { InvalidObserverError } from '../src/subject';

chai.should();

describe('Subject', () => {
  let subject = null;

  beforeEach(() => {
    subject = new Subject();
  });

  it('static isValidObserver, 判断是否合规observer', () => {
    const observerC = { update: () => true };

    Subject.isValidObserver(null).should.be.false;
    Subject.isValidObserver('str').should.be.false;
    Subject.isValidObserver({}).should.be.false;
    Subject.isValidObserver({ update: 'str' }).should.be.false;

    Subject.isValidObserver({ update: () => true }).should.be.true;
  });

  it('observers, 空array', () => {
    subject.observers.should.be.an('array');
    subject.observers.should.be.empty;
  });

  it('state, 空object', () => {
    subject.state.should.eql({});
  });

  it('attach, 添加observers，传入Object[]添加多项，返回observers个数', () => {
    const observerA = { update: () => true };
    const observerB = { update: () => true };
    const observerC = { update: () => true };

    const len = subject.attach(observerA);
    subject.attach([observerB, observerC]);

    len.should.equal(1);
    subject.observers.should.eql([observerA, observerB, observerC]);
  });

  it('attach, 若observer已绑定，不会再次添加', () => {
    const observerA = { update: () => true };

    subject.attach(observerA);
    subject.attach(observerA);

    subject.observers.should.eql([observerA]);
  });

  it('attach, 传入不合法observer将抛出InvalidObserverError', () => {
    const observerB = { update: () => true };
    const observerC = { update: () => true };

    const nullObserver = () => { subject.attach(null); };
    nullObserver.should.throw(InvalidObserverError);

    const notObjObserver = () => { subject.attach('str'); };
    notObjObserver.should.throw(InvalidObserverError);

    const noUpdateMetodObserver = () => { subject.attach({}); };
    noUpdateMetodObserver.should.throw(InvalidObserverError);

    const errUpdateObserver = () => { subject.attach({ update: 'str' }); };
    errUpdateObserver.should.throw(InvalidObserverError);
  });

  it('detach, 移除指定observer，传入Object[]移除多项，返回剩余observers个数', () => {
    const observerA = { update: () => true };
    const observerB = { update: () => true };
    const observerC = { update: () => true };

    // 依赖attach测试
    subject.attach([observerA, observerB, observerC]);

    const len = subject.detach(observerA);
    const len2 = subject.detach([observerB, observerC]);

    len.should.equal(2);
    len2.should.equal(0);
  });

  it('setState, 更新subject.state, 以合并方式执行, 每次更新都触发notify', () => {
    const spyNotify = sinon.spy();
    subject.notify = spyNotify;

    subject.setState({ foo: 'foo' });
    subject.state.should.eql({ foo: 'foo' });
    spyNotify.calledOnce.should.be.true;

    subject.setState({ bar: 'bar' });
    subject.state.should.eql({ foo: 'foo', bar: 'bar' });
    spyNotify.calledTwice.should.be.true;

    subject.setState({ foo: 'newFoo' });
    subject.state.should.eql({ foo: 'newFoo', bar: 'bar' });
    spyNotify.calledThrice.should.be.true;
  });

  it('notify, 调用observers的update方法, update参数接收state和prevState', () => {
    const spyUpdateA = sinon.spy();
    const spyUpdateB = sinon.spy();

    // 依赖之前测试
    subject.attach([{ update: spyUpdateA }, { update: spyUpdateB }]);

    const foo = { foo: 'foo' };
    subject.setState(foo);
    subject.setState({ bar: 'bar' });

    spyUpdateB.secondCall.calledWithExactly(subject.state, foo).should.be.true;
    spyUpdateA.secondCall.calledWithExactly(subject.state, foo).should.be.true;
  });
});
