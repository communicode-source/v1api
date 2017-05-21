'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mongoose = require('mongoose');
var Project = require('./../../model/project');
mongoose.Promise = require('bluebird');

var ProjectHandler = function () {
  function ProjectHandler() {
    _classCallCheck(this, ProjectHandler);
  }

  _createClass(ProjectHandler, [{
    key: 'findAll',


    /**
     * findAll()
     * Returns all projects from the projects collection
    **/
    value: function findAll() {
      return Project.find({}).exec();
    }

    /**
     * find()
     * @param id - the mongo id
     * Returns project from collection by _id
    **/

  }, {
    key: 'findById',
    value: function findById(id) {
      return Project.findById(id).exec();
    }

    /**
     * find()
     * @param query - the mongoose query to run.
     * Returns project(s) from collection by custom query
    **/

  }, {
    key: 'find',
    value: function find(query) {
      return Project.find(query).exec();
    }
  }]);

  return ProjectHandler;
}();

module.exports = ProjectHandler;
//# sourceMappingURL=index.js.map