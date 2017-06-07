'use strict'

/**
 * @name UserController
 * @author Cooper Campbell
 * Created at: 5/19/2017
 * A controller to handle the login, update, logout, and sign up of users.
**/

import jwt from './../jwt'
import Response from './../Response.js'
// Require the Handler for the user.
import UserHandler from './../../db/handler/user'
// Utilities for the logins and sign ups because they contain a lot of logic.
import {LoginDataPull, verifyExternalLoginUser, isLocalUser, createLocalUser, createExternalUser, uniqueUser, ensureOnlyOne} from './../../utils/validations'


class UserController extends Response {

  async loginUser(req, res) {
    // Declarations of constants
    const contents = req.body.sanitized
    const dbHandler = new UserHandler()
    const isLocal = (req.body.sanitized.provider === 'local')
    // Declarations of  variables
    let status, data, newUser

    try {
      let user = contents

      // Gets the user from the database and does checking to ensure passwords match, etc.
      user = (isLocal) ? await isLocalUser(user, dbHandler) : await uniqueUser(await createExternalUser(contents), dbHandler, 1)

      // Create the status code and the user JWT as data.
      status = this.statusCode['success']
      data = jwt.generate(LoginDataPull(user))

    } catch(e) {
      console.log(e)
      status = this.statusCode['success']
      data = 100
    }

    return new Response(data, status)
  }


    async createUser(req, res) {
      // Declarations of constants
      const contents = req.body.sanitized
      const dbHandler = new UserHandler()
      const isLocal = (req.body.sanitized.provider === 'local')
      // Declarations of  variables
      let status, data, newUser

      try {
        // Getting the user Json from the req.
        newUser = (isLocal) ? createLocalUser(contents, dbHandler) : await createExternalUser(contents)
        // Checks to ensure the new user is in fact unique.
        const unique = await uniqueUser(newUser, dbHandler)

        // Creating the new user in the DB and returning it.
        newUser = await dbHandler.createUser(newUser)

        // Create the status code and the user JWT as data.
        status = this.statusCode['success']
        data = jwt.generate(LoginDataPull(newUser))

      } catch(e) {
        console.log(e)
        status = this.statusCode['success']
        data = 100
      }

      return new Response(data, status)
    }

}

export let controller = new UserController()
