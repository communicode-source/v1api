import express, { Router } from 'express';

// Require the ProjectController
import controller from './../../controller/project';

const router = express.Router();

router.route('/')

  .get( async (req, res) => {
    const response = await controller.index(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  })

  .post( async (req, res) => {
    const response = await controller.createProject(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  });

router.route('/update/:id')

    .put( async (req, res) => {
      const response = await controller.updateProject(req, res);

      res.status(response.getStatusCode()).json(response.getJSONData());
    });

router.route('/:id')

  .get( async (req, res) => {
    const response = await controller.findProject(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  });

router.route('/bookmark')

  .post( async (req, res) => {
    const response = await controller.bookmark(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  });

export default router;
