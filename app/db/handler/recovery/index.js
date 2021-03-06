'use strict'

import mongoose from 'mongoose';
import Recovery from './../../model/recovery';

class RecoveryHandler {
    insertHash(url, user, id, type) {
        return new Recovery({urlHash: url, userHash: user, userID: id, timestamp: new Date().getTime(), checked: false, changed: false, purpose: type || 'recovery'}).save();
    }

    findHash(url, user) {
        return Recovery.find({urlHash: url, userHash: user, changed: false}).exec();
    }

    checkUser(id) {
        return Recovery.find({userID: id, changed: false, purpose: 'recovery'}).exec();
    }

    async updateChecked(url, user) {
        const record = await Recovery.find({urlHash: url, userHash: user}).exec();
        record.checked = true;
        record.save();
        return;
    }

    async updateChanged(url, user) {
        const record = await Recovery.find({urlHash: url, userHash: user}).exec();
        record.changed = true;
        record.save();
        return;
    }

    find(params) {
        return Recovery.find(params).exec();
    }

    getUserID(id) {
        return Recovery.find({_id: id, changed: false}).exec();
    }
}


export default RecoveryHandler;
