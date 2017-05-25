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
import {LoginDataPull, verifyExternalLoginUser, verifyLocalLoginUser, createLocalUser, createExternalUser, uniqueUser} from './../../utils'


class UserController extends Response {

  async loginUser(req, res) {
    if(['facebook', 'google', 'local'].indexOf(req.body.sanitized.provider) === -1)
      return new Response(101, this.statusCode['success'])

    const dbHandler = new UserHandler()
    let authenticate, status, data, user

    try {
      const isLocal = (req.body.sanitized.provider === 'local')
      user = (isLocal) ? req.body.sanitized : await createExternalUser(req.body.sanatized)
      const query = (isLocal) ? {provider: 'local', email: user.email} : {provider: user.provider, providerid: user.providerid}

      const users = await dbHandler.addQuery(query).readUsers()

      authenticate = (isLocal) ? verifyLocalLoginUser(req, users, dbHandler) : {status: 'success', data: users[0]}

      if(users.length !== 1 || authenticate.status !== 'success') {
        throw new Error('Too many/few users')
      }

      status = this.statusCode['success']
      data = jwt.generate(LoginDataPull(authenticate.data))

    } catch(e) {
      status = this.statusCode['success']
      data = 101
    }
    // try {
    //   const isLocal = (req.body.sanitized.provider === 'local')
    //   const query = (isLocal)
    //     ? {provider: 'local', email: req.body.sanitized.email}
    //     : {providerid: req.body.sanitized.providerid, provider: req.body.sanitized.provider}
    //
    //
    //   const users = await dbHandler.addQuery(query).readUsers()
    //
    //   authenticate = (isLocal)
    //     ? verifyLocalLoginUser(req, users, dbHandler)
    //     : verifyExternalUser(users)
    //
    //   status = this.statusCode[authenticate.status]
    //   data = (status == 500) ? 101 : jwt.generate(LoginDataPull(authenticate.data))
    //   status = 200
    // } catch(e) {
    //   console.log(e)
    //   status = this.statusCode['success']
    //   data = 101
    // }

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
