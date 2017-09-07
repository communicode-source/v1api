import controller from './../../controller/recover';
const router     = require('express').Router();

router.route('/generate')
  .post(async (req, res) => {
      const response = await controller.generate(req, res);
      res.status(response.getStatusCode()).json(response.getJSONData());
  })

router.route('/verify')
  .post(async (req, res) => {
      const response = await controller.verify(req, res);
      res.status(response.getStatusCode()).json(response.getJSONData());
  })

router.route('/change')
  .post(async (req, res) => {
      const response = await controller.changePassword(req, res);
      res.status(response.getStatusCode()).json(response.getJSONData());
  })

export default router;
