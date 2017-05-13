import express, { Router } from 'express';

const router = express.Router();

router.route('/')

  .get((req, res) => {

    res.status(200).json({
      err: false,
      msg: 'Welcome to the Communicode API.'
    });

  });

export default router;
