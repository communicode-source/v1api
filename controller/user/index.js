'use strict'

const userHandler  = require('./../../db/handler/user');

class User {

  updateUser(who, changes) {
    const userClass = new userHandler();
    return new Promise((resolve, reject) => {
      userClass.addQuery(who)
      .readUsers()
      .next()
      .value
      .then(
        (users) => {
          if(users.length !== 1) {
            return;
          }
          const user = users[0];
          const updateFunc = userClass.prepUpdate(user, changes)
          .updateUser();

          const results = updateFunc.next();

          if(results.done === true && results.value.err) {
            resolve(results.value);
            userClass.cleanup(false);
            return;
          } else if(results.done === true) {
            results.value
            .exec
            .then(
              () => {
                resolve({err: false, msg: 'Successful update.'});
                userClass.cleanup(true);
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
                  userClass.cleanup(true);
                }
              );
            });
          }
        }, (err) => {
          reject({err: true, msg: err.message});
        }
      );

    });

  }

}


module.exports = User;
