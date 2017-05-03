const app        = require('express')();
const routes     = require('./../routes');
const middleware = require('./../middleware');

// Declaration of all Middleware.
middleware(app);

// Declaration of all Routes.
routes(app);

// Starting the server.
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
