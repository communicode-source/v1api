import express, { Router } from 'express';

// Require the ProjectController
import controller from './../../controller/project';
import { requireLogin } from './../../middleware/auth';

const router = express.Router();

router.route(requireLogin, '/')

  .get( async (req, res) => {
    const response = await controller.index(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  })

  .post( async (req, res) => {
    const response = await controller.createProject(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  });

router.route(requireLogin, '/update/:id')

    .put( async (req, res) => {
      const response = await controller.updateProject(req, res);

      res.status(response.getStatusCode()).json(response.getJSONData());
    });

router.route(requireLogin, '/:id')

  .get( async (req, res) => {
    const response = await controller.findProject(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  });

router.route(requireLogin, '/bookmark')

  .post( async (req, res) => {
    const response = await controller.bookmark(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  });

export default router;
