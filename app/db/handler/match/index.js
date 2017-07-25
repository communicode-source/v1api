'use strict';
/**
 **/
 var mongoose = require('mongoose');
const Match       = require('./../../model/match');
mongoose.Promise     = require('bluebird');


class MatchHandler {
    findByProject(id) {
        return Match.find({projectId: id}).exec();
    }
    findByDev(id) {
        return Match.find({developerId: id}).exec();
    }
    findByNonprofit(id) {
        return Match.find({nonprofitId: id}).exec();
    }
    find(query) {
        return Match.find(query).exec();
    }
    add(record) {
        const {developerId, nonprofitId, projectId} = record;
        if(!developerId || !nonprofitId || !projectId) {
            throw new Error('Required fields missing');
        }
        return new Match(record).save();
    }
}

module.exports = MatchHandler;