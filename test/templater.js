import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {
  templater,
  templaterAsync,
} from '../src/templater';

chai.use(chaiAsPromised);
chai.should();

describe('templater', () => {
  it('表达式为function时能正确工作', () => {
    const expected = `
      <div class="content"><p>foo</p><p>bar</p><p>baz</p></div>
    `;

    const content = data => (
      Array.isArray(data) ?
        data.reduce((prev, d) => `${prev}<p>${d}</p>`, '') :
        `<p>${data}</p>`
    );
    content.displayName = 'content';

    const template = templater`
      <div class="content">${content}</div>
    `;

    const context = { content: ['foo', 'bar', 'baz'] };
    const result = template(context);

    result.should.equal(expected);
  });

  it('表达式为object时能正确工作', () => {
    const expected = `
      <p class="content">foo</p>
    `;

    const content = () => ({
      name: 'key',
      content: data => data,
    });
    const template = templater`
      <p class="content">${content()}</p>
    `;

    const context = { key: 'foo' };
    const result = template(context);

    result.should.equal(expected);
  });

  it('表达式为string时能正确工作，包括无匹配key时直接显示表达式', () => {
    const expected = `
      <div class="content">
        <p>Hello World</p>
        <p>nil</p>
      </div>
    `;

    const template = templater`
      <div class="content">
        <p>${'content'}</p>
        <p>${'nil'}</p>
      </div>
    `;

    const context = { content: 'Hello World' };
    const result = template(context);

    result.should.equal(expected);
  });
});

describe('templaterAsync', () => {
  it('表达式为function时能正确工作', () => {
    const expected = `
      <div class="content"><p>Hello World!</p></div>
    `;

    const content = data => Promise.resolve(`<p>${data}</p>`);
    content.displayName = 'content';

    const template = templaterAsync`
      <div class="content">${content}</div>
    `;

    const context = { content: 'Hello World!' };
    const result = template(context);

    return result.should.eventually.equal(expected);
  });

  it('表达式为object时能正确工作', () => {
    const expected = `
      <p class="content">Hello World!</p>
    `;

    const content = () => ({
      name: 'key',
      content: data => Promise.resolve(data),
    });
    const template = templaterAsync`
      <p class="content">${content()}</p>
    `;

    const context = { key: 'Hello World!' };
    const result = template(context);

    return result.should.eventually.equal(expected);
  });
});
