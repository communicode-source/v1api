'use strict';

import Connection from './../../model/connections';
import mongoose from 'mongoose';

export default class ConnectionHandler {

  getAllFollowersForUser(id, isFollowing=true) {
    return Connection.find({'object': id, 'isFollowing': isFollowing}).exec();
  }

  getAllFollowingForUser(id, isFollowing=true) {
    return Connection.find({'actor': id, 'isFollowing': isFollowing}).exec();
  }

  async create(actor, object, affinity) {

    let shouldUpdate;

    try {
      shouldUpdate = await this.shouldUpdate(actor, object);
    } catch(e) {
      shouldUpdate = false;
    }

    if(shouldUpdate) {
      const connection = shouldUpdate;
      console.log(connection);
      const newAffinity = this.calculateNewAffinity(connection.affinity, affinity);
      connection.affinity = newAffinity;
      return connection.save();
    }

    return new Connection({
      actor: actor,
      object: object,
      affinity: 0.45
    }).save();
  }

  shouldUpdate(actor, object) {
    return Connection.findOne({actor: actor, object: object}).exec();
  }

  calculateNewAffinity(currAffinity, newAffinity) {
    return currAffinity + (currAffinity*newAffinity);
  }

  find(query) {
      return Connection.find(query).exec();
  }
}
