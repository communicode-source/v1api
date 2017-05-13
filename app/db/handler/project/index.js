'use strict'

const mongoose       = require('mongoose');
const Project        = require('./../../model/project');
mongoose.Promise     = require('bluebird');


class ProjectHandler {

  /**
   * findAll()
   * Returns all projects from the projects collection
  **/
  findAll() {
    return Project.find({}).exec();
  }

  /**
   * find()
   * @param id - the mongo id
   * Returns project from collection by _id
  **/
  findById(id) {
    return Project.findById(id).exec();
  }

  /**
   * find()
   * @param query - the mongoose query to run.
   * Returns project(s) from collection by custom query
  **/
  find(query) {
    return Project.find(query).exec();
  }

}

module.exports = ProjectHandler;
