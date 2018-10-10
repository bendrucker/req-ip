'use strict'

const test = require('tape')
const inject = require('shot').inject
const ReqIp = require('./')

test('default header', function (t) {
  t.plan(1)

  const ip = ReqIp()

  inject(dispatch, {
    url: '/',
    headers: {
      'x-forwarded-for': '1.2.3.4'
    }
  }, t.fail)

  function dispatch (req, res) {
    ip(req, res, function (err) {
      if (err) return t.end(err)
      t.equal(req.ip, '1.2.3.4', 'uses x-forwarded-for header')
    })
  }
})

test('multiple proxies', function (t) {
  t.plan(1)

  const ip = ReqIp()

  inject(dispatch, {
    url: '/',
    headers: {
      'x-forwarded-for': '1.2.3.4, 5.6.7.8'
    }
  }, t.fail)

  function dispatch (req, res) {
    ip(req, res, function (err) {
      if (err) return t.end(err)
      t.equal(req.ip, '1.2.3.4', 'uses first x-forwarded-for entry')
    })
  }
})

test('custom header', function (t) {
  t.plan(1)

  const ip = ReqIp('x-booped-for')

  inject(dispatch, {
    url: '/',
    headers: {
      'x-booped-for': '10.20.30.40'
    }
  }, t.fail)

  function dispatch (req, res) {
    ip(req, res, function (err) {
      if (err) return t.end(err)
      t.equal(req.ip, '10.20.30.40', 'uses custom header')
    })
  }
})

test('not forwarded', function (t) {
  t.plan(1)

  const ip = ReqIp()

  inject(dispatch, {
    url: '/'
  }, t.fail)

  function dispatch (req, res) {
    ip(req, res, function (err) {
      if (err) return t.end(err)
      t.equal(req.ip, '127.0.0.1', 'falls back to remoteAddress')
    })
  }
})
