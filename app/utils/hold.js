/**
*
* PLEASE NOTE THAT THIS IS A TEMPORARY FILE TO STORE FUNCTIONS AND CONCEPTS THAT WERE PREVIOUSLY
*   POORLY IMPLEMENTED. DO NOT ALTER THIS FILE AS ALL CONTENTS OF THE WILL EVENTUALLY BE MOVED INTO
*   OTHER FILES THAT HAVE THE SAME FUNCTIONALITY.
**/

const userModel = require('./../db/model/user');


module.exports = {
  lCaseIndex : (payload) => {
    const base = {};
    for(let i in payload) {
      base[i.toLowerCase()] = payload[i];
    }
    return base;
  },

  updateUrl : (fname, lname) => {
    let urlBase = fname+'.'+lname; // Base of the URL.
    let reg = new RegExp("^"+urlBase+"[0-9]*$"); // Regex used for matching.
    return userModel.find({url: {$regex: reg, $options: 'i'}}, null, {sort: {urlnum: 1}}).exec();
  },

  getUrlNumber : (set) => {
    let length = set.length-1;
    if(length === -1) {
      return 1;
    }
    let cor = 0;
    let inc = length;
    let userNum = getMatch(set, length);
    let iterator = 0;
    if(userNum == (length+1)) {
      return (+userNum + 1);
    }
    if(getMatch(set, 0) != 1) {
      return +1;
    }
    length = Math.floor(newLength(cor, inc));
    while(cor + 1 != inc && iterator < 30) {
      iterator++;
      userNum = getMatch(set, length);
      if(userNum == length + 1) {
        cor = length;
      } else {
        inc = length;
      }
      length = Math.floor(newLength(cor, inc));
    }
    return (+getMatch(set, cor) + 1);
  },
}
const newLength = (cor, inc) => ((cor + inc)/2);
const getMatch = (set, length) => set[length].urlnum;

//=============================================
// WAS A PART OF UPDATE()
//=============================================
// if(this.ready === false) {
//   return {err: true, msg: (this.prepFail) ? this.prepFail : 'Run prepUpdate first'};
// }
// if(this.update.fname || this.update.lname) {
//   yield new Promise((resolve, reject) => {
//     const fname = (this.update.fname) ? this.update.fname.toLowerCase() : this.user.fname.toLowerCase();
//     const lname = (this.update.lname) ? this.update.lname.toLowerCase() : this.user.lname.toLowerCase();
//     const matches = libs.updateUrl(fname, lname);
//     matches.then((results) => {
//       const number = libs.getUrlNumber(results);
//       this.update.url = fname+"."+lname+number.toString();
//       this.update.urlnum = number;
//       resolve();
//     });
//   });
// }
//
// return {exec: User.update({_id: this.user._id}, {$set: this.update}).exec(), cleanup: this.cleanup};

//=============================================
// WAS A PART OF PREPUPDATE()
//=============================================
// return new Promise((resolve, reject) => {
//   this.user = libs.lCaseIndex(data);
//   if(this.user.fname && this.user.lname) {
//     const fname = this.user.fname.toLowerCase();
//     const lname = this.user.lname.toLowerCase();
//     libs.updateUrl(fname, lname)
//     .then((results) => {
//       const number = libs.getUrlNumber(results);
//       this.user.url = fname+"."+lname+number.toString();
//       this.user.urlnum = number;
//       const newUser = new User(this.user);
//       newUser.save();
//       return resolve(newUser);
//     }).catch((err) => {
//       console.log(err);
//       return reject(err);
//     });
//   } else {
//     const newUser = new User(this.user);
//     newUser.save();
//     return resolve(newUser);
//   }
// });

