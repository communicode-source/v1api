import React from 'react';
import { Link } from 'react-router';
import SubscribeComponent from '../layout/SubscribeComponent';
import Title from 'react-title-component';

import FacebookSocialButton from '../layout/FacebookSocialButton';
import TwitterSocialButton from '../layout/TwitterSocialButton';
import InstagramSocialButton from '../layout/InstagramSocialButton';

import classNames from 'classnames';
import home from '../../assets/css/pages/home.scss';
import main from '../../assets/css/main.scss';

const primaryBtnClassnames = classNames(main['primary-btn'], main.btn, home.a);
const darkBtnClassnames = classNames(main['dark-btn'], main['no-transition'], main.btn, home.a);
const devInfoPanelClassnames = classNames('col-md-6', home.developers, home['info-panel']);
const nonprofitInfoPanelClassnames = classNames('col-md-6', home.nonprofits, home['info-panel']);
const infoTextButtonClassnames = classNames(main['primary-btn'], main['btn-small'], main.dark, main['no-transition']);

const Home = () =>

    <div>
        <Title render={parentTitle => `${parentTitle}`}/>
        <div className={classNames(home['container-fluid'], home.hero)}>
            <center>
                <div className={home['hero-text']}>
                    <h1>Let's Create Together.</h1>
                    <h3>Help change the world through the power of technology</h3>
                    <Link to="/developers" className={primaryBtnClassnames}>Volunteers</Link>
                    <Link to="/nonprofits" className={darkBtnClassnames}>Nonprofits</Link>
                </div>
            </center>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className={classNames('col-md-12', home.divider)}>

                </div>
            </div>
            <div className="row">
                <div className={devInfoPanelClassnames}>
                    <div className={home['info-text']}>
                        <h2>Volunteers</h2>
                        <hr />
                        <p>
                            Communicode matches designers and programmers to causes they care about to help usher nonprofits into the 21<sup>st</sup>
                          &nbsp; century
                        </p>
                        <center>
                            <Link to="/developers" className={infoTextButtonClassnames}>Learn More</Link>
                        </center>
                    </div>
                </div>
                <div className={nonprofitInfoPanelClassnames}>
                    <div className={home['info-text']}>
                        <h2>Nonprofits</h2>
                        <hr />
                        <p>Communicode helps propel your nonprofit into the digital age by matching you with volunteers who share your same passion</p>
                        <center>
                            <Link to="/nonprofits" className={infoTextButtonClassnames}>Learn More</Link>
                        </center>
                    </div>
                </div>
            </div>
            <div className={classNames('row', home['unified-section'])}>
                <div className="col-md-12 col-sm-12 col-lg-6 hidden-sm hidden-xs">
                    <img width="100%" src={require('../../assets/images/homepage/TripleBrowsersLogo.png')}/>
                </div>
                <div className={classNames('col-lg-6', 'col-md-12', home['unified-section'], 'col-sm-12')}>
                    <h2>We're Creating a Revolution</h2>
                    <p>
                        Let's make an impact together. Communicode matches developers and designers with nonprofits to help carry out any design, branding, or technology needs.
                        Follow us for more information and updates.
                    </p>
                    <div className="row hidden-sm hidden-xs">
                        <div className="col-md-4 col-xs-12">
                            <FacebookSocialButton/>
                        </div>
                        <div className="col-md-4 col-xs-12">
                            <InstagramSocialButton/>
                        </div>
                        <div className="col-md-4 col-xs-12">
                            <TwitterSocialButton/>
                        </div>
                    </div>
                    <div className="row hidden-lg hidden-md">
                        <div className="col-md-4 col-xs-12">
                            <a className="btn btn-block btn-facebook" href="https://facebook.com/communicode.co">
                                <span className="fa fa-facebook"/>&nbsp;&nbsp;Follow us on Facebook
                            </a>
                        </div>
                        <div className="col-md-4 col-xs-12">
                            <a className="btn btn-block btn-instagram" href="https://instagram.com/communicode.co">
                                <span className="fa fa-instagram"/>&nbsp;&nbsp;Follow us on Instagram
                            </a>
                        </div>
                        <div className="col-md-4 col-xs-12">
                            <a className="btn btn-block btn-twitter" href="https://twitter.com/communicodeLLC">
                                <span className="fa fa-twitter"/>&nbsp;&nbsp;Follow us on Twitter
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classNames('row', home.features)}>
                <div id={home['portfolio-panel']} className={classNames('col-md-4', home['info-panel'])}>
                    <h3>Expand Your Portfolio</h3>
                    <hr />
                    <p>
                        Need a few more projects to create a portfolio? Communicode
                        gives you the opportunity to expand your portfolio, entirely free.
                    </p>
                </div>
                <div id={home['work-panel']} className={classNames('col-md-4', home['info-panel'])}>
                    <h3>Work on What You Love</h3>
                    <hr />
                    <p>
                        Communicode allows you to work on causes you are interested in.
                        You give us your interests, we give you matches. Its that simple.
                    </p>
                </div>
                <div id={home['help-panel']} className={classNames('col-md-4', home['info-panel'])}>
                    <h3>Get the Help You Deserve</h3>
                    <hr />
                    <p>
                        Nonprofits need to be up to date with technology.
                        Communicode matches you with people who care about
                        what you have to offer.
                    </p>
                </div>
            </div>
        </div>
        <SubscribeComponent/>
    </div>;

export default Home;
