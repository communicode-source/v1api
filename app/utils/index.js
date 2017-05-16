'use strict'

/**
 * @name Utility Bootstrap File
 * @author Cooper Campbell
 * Created at: 5/15/2017
 * A controller to handle logic for the Secure routes.
**/
import activeUser as isActive from './activeUser';
import userLogin as LoginUtility from './userLogin';
import userUpdate as UpdateUtility from './userUpdate';


module.exports = {

  CRUDUserBootstrap: {
    verify : (req) => {
      const token = req.userToken;
      if(isActive(token) == false) {
        return {err: true, msg: 'Invalid user token'};
      }
      return {err: false, msg: 'Token is valid'};
    },

    formatUpdateData: (req, secure = true) => {
      const data = (secure == true) ? req.body.sanatized : req.body;

      return userUpdate.lCaseIndex(data);
    },

    nameChangeProtection: async (tokenPayload, protectedData, dbHandler) => {
      const containFoLName = ((protectedData.fname && protectedData.fname == tokenPayload.fname) || (protectedData.lname && protectedData.lname == tokenPayload.lname)) ? false : true;
      if(containFoLName == false) {
        return protectedData;
      }
      let fname = protectedData.fname || tokenPayload.fname;
      let lname = protectedData.lname || tokenPayload.lname;

      const set = await userUpdate.getSet(fname, lname, dbHandler.model)
      const urlNum = getUrlNumber(set);
      protectedData.url = fname+'.'+lname+toString(urlNum);
      protectedData.urlnum = urlNum;
      return protectedData;

    },

  },

}