//=============================================
// WAS A PART OF Controller update()
//=============================================
// return new Promise((resolve, reject) => {
//   dbHandler.addQuery(who)
//   .readUsers()
//   .next()
//   .value
//   .then(
//     (users) => {
//       if(users.length !== 1) {
//         return;
//       }
//       const user = users[0];
//       const updateFunc = dbHandler.prepUpdate(user, changes)
//       .updateUser();
//
//       const results = updateFunc.next();
//
//       if(results.done === true && results.value.err) {
//         resolve(results.value);
//         dbHandler.cleanup(false);
//         return;
//       } else if(results.done === true) {
//         results.value
//         .exec
//         .then(
//           () => {
//             resolve({err: false, msg: 'Successful update.'});
//             dbHandler.cleanup(true);
//           }
//         )
//       } else {
//         results.value
//         .then(() => {
//           updateFunc.next()
//           .value
//           .exec
//           .then(
//             () => {
//               resolve({err: false, msg: 'Updated successfully.'});
//               dbHandler.cleanup(true);
//             }
//           );
//         });
//       }
//     }, (err) => {
//       reject({err: true, name: err.name, msg: err.message});
//     }
//   );
//
// });
//
// }

//general
// this.fields           = ['_id',
//                           'email',
//                           'accounttype',
//                           'provider',
//                           'providerid',
//                           'password',
//                           'fname',
//                           'lname',
//                           'organizationname',
//                           'url',
//                           'urlnum',
//                           'nonprofittype',
//                           'skills',
//                           'interests'];




// EXAMPLE MONGODB JOIN
// import {sourced} from './../../middleware/sourced';
// let y = async () => {
//   let db = sourced.returnConnection();
//   return new Promise((res, rej) => {
//     const MongoObjectId = require('mongodb').ObjectID;
//     const collection = db.collection('users');
//     collection.aggregate([
//       {
//         $match:
//         {
//           _id: MongoObjectId('5910fe7f1131cd27a41a1337')
//         }
//       },
//       {
//         $lookup:
//         {
//           from: "tests",
//           localField: "_id",
//           foreignField: "UID",
//           as: "aggregate"
//         }
//       },
//       {
//         $project:
//         {
//           _id: "$_id",
//           fname: "$fname",
//           lname: "$lname",
//           email: "$email",
//           url: "$url",
//           urlnum: "$urlnum",
//           provider: "$provider",
//           providerid: "$providerid",
//           organizationname: "$organizationname",
//           nonprofittype: "$nonprofittype",
//           interests: "$interests",
//           datejoined: "$datejoined",
//           accounttype: "$accounttype",
//           msgid: "$aggregate._id",
//           msg: "$aggregate.msg"
//         }
//       }
//     ]).next((e,c) => {
//       res(c||e);
//     });
//   });
// }


verify : (req) => {
  const token = req.userToken;
  if(isActive(token) == false) {
    return {err: true, msg: 'Invalid user token'};
  }
  return {err: false, msg: 'Token is valid'};
},

formatUpdateData: (req, secure = true) => {
  const data = (secure == true) ? req.body.sanitized : req.body;

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


=====================================================================================================
if(req.body.provider = 'local') {
  const users = await dbHandler.addQuery({provider: 'local', email: req.body.email});
  const localAuthenticate = verifyLocalLoginUser(req, users, dbHandler);
  const SC = this.statusCode[localAuthenticate.status];
  const data (SC == 'error') ? localAuthenticate.data : LoginDataPull(localAuthenticate.data);
} else if(req.body.provider == 'facebook' || req.body.provider == 'google') {
  const users = await dbHandler.addQuery({providerid: req.body.providerid, provider: req.body.provider}).readUsers();
  const externalAuthenticate = verifyExternalUser(users);
  const SC = this.statusCode[externalAuthenticate.status];
  const verifyToken = verifyExternalAuthentication(req.body.token, req.body.provider);
  const data = (SC == 'error') ? externalAuthenticate.data : LoginDataPull(externalAuthenticate.data);
} else {
  const SC = this.statusCode['error'];
  const data = 'Mutated data.';
}
