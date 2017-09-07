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
        const {cost, chargeId, nonprofitId, nonprofitStripeAccount, projectId} = record;
        if(!cost || !chargeId || !nonprofitId || !nonprofitStripeAccount || !projectId) {
            throw new Error('Required fields missing');
        }
        return new Charge(record).save();
    }
    insertD(record) {
        const {cost, chargeId, devId, projectId} = record;
        if(!cost || !chargeId || !devId || !projectId) {
            throw new Error('Required fields missing');
        }
        return new Charge({...record, purpose: 'payout'}).save();
    }
}

module.exports = ChargesHandler;
