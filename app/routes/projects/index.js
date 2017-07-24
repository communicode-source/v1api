import express, { Router } from 'express';

// Require the ProjectController
import controller from './../../controller/project';
import { requireLogin } from './../../middleware/auth';

const router = express.Router();

router.route('/')

  .get( requireLogin, async (req, res) => {
    const response = await controller.index(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  })

  .post( requireLogin, async (req, res) => {
    const response = await controller.createProject(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  });

router.route('/update/:id')

    .put( requireLogin, async (req, res) => {
      const response = await controller.updateProject(req, res);

      res.status(response.getStatusCode()).json(response.getJSONData());
    });

router.route('/:id')

  .get( requireLogin, async (req, res) => {
    const response = await controller.findProject(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  });

router.route('/find/:id')
  .get( async (req, res) => {
    const response = await controller.findProjectByNP(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
});

router.route('/complete')
  .put( requireLogin, async (req, res) => {
    const response = await controller.complete(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
});

router.route('/bookmark')

  .post( requireLogin, async (req, res) => {
    const response = await controller.bookmark(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  });

export default router;
