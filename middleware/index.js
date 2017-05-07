const bodyParser           = require('body-parser');
const cors                 = require('cors');
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

  app.use(cors());

  mongo();

  // Mongo middleware must come before.
  passportMiddleware(passport);
  app.use(passport.initialize());
}
