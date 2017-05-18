/**
* List the objects of the routers here in alphabetical order please.
* Also space them so that the = always starts on the same column.
**/
import callbacks from './callbacks';
import home from './home';
import jwt from './jwt';
import projects from './projects';
import secure from './secure';
import test from './test';
import search from './search';

const routes = {
  '/'     : home,
  '/jwt'  : jwt,
  '/projects': projects,
  '/secure': secure,
  '/test' : test,
  '/search' : search,
  '/update': callbacks,
}

export default (app) => {
  for(let i in routes) {
    app.use(i, routes[i]);
  }
}
