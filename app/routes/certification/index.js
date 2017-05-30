/**
 * @name certification route
 * @author Daniel Adelfinsky
 * Last Edited at: 5/30/17
 * Route for the certification information
 **/
import express, { Router } from 'express';

//Require the certificationController
import controller from './../../controller/certification';
var Mailer    = require('../../../mailer.js');
var randtoken = require('rand-token');

const router = express.Router();

router.route('/')

//lists all the certified nonprofits
  .get( async (req, res) => {
    const response = await controller.index(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  });

//route that has the ID as the input and returns information about a specific nonprofit and then sends an email.
router.route('/:id')

  .get( async (req, res) => {
    const response = await controller.check(req, res);
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&';
    var authToken = '';
    for (var i = 84; i > 0; --i) {
      authToken += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    res.status(response.getStatusCode()).json(response.getJSONData());
    var mail = new Mailer(
      response.getJSONData().email,
      'Communicode Certification Test',
      'Thanks for trying to start account Certification. Please visit this link to get started www.localhost:3000/certifications/verify/' + authToken
    );
    mail.sendMail();
  });

//returns true/false based on if the nonprofit is in the certified collection or not
router.route('/certify/:id')
  .get( async (req, res) => {
    const response = await controller.check(req, res);
    if (response.getJSONData() == null){
      res.status(200).json({
        msg: 'False'
      });
      return;
    } else {
      res.status(200).json({
        msg: 'True'
      });
      res.status(response.getStatusCode()).json(response.getJSONData());
      return;
    }
  });

export default router;
