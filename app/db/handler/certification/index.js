'use strict';
/**
 * @name CertificationDBHandler
 * @author Daniel Adelfinsky
 * Last Edited at: 5/30/17
 * A handler that holds all the functions for finding certifications
 **/
var mongoose         = require('mongoose');
const Certification  = require('./../../model/certification');
mongoose.Promise     = require('bluebird');


class CertificationDBHandler {

  //lists all certifcations in db
  findAll() {
    return Certification.find({}).exec();
  }
  /**
   * find()
   * @param id - the mongo id of the specific user
   * Returns a specified certification from the collection by the _id
  **/
  findById(id) {
    console.log(id);
    return Certification.findById(id).exec();
  }
  /**
   * find()
   * @param id - the mongo id of the specific user
   * Returns a specified certification from the collection by the _id
  **/
  deleteCert(id){
    console.log(id);
    return Certification.findById(id).exec();
  }
}

module.exports = CertificationDBHandler;
