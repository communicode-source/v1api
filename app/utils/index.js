'use strict'

/**
 * @name Utility Bootstrap File
 * @author Cooper Campbell
 * Created at: 5/15/2017
 * A controller to handle logic for the Secure routes.
**/

// This is the logic for logging in a local user.
import localUserLogin from './localLogin';
// This is the logic for loggin in an externally provider for user.
import externalUserLogin from './externalLogin';

// This contain shared logic.
import userLogin from './userLogin';

export let LoginDataPull = userLogin.LoginDataPull;

export let verifyLocalLoginUser = localUserLogin.verifyLocalLoginUser;

export let verifyExternalUser = externalUserLogin.verifyExternalUser;
