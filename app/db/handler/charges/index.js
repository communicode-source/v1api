'use strict';
/**
 **/
 var mongoose = require('mongoose');
const Charge       = require('./../../model/charge');
mongoose.Promise     = require('bluebird');


class ChargesHandler {
    findByProject(id) {
        return Charge.find({projectId: id}).exec();
    }
    find(query) {
        return Charge.find(query).exec();
    }
    add(record) {
        const {chargeId, nonprofitId, nonprofitStripeAccount, projectId} = record;
        if(!chargeId || !nonprofitId || !nonprofitStripeAccount || !projectId) {
            throw new Error('Required fields missing');
        }
    }
}

module.exports = ChargesHandler;
