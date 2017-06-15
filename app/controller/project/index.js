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

  async createProject(req, res) {
    const dbHandler = new ProjectHandler();

    let data, statusCode;

    try {
      data = await dbHandler.create(req.body);
      statusCode = this.statusCode['success'];
    } catch(e) {
      data = await dbHandler.create(req.body);
      statusCode = this.statusCode['not found'];
    }

    return new Response(data, statusCode);
  }

  async bookmark(req, res) {
    const dbHandler = new ProjectHandler();
    const activity = new ActivityFeedHandler();

    let data, statusCode, pipe, nonprofit;

    try {
      data = await dbHandler.bookmark(req.body.user, req.body.project);
      nonprofit = await dbHandler.getNonprofitFromProject(req.body.project);

      if(nonprofit.nonprofitId) {

        pipe = await activity.addActivity({
          actor: req.body.user,
          verb: 'bookmarked',
          object: req.body.project,
        });

        pipe.handle({
          nonprofitId: nonprofit.nonprofitId
        }).through({
            createConnection: async (request) => {
              await request.graphSearchHandler.create(request.activity.actor, request.nonprofitId, .05, false);
            },
            addToFeed: (request) => {
              request.addToFeed(request.activity, request.graphSearchHandler);
            }
        }).dispatch(['createConnection', 'addToFeed']);
      }

      statusCode = this.statusCode['success'];

    } catch(err) {
      console.log(err);
      data = { msg: 'Something went wrong' };
      statusCode = this.statusCode['not found'];
    }

    return new Response(data, statusCode);
  }

}


export default new ProjectController();
