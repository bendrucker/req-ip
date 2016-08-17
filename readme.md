# req-ip [![Build Status](https://travis-ci.org/bendrucker/req-ip.svg?branch=master)](https://travis-ci.org/bendrucker/req-ip)

> Middleware for appending `req.ip` to HTTP requests with support for reverse proxies


## Install

```
$ npm install --save req-ip
```


## Usage

```js
var ReqIp = require('req-ip')
var reqIp = ReqIp()

reqIp(req, res, function (err) {
  //=> req.id === '1.2.3.4'  
})
```

## API

#### `ReqIp(header)` -> `function`

Returns a middleware function that applies `req.ip` and then calls back.

##### header

Type: `string`  
Default: `'x-forwarded-for'`

A header name to use to set the IP address. When no matching header is found, `req.connection.remoteAddress` is used instead.


## License

MIT © [Ben Drucker](http://bendrucker.me)
