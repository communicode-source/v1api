/**
* Last Date Updated: 05.04.17
* @name jwt/index
* @author Cooper Campbell
* This routes the home api route '/'.
* This depends on the express router, and the jwt controller.
**/
import express, { Router } from 'express';
import controller from './../../controller/jwt';

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.status(200).json({msg: 'Welcome to the JWT API.', options: ['/gen', '/decode', '/check']});
  })

router.route('/gen')
  .get((req, res) => {
    res.status(200).json(controller.generate({fname: 'Cooper', lname: 'Campbell', id: 'TheLegend', location: req.connection.remoteAddress}));
  })

router.route('/decode/:jwt')
  .get((req, res) => {
    res.status(200).json(controller.decode(req.params.jwt));
  })

router.route('/check/:jwt')
  .get((req, res) => {
    res.status(200).json(controller.check(req.params.jwt, req));
  })

export default router;
