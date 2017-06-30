
/**
 * @name ReviewRoute
 * @author Daniel Adelfinsky
 * Last Edited at: 6/29/17
 * Does the review route stuff
 **/

import express, { Router } from 'express';

//Require the ReviewController
import controller from './../../controller/review';


const router = express.Router();

router.route('/')

  .get( async (req, res) => {
    const response = await controller.index(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  });


router.route('/:id')

  .get( async (req, res) => {
    const response = await controller.getReview(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());

  });

router.route('/add')

  .post( async (req, res) => {
    const response = await controller.makeReview(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  })

router.route('/update')

  .put( async (req, res) => {
    const response = await controller.makeReview(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  })

router.route('/remove')

  .delete( async (req, res) => {
    const response = await controller.getReview(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  })


export default router;
