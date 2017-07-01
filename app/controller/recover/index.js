import Response from './../Response';
import UserHandler from './../../db/handler/user';
import RecoverHandler from './../../db/handler/recovery';
import crypto from 'crypto';
import jwt from './../jwt';
import Mailer from './../email';

class Recover extends Response {

    // This will receive a get request that pretty much states that we need to generates hash for a user. It must have an email in req.body.email.
    async generate(req, res) {
        let data;
        const dbUserHandler = new UserHandler();
        const dbRecoveryHandler = new RecoverHandler();
        try {

            let user = await dbUserHandler.addQuery({email: req.body.email}).readUsers();
            if(user.length !== 1) {
                throw new Error('Unexpected number of users in the DB');
            }
            user = user[0];
            const checkPreviousDistributions = await dbRecoveryHandler.checkUser(user._id);
            if(checkPreviousDistributions.length !== 0) {
                throw new Error('User already requested password change');
            }
            const userHash = await crypto.randomBytes(12).toString('hex');
            data = {
                err: false,
                hash: userHash
            }
            const url = await crypto.randomBytes(12).toString('hex');

            const mail = new Mailer([user.email], 'Password recovery').html(`<a href=http://localhost:3001/password/recovery?hash=${url}>Follow this link to reset your password</a>`).sendMail();

            await dbRecoveryHandler.insertHash(url, userHash, user._id);

        } catch(e) {
            console.log(e);
            data = {
                err: true,
                msg: 'Something went wrong'
            }
        }

        return new Response(data, 200);
    }

    // This function will return a special JWT only used for the change password. It must be sent to Verify.
    async verify(req, res) {
        let data, specialJWTPayload;

        const dbRecoveryHandler = new RecoverHandler();
        try {
            const urlHash = req.body.urlHash;
            const userHash = req.body.hash;

            let map = await dbRecoveryHandler.findHash(urlHash, userHash);
            if(map.length !== 1) {
                throw new Error('No hash found');
            }
            map = map[0];
            specialJWTPayload = {
                verifiedForChange: true,
                id: map._id,
                time: new Date().getTime()
            };

        } catch(e) {
            console.log(e);
            specialJWTPayload = {
                verifiedForChange: false,
                time: new Date().getTime()
            };
        }

        const jwtToken = jwt.generate(specialJWTPayload, 60).msg;

        return new Response({err: false, msg: jwtToken}, 200);
    }

    // Takes in the Special JWT. Makes the change in the DB.
    async changePassword(req, res) {
        let data;
        const dbUserHandler = new UserHandler();
        const dbRecoveryHandler = new RecoverHandler();
        try {
            const userToken = await jwt.check(req.body.jwt);
            if(userToken.msg.verifiedForChange !== true) {
                throw new Error('Not verified');
            }
            let recoveryData = await dbRecoveryHandler.getUserID(userToken.msg.id);
            if(recoveryData.length !== 1) {
                throw new Error('No matching user');
            }
            recoveryData = recoveryData[0];
            let user = await dbUserHandler.addQuery({_id: recoveryData.userID}).readUsers();
            if(user.length !== 1) {
                throw new Error('User nonexistent');
            }
            user = user[0];
            user.password = dbUserHandler.makePassword(req.body.sanitized.password);
            user.save();
            data = {
                err: false,
                msg: 'Success'
            };
            recoveryData.changed = true;
            recoveryData.save();
        } catch(e) {
            console.log(e);
            data = {
                err: true,
                msg: 'Something went wrong'
            };
        }

        return new Response(data, 200);
    }
}
export default new Recover();
