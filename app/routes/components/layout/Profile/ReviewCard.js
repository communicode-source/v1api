import React from 'react';
import classNames from 'classnames';
import styles from './../../../assets/css/pages/profile.scss';
// import PropTypes from 'prop-types';

class ReviewCard extends React.Component {
    constructor({profileImage, personName, projectName, stars, reviewText, recommendation}) {
        super();
        this.profileImage = profileImage;
        this.personName = personName;
        this.projectName = projectName;
        this.stars = stars;
        this.reviewText = reviewText;
        this.recommendation = recommendation;
    }

    getStarBuild() {
        let iStar = 0;
        const starNode = [];
        while(iStar < Math.floor(this.stars)) {
            starNode.push(<i className={classNames('fa', 'fa-star')} aria-hidden="true"></i>);
            iStar++;
        }
        if(this.stars % 1 !== 0) {
            starNode.push(<i className={classNames('fa', 'fa-star-half-o')} aria-hidden="true"></i>);
        }
        while(iStar < 5) {
            starNode.push(<i className={classNames('fa', 'fa-star-o')} aria-hidden="true"></i>);
            iStar++;
        }
        return starNode;
    }

    render() {
        return (
            <div className={classNames(styles.review)}>
                <img src={this.profileImage} className={classNames(styles.icon)} />
                <div classNames={classNames(styles.right)}>
                    <h3>{this.personName}, <i>{this.projectName}</i></h3>
                    <div className={classNames(styles.stars)}>
                        {this.getStarBuild.call(this)}
                    </div>
                    <p>{this.reviewText}</p>
                    <i>Would I recommend?</i>
                    <p>{this.recommendation}</p>
                </div>
            </div>

        );
    }
}
export default ReviewCard;
