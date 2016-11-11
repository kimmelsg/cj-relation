require('babel-register')
require('babel-polyfill')

var expect = require('chai').expect
var sinon = require('sinon')

global.expect = expect
global.sinon = sinon
