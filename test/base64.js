import chai from 'chai';
import { JSDOM } from 'jsdom';
import {
  encodeBase64,
  decodeBase64,
} from '../src/base64';

chai.should();

const domStr = `
<!DOCTYPE html>
<html>
<body>
  <p>Hello world</p>
</body>
</html>
`;

describe('base64', () => {
  const raw = 'hello你好';
  const code = 'aGVsbG/kvaDlpb0=';

  before(() => {
    const window = new JSDOM(domStr).window;

    global.window = window;
  });

  it('正确使用base64编码utf8, utf16le字符串', () => {
    const result = encodeBase64(raw);

    result.should.equal(code);
  });

  it('正确解码base64编码的字符串', () => {
    const result = decodeBase64(code);

    result.should.equal(raw);
  });
});
