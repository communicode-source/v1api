'use strict'

const UserHandler  = require('./../../db/handler/user');

class UserController {

  updateUser(who, changes) {
    const dbHandler = new UserHandler();
    // WILL DO STUFF LATER

}


module.exports = UserController;
