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
      const prevCon = await dbHandler.find({actor: req.userToken._id, object: req.body.object});
      if(prevCon.length === 1) {
          await prevCon[0].remove();
      }
      else {
          const newt = await dbHandler.create(req.userToken._id, req.body.object, .45);
          await newt.save();
      }
      data = {err: false, msg: 'Success'};
      statusCode = this.statusCode['success'];
    } catch(e) {
      console.log(e);
      data = await dbHandler.create();
      statusCode = this.statusCode['not found'];
    }

    return new Response(data, statusCode);
  }

  async getNumberOfStats(req, res) {
    const dbHandler = new ConnectionHandler();
    const tkPayload = req.startSessUser(req);
    let data, statusCode, isFollow = false;

    try {
      const following = dbHandler.find({actor: req.params.id});
      const followers = dbHandler.find({object: req.params.id});

      const db = (tkPayload) ? await dbHandler.find({actor: tkPayload._id, object: req.params.id}) : [];
      if(db.length === 1) {
          isFollow = true
      }
      data = {err: false, msg: {
          following: (await following).length - 1,
          followers: (await followers).length - 1,
          isFollow: isFollow
      }};
      statusCode = this.statusCode['success'];
    } catch(e) {
      console.log(e);
      data = await dbHandler.create();
      statusCode = this.statusCode['not found'];
    }

    return new Response(data, statusCode);
  }

  async isFollowing(req, res) {
    const dbHandler = new ConnectionHandler();

    let data, statusCode;

    try {
      const db = dbHandler.find({actor: req.userToken._id, object: req.params.id});
      if(db.length !== 1) {
          data = {err: false, msg: false}
      }
      data = {err: false, msg: {
          following: (await following).length - 1,
          followers: (await followers).length - 1
      }};
      statusCode = this.statusCode['success'];
    } catch(e) {
      data = await dbHandler.create();
      statusCode = this.statusCode['not found'];
    }

    return new Response(data, statusCode);
  }
}

export default new ConnectionController();
