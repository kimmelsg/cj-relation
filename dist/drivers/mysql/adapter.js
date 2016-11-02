'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connection = _mysql2.default.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect();

exports.default = {
  select: function select(_ref) {
    var table = _ref.table;

    return new Promise(function (resolve, reject) {
      connection.query('SELECT * FROM ' + table, function (error, results) {
        if (error) return reject(error);
        resolve(results);
      });
    });
  },
  where: function where(_ref2) {
    var table = _ref2.table,
        _where = _ref2.where;

    return new Promise(function (resolve, reject) {
      connection.query('SELECT * FROM ' + table + ' WHERE ?', _where, function (error, results) {
        if (error) return reject(error);
        resolve(results);
      });
    });
  },
  create: function create(_ref3) {
    var table = _ref3.table,
        data = _ref3.data;

    return new Promise(function (resolve, reject) {
      connection.query('INSERT INTO ' + table + ' SET ?', data, function (error, result) {
        if (error) return reject(error);
        resolve(_extends({
          id: result.insertId
        }, data));
      });
    });
  }
};