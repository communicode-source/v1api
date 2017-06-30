/**
* List the objects of the routers here in alphabetical order please.
* Also space them so that the = always starts on the same column.
**/
import callbacks from './callbacks';
import certifications from './certification';
import home from './home';
import jwt from './jwt';
import projects from './projects';
import secure from './secure';
import test from './test';
import search from './search';
import verify from './verify';
import connection from './connection';
import user from './user';
import review from './review';

const routes = {
  '/'     : home,
  '/certifications': certifications,
  '/jwt'  : jwt,
  '/projects': projects,
  '/secure': secure,
  '/test' : test,
  '/search' : search,
  '/update': callbacks,
  '/verify': verify,
  '/connection': connection,
  '/user': user,
  '/reviews': review
}

export default (app) => {
  for(let i in routes) {
    app.use(i, routes[i]);
  }
}
