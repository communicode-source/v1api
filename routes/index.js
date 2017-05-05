/**
* List the objects of the routers here in alphabetical order please.
* Also space them so that the = always starts on the same column.
**/
const home          = require('./home');
const jwt           = require('./jwt');
const test          = require('./test');

const routes = {
  '/'     : home,
  '/test' : test,
  '/jwt'  : jwt
}

module.exports = (app) => {
  for(let i in routes) {
    app.use(i, routes[i]);
  }
};
