'use strict';
/**
 * @name ActivityFeedHandler
 * @author Trevor Crupi
 * Last Edited at: 6/12/17
 **/

import redis from '../../helpers/redis';
import Pipeline from '../../../utils/pipeline';

import Activity from '../../model/activity';
import ConnectionHandler from '../../handler/connection';

class ActivityFeedHandler {

  async addActivity(activity) {

    const newActivity = new Activity({
      actor: activity.actor,
      verb: activity.verb,
      object: activity.object
    });

    let savedActivity;

    try {
      savedActivity = await newActivity.save();
    } catch(e) {
      console.log(e);
    }

    return new Pipeline(savedActivity._id, {
      activity: savedActivity,
      addToFeed: this.addToFeed,
      graphSearchHandler: new ConnectionHandler()
    });
  }

  async addToFeed(activity, graphSearchHandler) {
    const userFeeds = await graphSearchHandler.getAllFollowersForUser(activity.actor);

    for(let i = 0; i < userFeeds.length; i++) {
      redis.lpush('feed.' + userFeeds[i].object, activity._id);
    }
  }

}

module.exports = ActivityFeedHandler;
