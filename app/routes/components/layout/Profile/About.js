import React from 'react';
import classNames from 'classnames';
import styles from './../../../assets/css/pages/profile.scss';
// import PropTypes from 'prop-types';


class About extends React.Component {
    constructor({fname, lname, biography, skills, location, job, interests}) {
        super();
        this.fname = fname;
        this.lname = lname;
        this.biography = biography;
        this.skills = skills;
        this.interests = interests;
        this.location = location;
        this.job = job;
    }

    buildSkills() {
        const node = this.skills.map((item, index) => <p key={index} className={classNames(styles.button)}>{item}</p>);
        return node;
    }

    buildInterests() {
        const node = this.interests.map((item, index) => <p key={index} className={classNames(styles.button)}>{item}</p>);
        return node;
    }

    render() {
        return (
            <div id={classNames(styles.about)}>
                <div className={classNames(styles.item)}>
                    <h3>About {this.fname} {this.lname}</h3>
                    <hr />
                    <p>{this.biography}</p>
                    <div className={classNames(styles.moreinfo)}>
                        <p><i className="fa fa-location-arrow" aria-hidden="true"></i> {this.location}</p>
                        <p><i className="fa fa-map-marker" aria-hidden="true"></i> {this.job}</p>
                    </div>
                </div>
                <div className={classNames(styles.item)}>
                    <h3>{this.fname}&#39;s Skills</h3>
                    <hr />
                    <div className={classNames(styles.btns)}>
                        {this.buildSkills.call(this)}
                    </div>
                </div>
                <div className={classNames(styles.item)}>
                    <h3>{this.fname}&#39;s Interests</h3>
                    <hr />
                    <div className={classNames(styles.btns)}>
                        {this.buildInterests.call(this)}
                    </div>
                </div>
            </div>
        );
    }

}
export default About;
