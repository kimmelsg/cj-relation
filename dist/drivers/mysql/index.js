'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _adapter = require('./adapter');

var _adapter2 = _interopRequireDefault(_adapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MysqlDriver = function () {
  function MysqlDriver() {
    _classCallCheck(this, MysqlDriver);
  }

  _createClass(MysqlDriver, null, [{
    key: 'all',
    value: function all() {
      return _adapter2.default.select({ table: this.tableName() });
    }
  }, {
    key: 'where',
    value: function where(_where) {
      return _adapter2.default.where({ table: this.tableName(), where: _where });
    }
  }, {
    key: 'create',
    value: function create(data) {
      return _adapter2.default.create({ table: this.tableName(), data: data });
    }
  }]);

  return MysqlDriver;
}();

exports.default = MysqlDriver;