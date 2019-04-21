# 常用依赖

[![npm](https://img.shields.io/npm/v/zp-lib.svg)](https://www.npmjs.com/package/zp-lib)
[![Build Status](https://travis-ci.org/zp25/zp-lib.svg?branch=master)](https://travis-ci.org/zp25/zp-lib)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fzp25%2Fzp-lib.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fzp25%2Fzp-lib?ref=badge_shield)

模块介绍

+ api，API Abstraction
+ base64，使用base64编码和解码字符串
  + encodeBase64
  + decodeBase64
+ bindCustomEvent，绑定customEvent
+ createAction，FSA Factory，无依赖
+ createReducer，Reducer Factory，无依赖
+ dispatch，事件代理用于事件分发
+ escapeHTML，转义字符串
+ machine，有限状态机
+ searchParams，返回object，存储location.search中的key-value对
+ storage，本地存储
+ Subject，观察者模式目标
+ Observer，观察者模式观察者
+ templater，模版引擎
  + templater，同步
  + templaterAsync，异步

示例见文档

## browserslist

浏览器支持情况

~~~bash
npx browserslist
~~~

见.browserslistrc

## 测试和文档

测试和文档

~~~bash
npm test
~~~

运行单元测试

~~~bash
npm run jsdoc

# darwin
npm run open
~~~

生成和查看doc

## 资源

+ [Template Literals](https://css-tricks.com/template-literals/ "Template Literals")
+ [The Importance Of JavaScript Abstractions When Working With Remote Data](https://css-tricks.com/importance-javascript-abstractions-working-remote-data/ "The Importance Of JavaScript Abstractions When Working With Remote Data")

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fzp25%2Fzp-lib.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fzp25%2Fzp-lib?ref=badge_large)
