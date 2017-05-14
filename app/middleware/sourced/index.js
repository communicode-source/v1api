'use strict';
import config from './../../config/database.js';
import {MongoClient} from 'mongodb';

class Mongo {
  connect() {
    return new Promise((res, rej) => {
      MongoClient.connect(config.url, (err, db) => {
        if(err) {
          console.log('Did you forget to run Mongo?');
          res();
        }
        console.log('Reconnecting');
        this.db = db;
        res();
      });
    });
  }

  returnConnection() {
    return this.db;
  }
}



export let sourced = new Mongo();
