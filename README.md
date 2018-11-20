# Blog

定期分享 第一期《express.js 相关内容》

- [Node.js](https://nodejs.org/zh-cn/) 《Node.js 官网（中文）》
- [Node.js](https://nodejs.org/en/) 《Node.js 官网（英文）》

<br/><br/>

**Node.js 是什么**

>Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.

    1. JavaScript 运行时
    2. 既不是语言，也不是框架，它是一个平台

**Node.js 中的 JavaScript**

    1. 没有 BOM、DOM
    2. 在 Node 中为 JavaScript 提供了一些服务器级别的 API
        2.1 fs 文件操作模块
        2.2 http 网络服务构建模块
        2.3 os 操作系统信息模块
        2.4 path 路径处理模块
        2.5 .....

---

<!-- markdown-to-slides share1.md -o index.html -s slide.css -->

## I. express简介

基于 Node.js 平台，快速、开放、极简的 Web 开发框架

简单来说，封装了node中http核心模块，专注于业务逻辑的开发。

安装方法

```javascript

npm install express --save

```
---

Hello World

```javascript

var express = require('express')

var app = express()

app.get('/', function (req, res) {
  res.send('hello world ...')
})

app.listen(3000, function () {
  console.log('express app is runing .....')
})

```
Hello World 测试结果：

<img src="http://img1.ph.126.net/4rbKjFebIGFp27lrwJziag==/6631702183913005570.png" height="200" width="600" />


---

### express 路由

Routing refers to how an application’s endpoints (URIs) respond to client requests. 

 -请求方法

 -请求路径

 -请求处理函数

**公开静态资源**

```javascript

// 访问路径 http://127.0.0.1:3000/a.js
app.use(express.static('./public/'))

// 访问路径 http://127.0.0.1:3000/public/a.js
app.use('/public/',express.static('./public/'))

```



---

### require 方法的加载规则

-[深入浅出 node.js](http://www.infoq.com/cn/articles/nodejs-module-mechanism/)

**node 中存在的模块主要有：**

1. 核心模块 path fs http ...
2. 自己定义的模块 （路径形式的模块）
3. 第三方模块 art-template express（使用npm安装的模块）

```javascript

// 加载核心模块
const path = require('path');

// 加载自定义模块
const foo = require('./fooo.js')

// 加载第三方模块 node_modules
const express = require('express')

```
---

**node 中require加载规则：**
1. 优先缓存加载

2. 判断模块标识

  2.1 是否是核心模块 http 、fs 加载 缓存 export

  2.2 是否是文件模块 ./foo.js 加载 缓存 export

  2.3 是否是第三方模块 （第三方模块需要 npm install 安装）

      - node_modules/art-template/
      - node_modules/art-template/package.json
      - node_modules/art-template/package.json 中找main 作为文件加载入口
      - index.js 备选项
      - 进入上一级目录找 node_modules
      - 按照此规则依次向上查找，直到磁盘根目录找不到 报错 Can not find moudle XXX

---

node 中require加载规则：

<img src="http://img1.ph.126.net/rbUZEFX4o6NnLcfrgNXomA==/1910933616989134372.jpg" height="540" width="300" />
<img src="http://img2.ph.126.net/h8Kc7evXazduSR-lOYWnEw==/6597311659217060144.jpg" height="540" width="400" style="margin-left:60px"/>

---

### nodemon 

[nodemon](https://nodemon.io/)《nodemon使用方法》

> nodemon reload, automatically

nodemon用来监视node.js应用程序中的任何更改并自动重启服务,非常适合用在开发环境中

```javascript

// 全局安装nodemon
npm install -g nodemon

nodemon app.js

```

---

### 中间件 body-parser  

**express中没有内置的获取表单请求体的API，所以需要第三方包解析HTTP请求体**

This module provides the following parsers:

1. JSON body parser
2. Raw body parser
3. Text body parser
4. URL-encoded form body parser

使用方法：

```javascript

const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

```
---

```javascript
router.post('/students/new', function (req, res) {
  console.log(req.body)
  Student.save(req.body, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/students')
  })
})

```
post 提交方式测试：

<img src="http://img1.ph.126.net/82CmNmtkr5WCSGocf-7a_Q==/759138012289304338.png" width="350"  />
<img src="http://img1.ph.126.net/wSMCvySXI6jDnIyWpsvkvg==/1669428086971567957.png"  width="350" style="margin-left:40px"/>

---

### package-lock.json

npm 5以前没有 package-lock.json 文件

1. 安装包时不需要加 --save参数 会自动保存依赖信息
2. 在安装包时，会自动更新package-lock.json文件
3. package-lock.json文件保存node_molules中所有包信息（记录版本号和下载地址等信息）

---

### path 路径操作模块

```javascript

path.join(__dirname, '../node_modules')

path.basename(path[, ext])

```

<img src="http://img2.ph.126.net/MgfYCwnWSkO7q2EID4It3w==/6599300675751393002.png" />

---

### node 中的其他成员

在每个模块中，除了require、export 等模块相关的API之外，还有两个特殊的成员
  
- __dirname 可以用来获取当前文件模块所属目录的绝对路径 **动态获取**
- __filename 可以用来获取当前文件的绝对路径 **动态获取**

**1. 在文件操作路径中，相对路径设计的是相对于执行node命令所在路径**
**2. 模块中的路径标识就是相对于当前文件模块，不受执行node命令所处路径影响**

```javascript
const fs = require('fs')
const path = require('path')

// 文件操作中的相对路径
fs.readFile('c:/a/b/a.txt', 'utf-8', function (err, data) {
  if (err) throw err
  console.log(data)
})

// 文件操作中的相对路径转化为动态获取的绝对路径
fs.readFile(path.join(__dirname,'./a.txt'), 'utf-8', function (err, data) {
})

// 模块中的路径标识
require('./b')

```

---

### 中间件 middleware

**中间件** 在 Node.js 中被广泛使用，它泛指一种特定的设计模式、一系列的处理单元、过滤器和处理程序，以函数的形式存在，连接在一起，形成一个异步队列，来完成对任何数据的预处理和后处理。

常规的中间件模式

<img src="https://upload-images.jianshu.io/upload_images/5236403-89a09dec2d661faa.jpg?imageMogr2/auto-orient/" />

---
