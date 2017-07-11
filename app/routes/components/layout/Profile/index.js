import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './../../../assets/css/pages/profile.scss';
import About from './About';
import Projects from './Projects';
import Reviews from './Reviews';

class Profile extends React.Component {
    constructor() {
        super();
        this.active = 'About';
        this.fname = 'Trevor';
        this.lname = 'Crupi';
        this.location = 'Westfield, IN';
        this.follows = '20';
        this.job = 'Communicode';
        this.followers = '35';
        this.biography = 'I love to take what code people have written and just write over it. My friend totally isnt still salty about it';
        this.socials = {
            Twitter: 'https://lalalala.com',
            Github: 'https://lolwearentusinggithub.com',
            Facebook: 'https://deleted.com'
        };
        this.skills = ['Nothing', 'Jumping', 'Talking', 'Def not coding'];
        this.interests = ['Crying', 'Sleeping', 'Eating'];
        this.repositories = [
            {image: null, github: null, website: 'www.google.com', name: 'Google', description: 'My favorite website <3'},
            {image: null, github: 'another one', website: 'www.hacked.com', name: 'Hackerbot', description: 'Hacked'}
        ];
        this.projects = [
            {image: 'https://source.unsplash.com/random', github: 'https://github.com/communicode-source/communicode', website: 'https://communicode.co', name: 'Communicode', description: 'A dating site for nonprofits and developers!'},
            {image: 'https://source.unsplash.com/random', github: null, website: 'www.google.com', name: 'Google', description: 'My favorite website <3'},
            {image: 'https://source.unsplash.com/random', github: null, website: 'www.google.com', name: 'Google', description: 'My favorite website <3'},
            {image: 'https://source.unsplash.com/random', github: null, website: 'www.google.com', name: 'Google', description: 'My favorite website <3'},
        ];
        this.reviews = [
            {
                profileImage: 'https://source.unsplash.com/random',
                personName: 'Cooper Campbell',
                projectName: 'Communicode | Profile Page',
                stars: 1,
                reviewText: 'He kept overriding my work!',
                recommendation: 'NO!'
            },
            {
                profileImage: 'https://source.unsplash.com/random',
                personName: 'Nich Dullan',
                projectName: 'Shapiro',
                stars: 3.5,
                reviewText: 'He kept trying to change the language and was really bossy.',
                recommendation: 'Yes'
            },
            {
                profileImage: 'https://source.unsplash.com/random',
                personName: 'Curt Whitesell',
                projectName: 'Business',
                stars: 2.5,
                reviewText: 'He kept spending all my money',
                recommendation: 'No'
            }
        ];
        this.main = this.buildCorrectPage.call(this);
    }

    handleLinkClick(e) {
        this.active = e.target.innerHTML;
        this.main = this.buildCorrectPage.call(this);
        this.forceUpdate();
    }

    buildCorrectPage() {
        if(this.active === 'About') {
            return (
                <About
                      fname={this.fname}
                      lname={this.lname}
                      biography={this.biography}
                      skills={this.skills}
                      location={this.location}
                      job={this.job}
                      interests={this.interests}
                  />
            );
        }
        if(this.active === 'Portfolio') {
            return (
                <Projects
                  started="30"
                  completed="0"
                  repos={this.repositories}
                  projects={this.projects}
                  overlayPortfolioCreateModal={this.props.onTogglePortfolioModal} />
            );
        }
        if(this.active === 'Reviews') {
            return (
                <Reviews reviews={this.reviews} />
            );
        }
        return null;
    }

    render() {
        return (
            <div>
                <div id={classNames(styles.header)}>
                    <div id={classNames(styles.headerBg)}></div>
                    <img src="https://source.unsplash.com/random" className={classNames(styles.profilePic)} />
                    <div id={classNames(styles.info)}>
                        <h1>{this.fname} {this.lname}</h1>
                        <div id={classNames(styles.follow)}>Follow</div>
                        <div className={classNames(styles.rating, styles.stars)}>
                            <i className={classNames('fa', 'fa-star')} aria-hidden="true"></i>
                            <i className={classNames('fa', 'fa-star')} aria-hidden="true"></i>
                            <i className={classNames('fa', 'fa-star')} aria-hidden="true"></i>
                            <i className={classNames('fa', 'fa-star')} aria-hidden="true"></i>
                            <i className={classNames('fa', 'fa-star-half-o')} aria-hidden="true"></i>
                        </div>
                        <div id={classNames(styles.followContainer)}>
                            <div id={classNames(styles.left)}>
                                <p><b>{this.follows}</b> <br /> Following</p>
                            </div>
                            <div id={classNames(styles.right)}>
                                <p><b>{this.followers}</b> <br /> Followers</p>
                            </div>
                        </div>
                        <div id={classNames(styles.socials)}>
                            <a href="https://facebook.com/" target="_blank"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                            <a href="https://twitter.com/" target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                            <a href="https://github.com/" target="_blank"><i className="fa fa-github" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
                <div id={classNames(styles.linkNav)}>
                    <h5 onClick={this.handleLinkClick.bind(this)} className={classNames(styles.link, (this.active === 'About') ? styles.active : styles.inactive)} id={classNames(styles.abtLnk)}>About</h5>
                    <h5 onClick={this.handleLinkClick.bind(this)} className={classNames(styles.link, (this.active === 'Portfolio') ? styles.active : styles.inactive)} id={classNames(styles.prtLnk)}>Portfolio</h5>
                    <h5 onClick={this.handleLinkClick.bind(this)} className={classNames(styles.link, (this.active === 'Reviews') ? styles.active : styles.inactive)} id={classNames(styles.rvwLnk)}>Reviews</h5>
                </div>
                {this.main}
            </div>

        );
    }
}

Profile.propTypes = {
    onTogglePortfolioModal: PropTypes.func
};

export default Profile;
