'use strict';
/**
 * @name CertificationDBHandler
 * @author Daniel Adelfinsky
 * Last Edited at: 5/18/17
 * A handler that holds all the functions for finding certifications
 **/

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mongoose = require('mongoose');
var Certification = require('./../../model/certification');
mongoose.Promise = require('bluebird');

var CertificationDBHandler = function () {
  function CertificationDBHandler() {
    _classCallCheck(this, CertificationDBHandler);
  }

  _createClass(CertificationDBHandler, [{
    key: 'findAll',


    /**
     *Lists all Certifications in the certifications collections
    **/
    value: function findAll() {
      return Certification.find({}).exec();
    }
    /**
     * find()
     * @param id - the mongo id of the specific user
     * Returns a specified certification from the collection by the _id
    **/

  }, {
    key: 'findById',
    value: function findById(id) {
      console.log(id);
      return Certification.findById(id).exec();
    }
    /**
     * find()
     * @param id - the mongo id of the specific user
     * Returns a specified certification from the collection by the _id
    **/

  }, {
    key: 'deleteCert',
    value: function deleteCert(id) {
      console.log(id);
      return Certification.findById(id).exec();
    }
  }]);

  return CertificationDBHandler;
}();

module.exports = CertificationDBHandler;
//# sourceMappingURL=index.js.map