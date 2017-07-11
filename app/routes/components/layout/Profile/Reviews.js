import React from 'react';
import classNames from 'classnames';
import styles from './../../../assets/css/pages/profile.scss';
import ReviewCard from './ReviewCard';

class Reviews extends React.Component {
    constructor({reviews}) {
        super();
        this.reviews = reviews;
    }

    render() {
        return (
            <div id={classNames(styles.reviews)}>
                {this.reviews.map(
                    item =>
                        <ReviewCard
                            profileImage = {item.profileImage}
                            personName = {item.personName}
                            projectName = {item.projectName}
                            stars = {item.stars}
                            reviewText = {item.reviewText}
                            recommendation = {item.recommendation}
                        />
                )}
            </div>
        );
    }
}
export default Reviews;
