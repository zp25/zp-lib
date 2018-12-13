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
      errbody: {
        error: true,
        message: 'error',
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

    it('不可设置Accept, Content-Type头部', () => {
      const { headers, body } = response.json;

      const res = new Response(JSON.stringify(body), {
        status: 200,
        headers,
      });
      fetchMock.post((url, { headers }) => (
        url === `${host}/post/json`
        && headers.get('Content-Type') === 'application/json'
        && headers.get('Accept') === 'application/json'
      ), res);

      const opts = {
        headers: {
          'Accept': 'text/html',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      return api.post(`${host}/post/json`, opts).should.eventually.eql(body);
    });

    it('可接收fetch配置，不包括method', () => {
      const { json } = request;
      const { headers, body } = response.json;

      const res = new Response(JSON.stringify(body), {
        status: 200,
        headers,
      });
      fetchMock.post((url, {
        headers,
        body: reqBody,
        mode,
        credentials,
        bar,
      }) => (
        url === `${host}/post/json`
        && headers.get('Content-Type') === 'application/json'
        && headers.get('Accept') === 'application/json'
        && headers.get('X-CUSTOM') === 'foo'
        && reqBody === JSON.stringify(json)
        && mode === 'cors'
        && credentials === 'include'
        && bar === 'baz'
      ), res);

      const opts = {
        method: 'GET',
        headers: {
          'X-CUSTOM': 'foo',
        },
        body: json,
        mode: 'cors',
        credentials: 'include',
        bar: 'baz',
      };

      return api.post(`${host}/post/json`, opts).should.eventually.eql(body);
    });

    it('请求失败(status非2xx)抛出Error', () => {
      fetchMock.post(`*`, 404);

      return api.post(`${host}/404`).should.be.rejectedWith(Error);
    });

    it('请求响应非JSON数据抛出Error', () => {
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

    it('不可设置Accept头部', () => {
      const { headers, body } = response.json;

      const res = new Response(JSON.stringify(body), {
        status: 200,
        headers,
      });
      fetchMock.get((url, { headers }) => (
        url === `${host}/get/json`
        && headers.get('Accept') === 'application/json'
      ), res);

      const opts = {
        headers: {
          'Accept': 'text/html',
        },
      };

      return api.get(`${host}/get/json`, opts).should.eventually.eql(body);
    });

    it('可接收fetch配置，不包括method', () => {
      const { headers, body } = response.json;

      const res = new Response(JSON.stringify(body), {
        status: 200,
        headers,
      });
      fetchMock.get((url, {
        headers,
        mode,
        credentials,
        bar,
      }) => (
        url === `${host}/get/json`
        && headers.get('Accept') === 'application/json'
        && headers.get('X-CUSTOM') === 'foo'
        && mode === 'cors'
        && credentials === 'include'
        && bar === 'baz'
      ), res);

      const opts = {
        method: 'PUT',
        headers: {
          'X-CUSTOM': 'foo',
        },
        mode: 'cors',
        credentials: 'include',
        bar: 'baz',
      };

      return api.get(`${host}/get/json`, opts).should.eventually.eql(body);
    });

    it('请求失败(status非2xx)抛出Error', () => {
      fetchMock.get(`*`, 404);

      return api.get(`${host}/404`).should.be.rejectedWith(Error);
    });

    it('请求失败(status非2xx)抛出的Error包含res.body中数据', () => {
      const { headers, errbody } = response.json;

      const res = new Response(JSON.stringify(errbody), {
        status: 404,
        headers,
      });
      fetchMock.get(`*`, res);

      return api.get(`${host}/404`).catch((err) => {
        err.message.should.equal('404');
        err.body.should.eql(errbody);
      });;
    });

    it('请求响应非JSON数据抛出Error', () => {
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

    it('不可设置Accept, Content-Type头部', () => {
      const { headers, body } = response.json;

      const res = new Response(JSON.stringify(body), {
        status: 200,
        headers,
      });
      fetchMock.put((url, { headers }) => (
        url === `${host}/put/json`
        && headers.get('Content-Type') === 'application/json'
        && headers.get('Accept') === 'application/json'
      ), res);

      const opts = {
        headers: {
          'Accept': 'text/html',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      return api.put(`${host}/put/json`, opts).should.eventually.eql(body);
    });

    it('可接收fetch配置，不包括method', () => {
      const { json } = request;
      const { headers, body } = response.json;

      const res = new Response(JSON.stringify(body), {
        status: 200,
        headers,
      });
      fetchMock.put((url, {
        headers,
        body: reqBody,
        mode,
        credentials,
        bar,
      }) => (
        url === `${host}/put/json`
        && headers.get('Content-Type') === 'application/json'
        && headers.get('Accept') === 'application/json'
        && headers.get('X-CUSTOM') === 'foo'
        && reqBody === JSON.stringify(json)
        && mode === 'cors'
        && credentials === 'include'
        && bar === 'baz'
      ), res);

      const opts = {
        method: 'POST',
        headers: {
          'X-CUSTOM': 'foo',
        },
        body: json,
        mode: 'cors',
        credentials: 'include',
        bar: 'baz',
      };

      return api.put(`${host}/put/json`, opts).should.eventually.eql(body);
    });

    it('请求失败(status非2xx)抛出Error', () => {
      fetchMock.put(`*`, 404);

      return api.put(`${host}/404`).should.be.rejectedWith(Error);
    });

    it('请求响应非JSON数据抛出Error', () => {
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

    it('不可设置Accept头部', () => {
      const { headers, body } = response.json;

      const res = new Response(JSON.stringify(body), {
        status: 200,
        headers,
      });
      fetchMock.delete((url, { headers }) => (
        url === `${host}/delete/json`
        && headers.get('Accept') === 'application/json'
      ), res);

      const opts = {
        headers: {
          'Accept': 'text/html',
        },
      };

      return api.delete(`${host}/delete/json`, opts).should.eventually.eql(body);
    });

    it('可接收fetch配置，不包括method', () => {
      const { headers, body } = response.json;

      const res = new Response(JSON.stringify(body), {
        status: 200,
        headers,
      });
      fetchMock.delete((url, {
        headers,
        mode,
        credentials,
        bar,
      }) => (
        url === `${host}/delete/json`
        && headers.get('Accept') === 'application/json'
        && headers.get('X-CUSTOM') === 'foo'
        && mode === 'cors'
        && credentials === 'include'
        && bar === 'baz'
      ), res);

      const opts = {
        method: 'GET',
        headers: {
          'X-CUSTOM': 'foo',
        },
        mode: 'cors',
        credentials: 'include',
        bar: 'baz',
      };

      return api.delete(`${host}/delete/json`, opts).should.eventually.eql(body);
    });

    it('请求失败(status非2xx)抛出Error', () => {
      fetchMock.delete(`*`, 404);

      return api.delete(`${host}/404`).should.be.rejectedWith(Error);
    });

    it('请求响应非JSON数据抛出Error', () => {
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
