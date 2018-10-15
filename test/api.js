import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import FormData from 'form-data';
import api from '../src/api';

chai.use(chaiAsPromised);
chai.should();

describe('api', () => {
  const host = 'http://example.com';
  const request = {
    json: {
      foo: 'foo',
      bar: { baz: 'baz' },
    },
    formdata: new FormData(),
  };
  const response = {
    json: {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: {
        code: 0,
        data: [
          { id: 1, text: "Plain text" },
        ],
      },
    },
    text: {
      headers: new Headers({
        'Content-Type': 'text/plain',
      }),
      body: 'Plain text',
    },
  };

  describe('POST', () => {
    before(() => {
      global.FormData = FormData;
    });

    afterEach(() => {
      fetchMock.restore();
    });

    it('正确发送json POST请求，初始化Accept头部和mode', () => {
      const { json } = request;
      const { headers, body } = response.json;

      const res = new Response(JSON.stringify(body), {
        status: 200,
        headers,
      });
      fetchMock.post((url, { headers, body, mode }) => (
        url === `${host}/post/json`
        && headers.get('Content-Type') === 'application/json'
        && headers.get('Accept') === 'application/json'
        && body === JSON.stringify(json)
        && mode == 'no-cors'
      ), res);

      return api.post(`${host}/post/json`, { body: json }).should.eventually.eql(body);
    });

    it('正确发送formdata POST请求，初始化Accept头部和mode', () => {
      const { formdata } = request;
      const { headers, body } = response.json;

      const res = new Response(JSON.stringify(body), {
        status: 200,
        headers,
      });
      fetchMock.post((url, { headers, body, mode }) => (
        url === `${host}/post/json`
        && headers.get('Content-Type') === 'multipart/form-data'
        && headers.get('Accept') === 'application/json'
        && body instanceof FormData
        && mode == 'no-cors'
      ), res);

      return api.post(`${host}/post/json`, { body: formdata }).should.eventually.eql(body);
    });

    it('POST接收参数设置headers和mode，不可设置Accept, Content-Type头部', () => {
      const { json } = request;
      const { headers, body } = response.json;

      const res = new Response(JSON.stringify(body), {
        status: 200,
        headers,
      });
      fetchMock.post((url, { headers, body, mode, bar }) => (
        url === `${host}/post/json`
        && headers.get('Content-Type') === 'application/json'
        && headers.get('Accept') === 'application/json'
        && headers.get('X-CUSTOM') === 'foo'
        && body === JSON.stringify(json)
        && mode === 'cors'
        && !bar
      ), res);

      const opts = {
        headers: {
          'Accept': 'text/html',
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CUSTOM': 'foo',
        },
        body: json,
        mode: 'cors',
        bar: 'baz',
      };

      return api.post(`${host}/post/json`, opts).should.eventually.eql(body);
    });

    it('POST请求失败(status非2xx)抛出Error', () => {
      fetchMock.post(`*`, 404);

      return api.post(`${host}/404`).should.be.rejectedWith(Error);
    });

    it('POST请求响应非JSON数据抛出Error', () => {
      const { headers, body } = response.text;

      const res = new Response(JSON.stringify(body), {
        status: 200,
        headers,
      });
      fetchMock.post(`${host}/post/text`, res);

      return api.post(`${host}/post/text`).should.be.rejectedWith(Error);
    });
  });

  describe('GET', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('正确发送GET请求，初始化Accept头部和mode', () => {
      const { headers, body } = response.json;

      const res = new Response(JSON.stringify(body), {
        status: 200,
        headers,
      });
      // func接收url和调用fetch时传入的参数
      fetchMock.get((url, { headers, mode }) => (
        url === `${host}/get/json`
        && headers.get('Accept') === 'application/json'
        && mode === 'no-cors'
      ), res);

      return api.get(`${host}/get/json`).should.eventually.eql(body);
    });

    it('GET接收参数设置headers和mode，不可设置Accept头部', () => {
      const { headers, body } = response.json;

      const res = new Response(JSON.stringify(body), {
        status: 200,
        headers,
      });
      fetchMock.get((url, { headers, mode, bar }) => (
        url === `${host}/get/json`
        && headers.get('Accept') === 'application/json'
        && headers.get('X-CUSTOM') === 'foo'
        && mode === 'cors'
        && !bar
      ), res);

      const opts = {
        headers: {
          'Accept': 'text/html',
          'X-CUSTOM': 'foo',
        },
        mode: 'cors',
        bar: 'baz',
      };

      return api.get(`${host}/get/json`, opts).should.eventually.eql(body);
    });

    it('GET请求失败(status非2xx)抛出Error', () => {
      fetchMock.get(`*`, 404);

      return api.get(`${host}/404`).should.be.rejectedWith(Error);
    });

    it('GET请求响应非JSON数据抛出Error', () => {
      const { headers, body } = response.text;

      const res = new Response(JSON.stringify(body), {
        status: 200,
        headers,
      });
      fetchMock.get(`${host}/get/text`, res);

      return api.get(`${host}/get/text`).should.be.rejectedWith(Error);
    });
  });

  describe('PUT', () => {
    before(() => {
      global.FormData = FormData;
    });

    afterEach(() => {
      fetchMock.restore();
    });

    it('正确发送json PUT请求，初始化Accept头部和mode', () => {
      const { json } = request;
      const { headers, body } = response.json;

      const res = new Response(JSON.stringify(body), {
        status: 200,
        headers,
      });
      fetchMock.put((url, { headers, body, mode }) => (
        url === `${host}/put/json`
        && headers.get('Content-Type') === 'application/json'
        && headers.get('Accept') === 'application/json'
        && body === JSON.stringify(json)
        && mode == 'no-cors'
      ), res);

      return api.put(`${host}/put/json`, { body: json }).should.eventually.eql(body);
    });

    it('正确发送formdata PUT请求，初始化Accept头部和mode', () => {
      const { formdata } = request;
      const { headers, body } = response.json;

      const res = new Response(JSON.stringify(body), {
        status: 200,
        headers,
      });
      fetchMock.put((url, { headers, body, mode }) => (
        url === `${host}/put/json`
        && headers.get('Content-Type') === 'multipart/form-data'
        && headers.get('Accept') === 'application/json'
        && body instanceof FormData
        && mode == 'no-cors'
      ), res);

      return api.put(`${host}/put/json`, { body: formdata }).should.eventually.eql(body);
    });

    it('PUT接收参数设置headers和mode，不可设置Accept, Content-Type头部', () => {
      const { json } = request;
      const { headers, body } = response.json;

      const res = new Response(JSON.stringify(body), {
        status: 200,
        headers,
      });
      fetchMock.put((url, { headers, body, mode, bar }) => (
        url === `${host}/put/json`
        && headers.get('Content-Type') === 'application/json'
        && headers.get('Accept') === 'application/json'
        && headers.get('X-CUSTOM') === 'foo'
        && body === JSON.stringify(json)
        && mode === 'cors'
        && !bar
      ), res);

      const opts = {
        headers: {
          'Accept': 'text/html',
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CUSTOM': 'foo',
        },
        body: json,
        mode: 'cors',
        bar: 'baz',
      };

      return api.put(`${host}/put/json`, opts).should.eventually.eql(body);
    });

    it('PUT请求失败(status非2xx)抛出Error', () => {
      fetchMock.put(`*`, 404);

      return api.put(`${host}/404`).should.be.rejectedWith(Error);
    });

    it('PUT请求响应非JSON数据抛出Error', () => {
      const { headers, body } = response.text;

      const res = new Response(JSON.stringify(body), {
        status: 200,
        headers,
      });
      fetchMock.put(`${host}/put/text`, res);

      return api.put(`${host}/put/text`).should.be.rejectedWith(Error);
    });
  });

  describe('DELETE', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('正确发送DELETE请求，初始化Accept头部和mode', () => {
      const { headers, body } = response.json;

      const res = new Response(JSON.stringify(body), {
        status: 200,
        headers,
      });
      // func接收url和调用fetch时传入的参数
      fetchMock.delete((url, { headers, mode }) => (
        url === `${host}/delete/json`
        && headers.get('Accept') === 'application/json'
        && mode === 'no-cors'
      ), res);

      return api.delete(`${host}/delete/json`).should.eventually.eql(body);
    });

    it('DELETE接收参数设置headers和mode，不可设置Accept头部', () => {
      const { headers, body } = response.json;

      const res = new Response(JSON.stringify(body), {
        status: 200,
        headers,
      });
      fetchMock.delete((url, { headers, mode, bar }) => (
        url === `${host}/delete/json`
        && headers.get('Accept') === 'application/json'
        && headers.get('X-CUSTOM') === 'foo'
        && mode === 'cors'
        && !bar
      ), res);

      const opts = {
        headers: {
          'Accept': 'text/html',
          'X-CUSTOM': 'foo',
        },
        mode: 'cors',
        bar: 'baz',
      };

      return api.delete(`${host}/delete/json`, opts).should.eventually.eql(body);
    });

    it('DELETE请求失败(status非2xx)抛出Error', () => {
      fetchMock.delete(`*`, 404);

      return api.delete(`${host}/404`).should.be.rejectedWith(Error);
    });

    it('DELETE请求响应非JSON数据抛出Error', () => {
      const { headers, body } = response.text;

      const res = new Response(JSON.stringify(body), {
        status: 200,
        headers,
      });
      fetchMock.delete(`${host}/delete/text`, res);

      return api.delete(`${host}/delete/text`).should.be.rejectedWith(Error);
    });
  });
});
