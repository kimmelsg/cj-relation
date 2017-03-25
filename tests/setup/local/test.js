require('babel-register')
require('dotenv').config()
require('babel-polyfill')

var expect = require('chai').expect
var sinon = require('sinon')

global.expect = expect
global.sinon = sinon

require('../run-drivers')
