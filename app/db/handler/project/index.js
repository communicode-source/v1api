'use strict'

import Project from './../../model/project';
import Bookmark from './../../model/project/bookmark';

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

  bookmark(user, project) {
    return new Bookmark({
      userId: user,
      projectId: project
    }).save();
  }

}

module.exports = ProjectHandler;
