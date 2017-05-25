'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/me/:token').post(function (req, res) {
  req.startSessUser(req);
  res.status(200).json(req.userToken);
});

module.exports = router;
//# sourceMappingURL=index.js.map