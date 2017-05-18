import express, { Router} from 'express';

// Require the SearchController
import controller from './../../controller/search';

const router = express.Router();

router.route('/:id')

	.get( async (req, res) => {
		const response = await controller.search(req, res);

		res.status(response.getStatusCode()).json(response.getJSONData());
	});
export default router;
