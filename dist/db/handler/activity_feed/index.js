'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _redis = require('../helpers/redis');

var _redis2 = _interopRequireDefault(_redis);

var _pipeline = require('../../../utils/pipeline');

var _pipeline2 = _interopRequireDefault(_pipeline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @name ActivityFeedHandler
 * @author Trevor Crupi
 * Last Edited at: 5/18/17
 * A handler that holds all the functions for finding certifications
 **/

var ActivityFeedHandler = function () {
  function ActivityFeedHandler() {
    _classCallCheck(this, ActivityFeedHandler);
  }

  _createClass(ActivityFeedHandler, [{
    key: 'addActivity',
    value: function addActivity(activity) {

      var actorKey = 'activity' + actor._id;
      //this.createNewPipeline(actorKey, );

      /*redis.set(actorKey, {
        actor: activity.actor,
        verb: activity.verb,
        object: activity.object,
        timestamp: Date.now()
      });*/

      return new _pipeline2.default(actorKey, {
        'activity': activity
      });
    }
  }]);

  return ActivityFeedHandler;
}();

exports.default = ActivityFeedHandler;

/*

const activity = addActivity({
  actor: 'Trevor Crupi',
  verb: 'bookmarked',
  object: 'New Project',
}).through((request) => {
  return [
    new NotificationHandler(activity)
  ]
});

*/
//# sourceMappingURL=index.js.map