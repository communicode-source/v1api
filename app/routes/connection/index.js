import express, { Router } from 'express';

// Require the ConnectionController
import controller from './../../controller/connection';

const router = express.Router();

router.route('/create')

  .post( async(req, res) => {
    const response = await controller.createConnection(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  });

router.route('/followers/:id')

  .get( async(req, res) => {
    const response = await controller.getAllFollowersForUser(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  });

router.route('/following/:id')

  .get( async(req, res) => {
    const response = await controller.getAllFollowingForUser(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  });
router.route('/stats/:id')

  .get( async(req, res) => {
    const response = await controller.getNumberOfStats(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  });

export default router;
