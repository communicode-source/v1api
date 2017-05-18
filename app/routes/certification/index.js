import express, { Router } from 'express';

//Require the certificationController
import controller from './../../controller/certification';

const router = express.Router();

router.route('/')

//lists all the certified nonprofits
  .get( async (req, res) => {
    const response = await controller.index(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  });

//route that has the ID as the input and returns information about a specific nonprofit
router.route('/:id')

  .get( async (req, res) => {
    const response = await controller.certify(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
  });

router.route('/certify/:id')
//returns true/false based on the status of isCertifid of the nonprofits account
  .get( async (req, res) => {
    const response = await controller.certify(req, res);

    res.status(response.getStatusCode()).json(response.getJSONData());
    if (response == null){
      res.status(200).json({
        msg: 'False'
      });
    }
  });

export default router;
