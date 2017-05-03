const logger     = require('morgan');
const bodyParser = require('body-parser');
const mongo      = require('./mongo');

module.exports = (app) => {

  app.set('port', process.env.PORT || 3000);
  app.set('json spaces', 3);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(logger('dev'));

  mongo();

}
