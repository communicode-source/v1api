'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jwt = require('./../../controller/jwt');

var _jwt2 = _interopRequireDefault(_jwt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Last Date Updated: 05.04.17
* @name jwt/index
* @author Cooper Campbell
* This routes the home api route '/'.
* This depends on the express router, and the jwt controller.
**/
var router = _express2.default.Router();

router.route('/').get(function (req, res) {
  res.status(200).json({ msg: 'Welcome to the JWT API.', options: ['/gen', '/decode', '/check'] });
});

router.route('/gen').get(function (req, res) {
  res.status(200).json(_jwt2.default.generate({ fname: 'Cooper', lname: 'Campbell', id: 'TheLegend', location: req.connection.remoteAddress }));
});

router.route('/decode/:jwt').get(function (req, res) {
  res.status(200).json(_jwt2.default.decode(req.params.jwt));
});

router.route('/check/:jwt').get(function (req, res) {
  res.status(200).json(_jwt2.default.check(req.params.jwt, req));
});

exports.default = router;
//# sourceMappingURL=index.js.map