'use strict'
/**
 * @name ReviewDBHandler
 * @author Daniel Adelfinsky
 * Last Edited at: 6/29/17
 * A handler that holds all the functions for finding Reviews
 **/
const Review = require('./../../model/review');

class ReviewDBHandler {

  //lists all certifcations in db
  findAll() {
    return Review.find({}).exec();
  }
  /**
   * find()
   * @param id - the mongo id of the specific user
   * Returns a specified Review from the collection by the _id
  **/
  findById(id) {
    console.log(id);
    return Review.findById(id).exec();
  }
  /**
   * find()
   * @param review - specifics for the review
   * Makes a new review
  **/
  make(review) {
    return new Review({
      volunteer_id: review.volunteer_id,
      nonprofit_id: review.nonprofit_id,
      rating: review.rating,
      projectType: review.projectType,
      review: review.review,
      createdAt: review.createdAt
    }).save();
  }
}

module.exports = ReviewDBHandler;
