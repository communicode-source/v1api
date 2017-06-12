'use strict'

import ProjectHandler from './../../db/handler/project';
import Response from '../Response';

import ActivityFeedHandler from './../../db/handler/activity';

class ProjectController extends Response {

  async index(req, res) {
    const dbHandler = new ProjectHandler();
    const activity = new ActivityFeedHandler();

    let data, statusCode, pipe;

    try {
      data = await dbHandler.findAll();
      statusCode = this.statusCode['success'];
    } catch(err) {
      data = await dbHandler.findAll();
      statusCode = this.statusCode['not found'];
    }

    return new Response(data, statusCode);
  }

  async findProject(req, res) {
    const dbHandler = new ProjectHandler();
    const id = req.params.id;

    let data, statusCode;

    try {
      data = await dbHandler.findById(id);
      statusCode = this.statusCode['success'];
    } catch(err) {
      data = await dbHandler.findById(id);
      statusCode = this.statusCode['not found'];
    }

    return new Response(data, statusCode);
  }

  async bookmark(req, res) {
    const dbHandler = new ProjectHandler();
    const activity = new ActivityFeedHandler();

    let data, statusCode, pipe;

    try {
      data = await dbHandler.bookmark(req.body.user, req.body.project);

      pipe = activity.addActivity({
        actor: req.body.user,
        verb: 'bookmarked',
        object: req.body.project
      }).through({
          addToFeed: (request) => {
            request.addToFeed(request.activity);
          }
      });

      statusCode = this.statusCode['success'];
    } catch(err) {
      data = await dbHandler.findAll();
      statusCode = this.statusCode['not found'];
    }

    pipe.dispatch(['addToFeed']);
    return new Response(data, statusCode);
  }

}


export default new ProjectController();
