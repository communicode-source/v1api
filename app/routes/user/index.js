import express, { Router } from 'express';

// Require the ProjectController
import { controller } from './../../controller/user';
import { requireLogin } from './../../middleware/auth';

const router = express.Router();

router.route(requireLogin, '/update/:id')

  .get( async (req, res) => {
    const response = await controller.updateUser(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  });

router.route('/profile/:url')

  .get( async (req, res) => {
    const response = await controller.getUserProfile(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  });

router.route(requireLogin, '/update/name/:id')

  .put( async (req, res) => {
    const response = await controller.updateFirstAndLastName(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  });

router.route(requireLogin, '/update/interests/:id')

  .put( async (req, res) => {
    const response = await controller.updateInterests(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  });


export default router;
