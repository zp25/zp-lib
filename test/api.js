/* eslint no-underscore-dangle: 0, no-unused-expressions: 0 */

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import rewire from 'rewire';
import 'isomorphic-fetch';
import FormData from 'form-data';
import {
  handleError,
  handleContent,
  reqData,
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

    it('请求失败(!res.ok)返回Promise，rejected with Error', () => {
      const body = JSON.stringify({ error: true });
      const res = new Response(body, { status: 404 });

      handleError(res).should.be.rejectedWith(Error);
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

    it('若res不是json，返回Promise，rejected with Error', () => {
      const res = new Response('Hello World', {
        status: 200,
        headers: {
          'Content-Type': 'text/plain',
        },
      });

      handleContent(res).should.be.rejectedWith(Error);
    });
  });

  describe('reqData', () => {
    it('若body为FormData，返回正确的mime和body', () => {
      const body = new FormData();
      body.append('foo', 'Foo');

      reqData(body).should.eql({
        mime: 'multipart/form-data',
        data: body,
      });
    });

    it('若body不是FormData，一律以json处理，数据需序列化', () => {
      const body = 'Hello World';

      reqData(body).should.eql({
        mime: 'application/json',
        data: JSON.stringify(body),
      });
    });
  });

  describe('reqHeadersAndBody', () => {
    it('若未设置body，返回对象中不包含body，headers不设置Content-Type，能正确设置Accept头部', () => {
      const check = ({ headers, body }) => (
        typeof body === 'undefined'
        && headers.get('Accept') === 'application/json'
        && headers.has('Content-Type') === false
      );

      check(reqHeadersAndBody()).should.be.true;
    });

    it('若有body，能正确配置Content-Type、Accept头部并规范data', () => {
      const data = { data: 'Hello World' };

      const checkJson = ({ headers, body }) => (
        body === JSON.stringify(data)
        && headers.get('Accept') === 'application/json'
        && headers.get('Content-Type') === 'application/json'
      );

      const checkFormData = ({ headers, body }) => (
        body instanceof FormData
        && headers.get('Accept') === 'application/json'
        && headers.get('Content-Type') === 'multipart/form-data'
      );

      checkJson(reqHeadersAndBody({ body: data })).should.be.true;
      checkFormData(reqHeadersAndBody({ body: new FormData() })).should.be.true;
    });

    it('不可自定义Accept、Content-Type头部，可添加额外头部', () => {
      const customHeaders = {
        accept: 'text/html',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Custom-Header': 'Foo',
      };

      const check = ({ headers, body }) => (
        body instanceof FormData
        && headers.get('Accept') === 'application/json'
        && headers.get('Content-Type') === 'multipart/form-data'
        && headers.get('X-Custom-Header') === 'Foo'
      );

      check(reqHeadersAndBody({
        headers: customHeaders,
        body: new FormData(),
      })).should.be.true;
    });
  });

  describe('POST', () => {
    const { default: api } = wrapper;

    it('正确发送POST请求', () => {
      const data = { data: 'Hello World' };

      const fakeFetch = (input, {
        method,
        body,
        headers,
        mode,
      }) => (
        input === url
        && method === 'POST'
        && body === JSON.stringify(data)
        && headers.get('Accept') === 'application/json'
        && headers.get('Content-Type') === 'application/json'
        && mode === 'no-cors'
      );

      wrapper.__set__('fetchProcess', fakeFetch);
      api.post(url, { body: data }).should.be.true;
    });

    it('可接收fetch配置，不包括method', () => {
      const fakemethod = 'GET';
      const mode = 'cors';
      const credentials = 'include';
      const cache = 'no-store';

      const fakeFetch = (input, {
        method,
        mode: rmode,
        credentials: rcredentials,
        cache: rcache,
      }) => (
        input === url
        && method === 'POST'
        && mode === rmode
        && credentials === rcredentials
        && rcache === cache
      );

      wrapper.__set__('fetchProcess', fakeFetch);
      api.post(url, {
        method: fakemethod,
        mode,
        credentials,
        cache,
      }).should.be.true;
    });
  });

  describe('GET', () => {
    const { default: api } = wrapper;

    it('正确发送GET请求', () => {
      const fakeFetch = (input, {
        method,
        headers,
        mode,
      }) => (
        input === url
        && method === 'GET'
        && headers.get('Accept') === 'application/json'
        && mode === 'no-cors'
      );

      wrapper.__set__('fetchProcess', fakeFetch);
      api.get(url).should.be.true;
    });

    it('可接收fetch配置，不包括method', () => {
      const fakemethod = 'PUT';
      const mode = 'cors';
      const credentials = 'include';
      const cache = 'no-store';

      const fakeFetch = (input, {
        method,
        mode: rmode,
        credentials: rcredentials,
        cache: rcache,
      }) => (
        input === url
        && method === 'GET'
        && mode === rmode
        && credentials === rcredentials
        && rcache === cache
      );

      wrapper.__set__('fetchProcess', fakeFetch);
      api.get(url, {
        method: fakemethod,
        mode,
        credentials,
        cache,
      }).should.be.true;
    });
  });

  describe('PUT', () => {
    const { default: api } = wrapper;

    it('正确发送PUT请求', () => {
      const data = { data: 'Hello World' };

      const fakeFetch = (input, {
        method,
        body,
        headers,
        mode,
      }) => (
        input === url
        && method === 'PUT'
        && body === JSON.stringify(data)
        && headers.get('Accept') === 'application/json'
        && headers.get('Content-Type') === 'application/json'
        && mode === 'no-cors'
      );

      wrapper.__set__('fetchProcess', fakeFetch);
      api.put(url, { body: data }).should.be.true;
    });

    it('可接收fetch配置，不包括method', () => {
      const fakemethod = 'DELETE';
      const mode = 'cors';
      const credentials = 'include';
      const cache = 'no-store';

      const fakeFetch = (input, {
        method,
        mode: rmode,
        credentials: rcredentials,
        cache: rcache,
      }) => (
        input === url
        && method === 'PUT'
        && mode === rmode
        && credentials === rcredentials
        && rcache === cache
      );

      wrapper.__set__('fetchProcess', fakeFetch);
      api.put(url, {
        method: fakemethod,
        mode,
        credentials,
        cache,
      }).should.be.true;
    });
  });

  describe('DELETE', () => {
    const { default: api } = wrapper;

    it('正确发送DELETE请求', () => {
      const fakeFetch = (input, {
        method,
        headers,
        mode,
      }) => (
        input === url
        && method === 'DELETE'
        && headers.get('Accept') === 'application/json'
        && mode === 'no-cors'
      );

      wrapper.__set__('fetchProcess', fakeFetch);
      api.delete(url).should.be.true;
    });

    it('可接收fetch配置，不包括method', () => {
      const fakemethod = 'POST';
      const mode = 'cors';
      const credentials = 'include';
      const cache = 'no-store';

      const fakeFetch = (input, {
        method,
        mode: rmode,
        credentials: rcredentials,
        cache: rcache,
      }) => (
        input === url
        && method === 'DELETE'
        && mode === rmode
        && credentials === rcredentials
        && rcache === cache
      );

      wrapper.__set__('fetchProcess', fakeFetch);
      api.delete(url, {
        method: fakemethod,
        mode,
        credentials,
        cache,
      }).should.be.true;
    });
  });
});
