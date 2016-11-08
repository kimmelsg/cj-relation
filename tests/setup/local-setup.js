require('dotenv').config()
require('babel-polyfill')
import { expect } from 'chai'
import sinon from 'sinon'

global.expect = expect
global.sinon = sinon
