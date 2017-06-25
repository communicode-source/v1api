import express, { Router } from 'express';

// Require the ProjectController
import { controller } from './../../controller/user';

const router = express.Router();

router.route('/update/name/:id')

  .put( async (req, res) => {
    const response = await controller.updateFirstAndLastName(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  })


export default router;
