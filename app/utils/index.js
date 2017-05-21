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
import {createExternalNewUser as externalUserCreation} from './externalCreation';
import checkDB from './userCreation';

export let LoginDataPull = userLogin;

export let verifyLocalLoginUser = localLogin;

export let verifyExternalUser = externalLogin;


export let uniqueUser = checkDB;
export let createLocalUser = localUserCreation;
export let createExternalUser = {};
