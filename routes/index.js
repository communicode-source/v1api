const test          = require('./test');
const jwt           = require('./jwt');

const routes = {
  '/'     : test,
  '/test' : test,
  '/jwt'  : jwt,
}

module.exports = (app) => {
  for(let i in routes) {
    app.use(i, routes[i]);
  }
};
