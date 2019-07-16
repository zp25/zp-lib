/* eslint no-underscore-dangle: 0, no-unused-expressions: 0 */

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import rewire from 'rewire';
import 'isomorphic-fetch';
import FormData from 'form-data';
import {
  ResponseNotOkError,
  ResponseNotJSONError,
  handleError,
  handleContent,
  reqHeadersAndBody,
} from '../src/api';

chai.use(chaiAsPromised);
chai.should();

const wrapper = rewire('../src/api');

const url = 'http://fetch.test';
global.FormData = FormData;

describe('api', () => {
  describe('handleError', () => {
    it('请求成功(res.ok)返回res', () => {
      const res = { ok: true };

      handleError(res).should.eql(res);
    });

    it('请求失败(!res.ok)返回Promise，rejected with ResponseNotOkError', () => {
      const res = new Response(null, { status: 404 });

      handleError(res).should.be.rejectedWith(ResponseNotOkError);
    });
  });

  describe('handleContent', () => {
    it('若res为json，返回Promise，能取到数据', () => {
      const body = { foo: 'Foo', bar: 'Bar' };
      const res = new Response(JSON.stringify(body), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      handleContent(res).should.eventually.eql(body);
    });

    it('若res不是json，返回Promise，rejected with ResponseNotJSONError', () => {
      const res = new Response('Hello World', {
        status: 200,
        headers: {
          'Content-Type': 'text/plain',
        },
      });

      handleContent(res).should.be.rejectedWith(ResponseNotJSONError);
    });
  });

  describe('reqHeadersAndBody', () => {
    it('不传入参数，返回对象中仅包含headers，其中设置了accept', () => {
      const check = ({ headers, body }) => (
        typeof body === 'undefined'
        && headers.get('accept') === 'application/json'
      );

      check(reqHeadersAndBody()).should.be.true;
    });

    it('传入参数不包含body，返回对象中包含headers，其中设置了accept', () => {
      const check = ({ headers, body }) => (
        typeof body === 'undefined'
        && headers.get('accept') === 'application/json'
      );

      check(reqHeadersAndBody({})).should.be.true;
    });

    it('传入body为FormData，返回对象中包含body和headers，headers设置accpet', () => {
      const check = ({ headers, body }) => (
        body instanceof FormData
        && headers.get('accept') === 'application/json'
      );

      check(reqHeadersAndBody({ body: new FormData() })).should.be.true;
    });

    it('传入body为可序列化对象，返回对象中包含序列化body，headers设置accpet，content-type为json', () => {
      const data = {
        foo: 'Foo',
        bar: 'Bar',
      };

      const check = ({ headers, body }) => (
        body === JSON.stringify(data)
        && headers.get('accept') === 'application/json'
        && headers.get('content-type') === 'application/json'
      );

      check(reqHeadersAndBody({ body: data })).should.be.true;
    });

    it('传入headers不可自定义Accept，可添加自定义头部', () => {
      const customHeaders = {
        accept: 'text/html',
        'x-custom-header': 'Foo',
      };

      const check = ({ headers, body }) => (
        typeof body === 'undefined'
        && headers.get('accept') === 'application/json'
        && headers.get('x-custom-header') === 'Foo'
      );

      check(reqHeadersAndBody({
        headers: customHeaders,
      })).should.be.true;
    });
  });

  describe('POST', () => {
    const { default: api } = wrapper;

    it('正确发送POST请求，正确初始化header, body, mode', () => {
      const data = { data: 'Hello World' };

      const fakeFetch = (input, {
        method,
        headers,
        body,
        mode,
      }) => (
        input === url
        && method === 'POST'
        && headers.get('Accept') === 'application/json'
        && headers.get('Content-Type') === 'application/json'
        && body === JSON.stringify(data)
        && mode === 'no-cors'
      );

      wrapper.__set__('fetchProcess', fakeFetch);
      api.post(url, { body: data }).should.be.true;
    });

    it('可接收fetch配置，不包括method', () => {
      const fakemethod = 'GET';
      const headers = {
        'x-custom-header': 'Foo',
      };
      const mode = 'cors';
      const credentials = 'include';
      const cache = 'no-store';

      const fakeFetch = (input, {
        method,
        headers: rheaders,
        mode: rmode,
        credentials: rcredentials,
        cache: rcache,
      }) => (
        input === url
        && method === 'POST'
        && rheaders.get('x-custom-header') === 'Foo'
        && mode === rmode
        && credentials === rcredentials
        && cache === rcache
      );

      wrapper.__set__('fetchProcess', fakeFetch);
      api.post(url, {
        method: fakemethod,
        headers,
        mode,
        credentials,
        cache,
      }).should.be.true;
    });
  });

  describe('GET', () => {
    const { default: api } = wrapper;

    it('正确发送GET请求，正确初始化header, mode', () => {
      const fakeFetch = (input, {
        method,
        headers,
        body,
        mode,
      }) => (
        input === url
        && method === 'GET'
        && headers.get('Accept') === 'application/json'
        && typeof body === 'undefined'
        && mode === 'no-cors'
      );

      wrapper.__set__('fetchProcess', fakeFetch);
      api.get(url).should.be.true;
    });

    it('可接收fetch配置，不包括method', () => {
      const fakemethod = 'PUT';
      const mode = 'cors';
      const headers = {
        'x-custom-header': 'Foo',
      };
      const credentials = 'include';
      const cache = 'no-store';

      const fakeFetch = (input, {
        method,
        headers: rheaders,
        mode: rmode,
        credentials: rcredentials,
        cache: rcache,
      }) => (
        input === url
        && method === 'GET'
        && rheaders.get('x-custom-header') === 'Foo'
        && mode === rmode
        && credentials === rcredentials
        && cache === rcache
      );

      wrapper.__set__('fetchProcess', fakeFetch);
      api.get(url, {
        method: fakemethod,
        headers,
        mode,
        credentials,
        cache,
      }).should.be.true;
    });
  });

  describe('PUT', () => {
    const { default: api } = wrapper;

    it('正确发送PUT请求，正确初始化header, body, mode', () => {
      const data = { data: 'Hello World' };

      const fakeFetch = (input, {
        method,
        headers,
        body,
        mode,
      }) => (
        input === url
        && method === 'PUT'
        && headers.get('Accept') === 'application/json'
        && headers.get('Content-Type') === 'application/json'
        && body === JSON.stringify(data)
        && mode === 'no-cors'
      );

      wrapper.__set__('fetchProcess', fakeFetch);
      api.put(url, { body: data }).should.be.true;
    });

    it('可接收fetch配置，不包括method', () => {
      const fakemethod = 'DELETE';
      const headers = {
        'x-custom-header': 'Foo',
      };
      const mode = 'cors';
      const credentials = 'include';
      const cache = 'no-store';

      const fakeFetch = (input, {
        method,
        headers: rheaders,
        mode: rmode,
        credentials: rcredentials,
        cache: rcache,
      }) => (
        input === url
        && method === 'PUT'
        && rheaders.get('x-custom-header') === 'Foo'
        && mode === rmode
        && credentials === rcredentials
        && cache === rcache
      );

      wrapper.__set__('fetchProcess', fakeFetch);
      api.put(url, {
        method: fakemethod,
        headers,
        mode,
        credentials,
        cache,
      }).should.be.true;
    });
  });

  describe('DELETE', () => {
    const { default: api } = wrapper;

    it('正确发送DELETE请求，正确初始化header, mode', () => {
      const fakeFetch = (input, {
        method,
        headers,
        body,
        mode,
      }) => (
        input === url
        && method === 'DELETE'
        && headers.get('Accept') === 'application/json'
        && typeof body === 'undefined'
        && mode === 'no-cors'
      );

      wrapper.__set__('fetchProcess', fakeFetch);
      api.delete(url).should.be.true;
    });

    it('可接收fetch配置，不包括method', () => {
      const fakemethod = 'POST';
      const headers = {
        'x-custom-header': 'Foo',
      };
      const mode = 'cors';
      const credentials = 'include';
      const cache = 'no-store';

      const fakeFetch = (input, {
        method,
        headers: rheaders,
        mode: rmode,
        credentials: rcredentials,
        cache: rcache,
      }) => (
        input === url
        && method === 'DELETE'
        && rheaders.get('x-custom-header') === 'Foo'
        && mode === rmode
        && credentials === rcredentials
        && cache === rcache
      );

      wrapper.__set__('fetchProcess', fakeFetch);
      api.delete(url, {
        method: fakemethod,
        headers,
        mode,
        credentials,
        cache,
      }).should.be.true;
    });
  });
});
