'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (model) {
  return (0, _pluralize2.default)(model).toLowerCase();
};