import express from 'express';
import routes from './routes';
import middleware from './middleware';

const app = express();

// Declaration of all Middleware.
middleware(app);

// Declaration of all Routes.
routes(app);

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
