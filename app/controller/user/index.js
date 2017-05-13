'use strict'

const UserHandler  = require('./../../db/handler/user');

class UserController {

  updateUser(who, changes) {
    const dbHandler = new UserHandler();
    return new Promise((resolve, reject) => {
      dbHandler.addQuery(who)
      .readUsers()
      .next()
      .value
      .then(
        (users) => {
          if(users.length !== 1) {
            return;
          }
          const user = users[0];
          const updateFunc = dbHandler.prepUpdate(user, changes)
          .updateUser();

          const results = updateFunc.next();

          if(results.done === true && results.value.err) {
            resolve(results.value);
            dbHandler.cleanup(false);
            return;
          } else if(results.done === true) {
            results.value
            .exec
            .then(
              () => {
                resolve({err: false, msg: 'Successful update.'});
                dbHandler.cleanup(true);
              }
            )
          } else {
            results.value
            .then(() => {
              updateFunc.next()
              .value
              .exec
              .then(
                () => {
                  resolve({err: false, msg: 'Updated successfully.'});
                  dbHandler.cleanup(true);
                }
              );
            });
          }
        }, (err) => {
          reject({err: true, name: err.name, msg: err.message});
        }
      );

    });

  }

}


module.exports = UserController;
