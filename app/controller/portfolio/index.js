'use strict'

import ProjectHandler from './../../db/handler/project';
import Response from '../Response';

import ActivityFeedHandler from './../../db/handler/activity';

class PortfolioController extends Response {

  async createNewPortfolioItem(req, res) {
    const dbHandler = new ProjectHandler();
    const activity = new ActivityFeedHandler();

    let data, statusCode, pipe, nonprofit;

    try {
      data = await dbHandler.save(req.body.user, req.body.sanitized.projectName);

      if(data) {

        pipe = await activity.addActivity({
          actor: req.body.user,
          verb: 'created',
          object: data._id,
        });

        pipe.through({
            addToFeed: (request) => {
              request.addToFeed(request.activity, request.graphSearchHandler);
            }
        }).dispatch();
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


export default new PortfolioController();
