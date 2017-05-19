'use strict'

/**
 * @name Utility Bootstrap File
 * @author Cooper Campbell
 * Created at: 5/15/2017
 * A controller to handle logic for the Secure routes.
**/
import localUserLogin from './localLogin';
import externalUserLogin from './externalLogin';
import userLogin from './userLogin';

export let LoginDataPull = userLogin.LoginDataPull;

export let verifyLocalLoginUser = localUserLogin.verifyLocalLoginUser;

export let verifyExternalUser = externalUserLogin.verifyExternalUser;
