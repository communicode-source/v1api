'use strict'

/**
 * @name ReviewController
 * @author Daniel Adelfinsky
 * Last Edited at: 6/29/17
 * A controller use to handle the logic for Reviews
**/

// Require DB handler
import ReviewDBHandler from './../../db/handler/review';
import Response from '../Response'

class ReviewController extends Response {

  /**
     * Index review Controller - Logic for /review route
     * @param req - Express Request object
     * @param res - Express Response object
    **/


  async index(req, res) {
    const dbHandler = new ReviewDBHandler();

    let data, statusCode
    try {
      data = await dbHandler.findAll();
      statusCode = this.statusCode['success'];
    } catch(err) {
      data = await dbHandler.findAll();
      statusCode = this.statusCode['not found'];
    }

    return new Response(data, statusCode);
  }

  async getReview(req, res) {
    const dbHandler = new ReviewDBHandler();
    const id = req.params.id;

    let data, statusCode;
    try {
      data = await dbHandler.findById(id);
      statusCode = this.statusCode['success'];
    } catch(err) {
      data = await dbHandler.findById(id);
      statusCode = this.statusCode['not found'];
    }

    return new Response(data, statusCode);
  }

  async makeReview(req, res) {
    const dbHandler = new ReviewDBHandler();

    let data, statusCode;
    try {
      data = await dbHandler.make(req.body);
      statusCode = this.statusCode['success'];
    } catch(err) {
      data = await dbHandler.make(req.body);
      statusCode = this.statusCode['not found'];
    }

    return new Response(data, statusCode);
  }

}
export default new ReviewController();
