import bodyParser from 'body-parser';
import logger from 'morgan';
import passport from 'passport';
import cors from 'cors';

import mongo from './mongo';
import passportMiddleware from './passport';
import sanatizer from './sanatizer';
import {sourced} from './sourced';
import tokenMiddleware from './jwt';

module.exports = (app) => {

  app.set('port', process.env.PORT || 3000);
  app.set('json spaces', 3);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));


  app.use('/', tokenMiddleware);

  app.use(sanatizer);

  app.use(logger('dev'));

  app.use(cors());

  mongo();
  sourced.connect();


  // Mongo middleware must come before.
  passportMiddleware(passport);
  app.use(passport.initialize());
}
