const bodyParser           = require('body-parser');
const logger               = require('morgan');
const passport             = require('passport');

const mongo                = require('./mongo');
const passportMiddleware   = require('./passport');

module.exports = (app) => {

  app.set('port', process.env.PORT || 3000);
  app.set('json spaces', 3);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(logger('dev'));

  mongo();

  // Mongo middleware must come before.
  passportMiddleware(passport);

}
