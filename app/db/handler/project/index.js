'use strict'

import Project from './../../model/project';
import Bookmark from './../../model/project/bookmark';

class ProjectHandler {

  /**
   * findAll()
   * Returns all projects from the projects collection
  **/
  findAll() {
    return Project.find({}).populate('nonprofitId').exec();
  }

  /**
   * find()
   * @param id - the mongo id
   * Returns project from collection by _id
  **/
  findById(id) {
    return Project.findById(id).exec();
  }

  population(query, population) {
      return Project.find(query).populate(population).exec();
  }

  create(project) {
    return new Project({
      nonprofitId: project.nonprofitId,
      item: project.item
    }).save();
  }

  updateById(id, project) {
    return Project.update({"_id": id}, { $set: project }).exec();
  }

  updateByIds(id, npId, project) {
    return Project.update({"_id": id, "nonprofitId": npId}, { $set: project }).exec();
  }

  /**
   * find()
   * @param query - the mongoose query to run.
   * Returns project(s) from collection by custom query
  **/
  find(query) {
    return Project.find(query).exec();
  }

  getNonprofitFromProject(projectId) {
    return Project.findById(projectId).exec();
  }

  bookmark(user, project) {
    return new Bookmark({
      userId: user,
      projectId: project
    }).save();
  }

}

module.exports = ProjectHandler;
