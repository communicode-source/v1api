'use strict';
/**
 * @name ActivityFeedHandler
 * @author Trevor Crupi
 * Last Edited at: 6/12/17
 **/

import redis from '../../helpers/redis';
import Pipeline from '../../../utils/pipeline';

import Activity from '../../model/activity';

class ActivityFeedHandler {

  addActivity(activity) {

    const newActivity = new Activity({
      actor: activity.actor,
      verb: activity.verb,
      object: activity.object
    });

    newActivity.save();

    return new Pipeline('activity.eventualId', {
      activity: activity,
      addToFeed: this.addToFeed
    });
  }

  addToFeed(activity) {
    console.log('Adding to feed here... ' + JSON.stringify(activity));
  }

}

module.exports = ActivityFeedHandler;
