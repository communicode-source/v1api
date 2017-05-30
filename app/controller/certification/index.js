'use strict'
/**
 * @name certificationController
 * @author Daniel Adelfinsky
 * Last Edited at: 5/30/17
 * A controller use to handle the logic for the certifications
**/

// Require DB handler
import CertificationDBHandler from './../../db/handler/certification';
import Response from '../Response'

class CertificationController extends Response {
  /**
     * Index certification Controller - Logic for /certification route
     * @param req - Express Request object
     * @param res - Express Response object
    **/
  async index(req, res) {
    const dbHandler = new CertificationDBHandler();

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
  /**
     * Certiify certification Controller - Logic for /certification/:id or /certification/certify/:id route
     * @param req - Express Request object
     * @param res - Express Response object
    **/
  async check(req, res) {
    const dbHandler = new CertificationDBHandler();
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
}
export default new CertificationController();
