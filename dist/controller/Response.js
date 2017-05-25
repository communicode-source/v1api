'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Response = function () {
  function Response() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 404;

    _classCallCheck(this, Response);

    this.data = data;
    this.status = status;

    this.statusCode = {
      'success': 200,
      'not found': 404,
      'cached': 304,
      'redirect': 301,
      'error': 500
    };
  }

  _createClass(Response, [{
    key: 'getStatusCode',
    value: function getStatusCode() {
      return this.status;
    }
  }, {
    key: 'getJSONData',
    value: function getJSONData() {
      return this.data;
    }
  }]);

  return Response;
}();

exports.default = Response;
//# sourceMappingURL=Response.js.map