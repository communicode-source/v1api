 haimport ProjectHandler from './../../db/handler/project';
import ActivityFeedHandler from './../../db/handler/activityfeed';
import Response from '../Response';

class ProjectController extends Response {

  async index(req, res) {
    const dbHandler = new ProjectHandler();
    const activityHandler = new ActivityFeedHandler();

    let data, statusCode;

    const pipe = activityHandler.addActivity({
      actor: { _id: '123456' },
      verb: 'selected',
      object: { _id: '59108ae7e3670c5d61d63793' }
    })
    .through({
      testPiping: (request) => {
        console.log(request.activity);
      }
    });

    try {
      data = await dbHandler.findAll();

      statusCode = this.statusCode['success'];
    } catch(err) {
      data = await dbHandler.findAll();
      statusCode = this.statusCode['not found'];
    }

    pipe.dispatch();
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

}


export default new ProjectController();
