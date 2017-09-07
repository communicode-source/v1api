import express, { Router } from 'express';

// Require the ProjectController
import controller from './../../controller/portfolio';
import { requireLogin } from './../../middleware/auth';

const router = express.Router();

router.route(requireLogin, '/')

  .post( async (req, res) => {
    const response = await controller.createProject(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  });


export default router;
