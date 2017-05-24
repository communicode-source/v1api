'use strict'

/**
 * @name Utility Bootstrap File
 * @author Cooper Campbell
 * Created at: 5/15/2017
 * A controller to handle logic for the Secure routes.
**/

// This contain shared logic.
import {LoginDataPull as userLogin} from './userLogin';
// This is the logic for logging in a local user.
import {verifyLocalLoginUser as localLogin} from './localLogin';
// This is the logic for logging in an externally provider for user.
import {verifyExternalUser as externalLogin} from './externalLogin';
// This is the logic for creating a new local user
import {createLocalNewUser as localUserCreation} from './localCreation';
// This is the logic for creating a new external user
import externalUserCreation from './externalCreation';
import verifyGoogle from './googleVerifier';
import checkDB from './userCreation';
import verifyFacebook from './facebookVerifier';

export let LoginDataPull = userLogin;

export let verifyLocalLoginUser = localLogin;

export let verifyExternalLoginUser = async (params) => {
  const res = await externalUserCreation(params, verifyGoogle, verifyFacebook);
  if(res === false){
    throw new Error('Something went wrong when verifying the access token')
    return;
  }
  return res;
};


export let uniqueUser = checkDB;
export let createLocalUser = localUserCreation;
export let createExternalUser = async (params) => {
  const res = await externalUserCreation(params, verifyGoogle, verifyFacebook);
  if(res === false){
    throw new Error('Something went wrong when verifying the access token')
    return;
  }
  return res;
};
