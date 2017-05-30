'use strict'

/**
 * @name Utility Bootstrap File
 * @author Cooper Campbell
 * Created at: 5/15/2017
 * A controller to handle logic for the Secure routes.
**/

// This contain shared logic.
import {LoginDataPull as userLogin} from './validations/userLogin';
// This is the logic for logging in a local user.
import {verifyLocalLoginUser as localLogin} from './validations/localLogin';
// This is the logic for logging in an externally provider for user.
import {verifyExternalUser as externalLogin} from './validations/externalLogin';
// This is the logic for creating a new local user.
import {createLocalNewUser as localUserCreation} from './validations/localCreation';
// This is the logic for creating a new external user.
import externalUserCreation from './validations/externalCreation';
// Specific logic for verifying Google tokens.
import verifyGoogle from './validations/googleVerifier';
// Logic for ensuring the user is unique / in the database.
import checkDB from './validations/userCreation';
// Specific logic for verifying facebook tokens.
import verifyFacebook from './validations/facebookVerifier';



export let LoginDataPull = userLogin;
export let isLocalUser = async (userToLogin, dbHandler) => {
  const results = await checkDB(userToLogin, dbHandler, 1)
  await localLogin(userToLogin, results, dbHandler)
  return results
}
export let verifyExternalLoginUser = (params) => externalUserCreation(params, verifyGoogle, verifyFacebook)
export let createExternalUser = (params) => externalUserCreation(params, verifyGoogle, verifyFacebook)
export let uniqueUser = checkDB;
export let ensureOnlyOne = (info, dbHandler) => checkDB(info, dbHandler, 1)
export let createLocalUser = localUserCreation;
