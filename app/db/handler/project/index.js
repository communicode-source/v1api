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

  create(project) {
    return new Project({
      nonprofitId: project.nonprofitId,
      title: project.title,
      description: project.description,
      projectType: project.projectType,
      images: project.images,
      types: project.types,
      skills: project.skills,
      estimatedTime: project.estimatedTime
    }).save();
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
