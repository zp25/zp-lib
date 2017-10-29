import chai from 'chai';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';
import bindCustomEvent from '../src/bindCustomEvent';

chai.should();

const domStr = `
<!DOCTYPE html>
<html>
<body>
  <p>Hello world</p>
</body>
</html>
`;

describe('bindCustomEvent', () => {
  const spyEventA = sinon.spy();
  const spyEventB = sinon.spy();

  let eventATrigger = null;
  let eventBTrigger = null;

  before(() => {
    const window = new JSDOM(domStr).window;
    global.window = window;

    const CustomEvent = window.CustomEvent;

    /**
     * 触发自定义事件
     * @param {string} type - 事件类型
     * @param {Object} [data] - 额外事件数据
     */
    function customEventTrigger(type, data) {
      const event = new CustomEvent(type, {
        detail: data || { name: type },
      });

      window.dispatchEvent(event);
    }

    eventATrigger = (data) => {
      customEventTrigger('eventA', { data });
    };

    eventBTrigger = (data) => {
      customEventTrigger('eventB');
    };
  });

  afterEach(() => {
    spyEventA.reset();
    spyEventB.reset();
  })

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
