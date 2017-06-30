'use strict'
/**
 * @name ReviewDBHandler
 * @author Daniel Adelfinsky
 * Last Edited at: 6/30/17
 * A handler that holds all the functions for finding Reviews
 **/
const Review = require('./../../model/review');

class ReviewDBHandler {

  /**
   * findAll()
   * Returns all the reviews about an individual from the collection
   **/

  findAll() {
    return Review.find({}).exec();
  }
  /**
   * findById()
   * @param id - the mongo id of the specific user
   * Returns a specified Review from the collection by the _id
  **/
  findById(id) {
    console.log(id);
    return Review.findById(id).exec();
  }
  /**
   * make()
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
  /**
   * update()
   * @param id - the mongo id of the specific user
   * @param review - specifics for the review
   * Updates a rating and review
  **/
  update(id, review) {
    return Review.update(
      {"_id": id},
      { $set:
        {
         review: review.review,
         rating: review.rating
        }
       },
      { upsert: true}
    ).exec();
  }
  /**
   * remove(id)
   * @param id - the mongo id of the specific user
   * Removes a specified Review from the collection by the _id
  **/
  remove(id) {
    return Review.remove({"_id": id}).exec();
  }
  /**
   * find(query)
   * @param query - the mongoose query to run.
   * Returns reviews from collection by custom query
  **/
  find(query) {
    return Review.find(query).exec();
  }
}

module.exports = ReviewDBHandler;
