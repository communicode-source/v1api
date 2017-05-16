import express, { Router } from 'express';

const router = express.Router();

router.route('/me/:token')
  .post((req, res) => {
    req.startSessUser(req)
    res.status(200).json(req.userToken);
  })


module.exports = router;
