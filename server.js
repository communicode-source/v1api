const app        = require('express')();
const routes     = require('./routes');
const middleware = require('./middleware');

// Declaration of all Middleware.
middleware(app);

// Declaration of all Routes.
routes(app);

module.exports = app;
