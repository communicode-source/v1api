import redis from '../../helpers/redis';
import Pipeline from '../../../utils/pipeline';

/**
 * @name ActivityFeedHandler
 * @author Trevor Crupi
 * Last Edited at: 5/18/17
 * A handler that holds all the functions for finding certifications
 **/

class ActivityFeedHandler {f

  addActivity(activity) {

    const actorKey = 'activity' + activity.actor._id;
    //this.createNewPipeline(actorKey, );

    /*redis.set(actorKey, {
      actor: activity.actor,
      verb: activity.verb,
      object: activity.object,
      timestamp: Date.now()
    });*/

    return new Pipeline(actorKey, {
      'activity': activity
    });
  }
}

export default ActivityFeedHandler;

/*

const activity = addActivity({
  actor: 'Trevor Crupi',
  verb: 'bookmarked',
  object: 'New Project',
}).through((request) => {
  return [
    new NotificationHandler(activity)
  ]
});

*/
