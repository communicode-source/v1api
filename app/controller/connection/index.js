import ConnectionHandler from './../../db/handler/connection';
import Response from '../Response';

class ConnectionController extends Response {

  async getAllFollowersForUser(req, res) {
    const dbHandler = new ConnectionHandler();

    let data, statusCode;

    try {
      data = await dbHandler.getAllFollowersForUser(req.params.id);
      statusCode = this.statusCode['success'];
    } catch(e) {
      data = await dbHandler.getAllFollowersForUser(req.params.id);
      statusCode = this.statusCode['not found'];
    }

    return new Response(data, statusCode);
  }

  async getAllFollowingForUser(req, res) {
    const dbHandler = new ConnectionHandler();

    let data, statusCode;

    try {
      data = await dbHandler.getAllFollowingForUser(req.params.id);
      statusCode = this.statusCode['success'];
    } catch(e) {
      data = await dbHandler.getAllFollowingForUser(req.params.id);
      statusCode = this.statusCode['not found'];
    }

    return new Response(data, statusCode);
  }


  async createConnection(req, res) {
    const dbHandler = new ConnectionHandler();

    let data, statusCode;

    try {
      data = await dbHandler.create(req.body.follower, req.body.followingfoll, req.body.affinity);
      statusCode = this.statusCode['success'];
    } catch(e) {
      data = await dbHandler.create();
      statusCode = this.statusCode['not found'];
    }

    return new Response(data, statusCode);
  }
}

export default new ConnectionController();
