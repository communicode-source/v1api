import express, { Router } from 'express';
import multer from 'multer';

// Require the ProjectController
import { controller } from './../../controller/user';
import { requireLogin } from './../../middleware/auth';

const router = express.Router();

router.route('/update')

  .put( requireLogin, async (req, res) => {
    const response = await controller.updateUser(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  });

router.route('/profile/:url')

  .get(async (req, res) => {
    const response = await controller.getUserProfile(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  });

router.route('/update/name/:id')

  .put( requireLogin, async (req, res) => {
    const response = await controller.updateFirstAndLastName(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  });

router.route('/update/interests/:id')

  .put( requireLogin, async (req, res) => {
    const response = await controller.updateInterests(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  });


router.route('/avatar/upload')

  .post(requireLogin, async(req, res) => {
      const response = await controller.uploadAvatar(req, res);

      res.status(response.getStatusCode()).json(response.getJSONData());
  });

router.route('/cover/upload')

.post(requireLogin, async(req, res) => {
    const response = await controller.uploadCover(req, res);
    if(response) {
        res.status(response.getStatusCode()).json(response.getJSONData());
    }
});

router.route('/unlink/getemail')
.put(requireLogin, async(req, res) => {
    const response = await controller.sendEmailForStripe(req, res);
    if(response) {
        res.status(response.getStatusCode()).json(response.getJSONData());
    }
});

router.route('/unlink/stripe')
.put(requireLogin, async(req, res) => {
    const response = await controller.deleteStripeUser(req, res);
    if(response) {
        res.status(response.getStatusCode()).json(response.getJSONData());
    }
});

router.route('/me')
.post(requireLogin, async(req, res) => {
    const response = await controller.getLoggedInUser(req, res);
    if(response) {
        res.status(response.getStatusCode()).json(response.getJSONData());
    }
    else {
        res.send('Failed');
    }
});

export default router;
