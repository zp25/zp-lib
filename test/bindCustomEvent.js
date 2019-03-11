/* eslint no-unused-expressions: 0 */

import chai from 'chai';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';
import bindCustomEvent from '../src/bindCustomEvent';

chai.should();

describe('bindCustomEvent', () => {
  const spyEventA = sinon.spy();
  const spyEventB = sinon.spy();

  let eventATrigger = null;
  let eventBTrigger = null; // eslint-disable-line no-unused-vars

  before(() => {
    const {
      window: {
        CustomEvent,
        document,
      },
    } = new JSDOM();

    global.document = document;

    /**
     * 触发自定义事件
     * @param {string} type - 事件类型
     * @param {Object} [data] - 额外事件数据
     */
    function customEventTrigger(type, data) {
      const event = new CustomEvent(type, {
        detail: data || { name: type },
      });

      document.dispatchEvent(event);
    }

    eventATrigger = (data) => {
      customEventTrigger('eventA', { data });
    };

    eventBTrigger = () => {
      customEventTrigger('eventB');
    };
  });

  afterEach(() => {
    spyEventA.resetHistory();
    spyEventB.resetHistory();
  });

  it('正确分发事件', () => {
    const customEvents = {
      eventA: spyEventA,
      eventB: spyEventB,
    };

    bindCustomEvent(customEvents);

    eventATrigger({ data: true });
    eventATrigger({ data: true });

    spyEventA.calledTwice.should.be.true;
    spyEventB.callCount.should.equal(0);
  });
});
