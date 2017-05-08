'use strict'

const ProjectHandler  = require('./../../db/handler/project');

class ProjectController {

  *index(req, res) {
    const dbHandler = new ProjectHandler();
    yield *dbHandler.findAll();
  }

  *findProject(req, res) {
    const id = req.params.id;
    const dbHandler = new ProjectHandler();
    yield *dbHandler.findById(id);
  }

}


module.exports = new ProjectController();
