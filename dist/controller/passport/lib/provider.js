'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var providerStrategy = function () {
  function providerStrategy(who) {
    _classCallCheck(this, providerStrategy);

    this.provider = who ? who : null;
  }

  _createClass(providerStrategy, [{
    key: 'getStrategy',
    value: function getStrategy(who) {
      if (!who && this.provider === null) return false;
    }
  }]);

  return providerStrategy;
}();
//# sourceMappingURL=provider.js.map