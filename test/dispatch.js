import chai from 'chai';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';
import dispatch from '../src/dispatch';

chai.should();

const domStr = `
<!DOCTYPE html>
<html>
<body>
  <ul class="anchor-list">
    <li><a href="#linkA" data-trigger="link" data-value="A">Link A</a></li>
    <li><a href="#linkB" data-trigger="link" data-value="B">Link B</a></li>
    <li><a href="#linkC" data-trigger="link" data-value="C">Link C</a></li>
  </ul>

  <button data-trigger="button">Button A</button>
</body>
</html>
`;

describe('dispatch', () => {
  const spyLink = sinon.spy();

  before(() => {
    const window = new JSDOM(domStr).window;
    global.document = window.document;

    const clickHandlers = {
      link: spyLink,
    };

    document.body.addEventListener('click', dispatch(clickHandlers));
  });

  afterEach(() => {
    spyLink.resetHistory();
  })

  it('正确分发事件', () => {
    document.querySelector('a[data-value="A"]').click();
    document.querySelector('a[data-value="B"]').click();
    document.querySelector('a[data-value="C"]').click();

    spyLink.calledThrice.should.be.true;
  });

  it('没有匹配处理函数时无反应', () => {
    document.querySelector('button').click();

    spyLink.callCount.should.equal(0);
  });
});
