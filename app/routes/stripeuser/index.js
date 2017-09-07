import express, { Router } from 'express';

// Require the ProjectController
import { controller } from './../../controller/user';

const router = express.Router();

router.route('/')
.get( async (req, res) => {
  const response = await controller.createStripeUser(req, res);
});

export default router;
