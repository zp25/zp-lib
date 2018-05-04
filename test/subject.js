import chai from 'chai';
import sinon from 'sinon';
import Subject from '../src/subject';

chai.should();

describe('Subject', () => {
  describe('Properties', () => {
    let subject = null;

    before(() => {
      subject = new Subject();
    });

    it('observers, 空array', () => {
      subject.observers.should.be.an('array');
      subject.observers.should.be.empty;
    });

    it('state, 空object', () => {
      subject.state.should.eql({});
    });
  });

  describe('Methods', () => {
    let subject = null;

    // 测试observer
    let spyUpdateA = null;
    let spyUpdateB = null;
    let observerA = null;
    let observerB = null;
    // 统计notify信息
    let spyNotify = null;

    // 测试状态
    let stateA = null;
    let stateB = null;

    before(() => {
      spyUpdateA = sinon.spy();
      spyUpdateB = sinon.spy();

      observerA = { update: spyUpdateA };
      observerB = { update: spyUpdateB };

      stateA = { foo: 1, bar: 2 };
      stateB = { baz: 3 };
    });

    beforeEach(() => {
      subject = new Subject();

      spyNotify = sinon.spy(subject, 'notify');
    });

    afterEach(() => {
      spyUpdateA.resetHistory();
      spyUpdateB.resetHistory();

      spyNotify.resetHistory();
    });

    it('attach, 绑定observer实例到subject.observers', () => {
      subject.attach(observerA);
      subject.attach(observerB);

      subject.observers.should.include(observerA);
      subject.observers.should.include(observerB);
    });

    it('attach, 若observer已绑定，不会再次添加', () => {
      subject.attach(observerA);
      subject.attach(observerA);

      subject.observers.should.have.lengthOf(1);
    });

    it('detach, 从subject.observers移除observer实例', () => {
      subject.attach(observerA);

      subject.detach(observerA);

      subject.observers.should.not.include(observerA);
    });

    it('state, 读取和更新状态，多次更新以合并方式执行', () => {
      subject.state = stateA;
      subject.state.should.eql(stateA);

      subject.state = stateB;

      const state = Object.assign({}, stateA, stateB);
      subject.state.should.eql(state);
    });

    it('state, 每次更新都触发notify', () => {
      subject.state = stateA;
      spyNotify.calledOnce.should.be.true;

      subject.state = stateB;
      spyNotify.calledTwice.should.be.true;
    });

    it('notify, 调用所有observer的update方法，接收state和prevState', () => {
      subject.attach(observerA);
      subject.attach(observerB);

      subject.state = stateA;
      subject.state = stateB;

      const state = Object.assign({}, stateA, stateB);

      spyUpdateA.secondCall.calledWithExactly(state, stateA).should.be.true;
      spyUpdateB.secondCall.calledWithExactly(state, stateA).should.be.true;
    });
  });
});
