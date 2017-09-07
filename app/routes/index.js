/**
* List the objects of the routers here in alphabetical order please.
* Also space them so that the = always starts on the same column.
**/
import callbacks from './callbacks';
import certifications from './certification';
import home from './home';
import jwt from './jwt';
import projects from './projects';
import recover from './recover';
import search from './search';
import secure from './secure';
import stripeUser from './stripeuser';
import test from './test';
import verify from './verify';
import connection from './connection';
import user from './user';

const routes = {
  '/'     : home,
  '/certifications': certifications,
  '/jwt'  : jwt,
  '/projects': projects,
  '/recover': recover,
  '/secure': secure,
  '/search' : search,
  '/stripeuser': stripeUser,
  '/test' : test,
  '/update': callbacks,
  '/verify': verify,
  '/connection': connection,
  '/user': user
}

export default (app) => {
  for(let i in routes) {
    app.use(i, routes[i]);
  }
}
