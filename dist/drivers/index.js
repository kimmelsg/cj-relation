'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mysql = require('./mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var drivers = {
  mysql: _mysql2.default
};
exports.default = drivers[process.env.DB_DRIVER];