import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import Divider from '../layout/Divider';
import SubscribeComponent from '../layout/SubscribeComponent';
import Title from 'react-title-component';

import about from '../../assets/css/pages/about.scss';
import home from '../../assets/css/pages/home.scss';
import main from '../../assets/css/main.scss';

const primaryBtnClassnames = classNames(main['primary-btn'], main.btn, home.a);
const darkBtnClassnames = classNames(main['dark-btn'], main['no-transition'], main.btn, home.a);

const About = () =>

    <div>
        <Title render={parentTitle => `About Us | ${parentTitle}`}/>
        <div className={classNames('container-fluid', about.hero)}>
            <center>
                <div className={about['hero-text']}>
                    <h1>About Us</h1>
                    <h3>Communicode is a community of nonprofits and volunteers.</h3>
                </div>
            </center>
        </div>
        <div className={classNames('container-fluid', about.about2, about.about)}>
            <Divider />
            <div className="container">
                <div className="row">
                    <div className={classNames('col-md-12', about.mission)}>
                        <center>
                            <h1>Got Tech?</h1>
                            <hr />
                            <h3>Our Mission: Help make technology accessible to nonprofits to grow and share ideas.</h3>
                        </center>
                    </div>
                </div>
            </div>
            <div id={about['more-info-good']} className="row">
                <div className={classNames('col-md-6', about['small-info-container'])}>
                    <center>
                        <div className={about['small-info']}>
                            <h3>Just for you.</h3>
                            <p>Communicode uses algorithms to create personalized matches between nonprofits and volunteers. </p>
                        </div>

                        <div className={about['small-info']}>
                            <h3>No Assembly Required</h3>
                            <p>
                                Don't know any tech information about your project? Just give us a clear description and Communicode will figure out your
                                needs.
                            </p>
                        </div>

                        <div className={about['small-info']}>
                            <h3>Free!</h3>
                            <p>Communicode is completely free to use for developers and nonprofits. Our gift to you.</p>
                        </div>
                    </center>
                </div>
                <div className={classNames('col-md-6', about['info-background'])}/>
            </div>
            <div className={classNames('row', about['more-info-container'])}>
                <div className={classNames('col-md-6', about['more-info'])}>
                    <h2>Volunteers</h2>
                    <hr />
                    <p>
                        It's simple: you need a portfolio. Why not develop it by working on something that matters? Communicode uses fun and fancy
                        machine learning software to match you with nonprofits and projects that most interest you. Help develop and design websites,
                        apps, logos, and anything else that will help launch nonprofits into the 21<sup>st</sup> century.
                    </p>
                    <Link href="/developers" className={primaryBtnClassnames}>Developers</Link>
                </div>
                <div className={classNames('col-md-6', about['more-info'])}>
                    <h2>Nonprofits</h2>
                    <hr />
                    <p>
                        It's hard for a nonprofit to stay up to date with technology when they are so focused on changing the world, but in the
                        information age it's almost impossible to make a deep impact on the world without the right technology. Communicode allows you to
                        post tech projects you need completed and matches you up with a developer who can do it.
                    </p>
                    <Link href="/nonprofits" className={darkBtnClassnames}>Nonprofits</Link>
                </div>
            </div>
            <div id={about['for-good']} className="row">
                <h2>Let's code some good.</h2>
                <hr />
                <p>
                    As developers, we love passion-driven people like you. We’re here to help you find your next big project: build your skills, build your
                    portfolio, build your community.
                </p>
            </div>
            <div className="container">
                <div className={classNames('row', about['our-staff'])}>
                    <h2>Our Staff</h2>
                    <hr />
                    <div id={about.staff}>
                        <div className={classNames(about.person, 'col-xs-12', 'col-sm-6', 'col-md-3')}>
                            <img src={require('../../assets/images/team/trevor.png')}/>
                            <h4>Trevor Crupi</h4>
                            <hr />
                            <p><i>Communicode CEO</i></p>
                        </div>
                        <div className={classNames(about.person, 'col-xs-12', 'col-sm-6', 'col-md-3')}>
                            <img src={require('../../assets/images/team/cooper.png')}/>
                            <h4>Cooper Campbell</h4>
                            <hr />
                            <p><i>Communicode CTO</i></p>
                        </div>
                        <div className={classNames(about.person, 'col-xs-12', 'col-sm-6', 'col-md-3')}>
                            <img src={require('../../assets/images/team/sharon.png')}/>
                            <h4>Sharon Hoffman</h4>
                            <hr />
                            <p><i>Communicode COO</i></p>
                        </div>
                        <div className={classNames(about.person, 'col-xs-12', 'col-sm-6', 'col-md-3')}>
                            <img src={require('../../assets/images/team/cam.png')}/>
                            <h4>Cam Todd</h4>
                            <hr />
                            <p><i>VP of Marketing</i></p>
                        </div>
                        <div className={classNames(about.person, 'col-xs-12', 'col-sm-6', 'col-md-3')}>
                            <img src={require('../../assets/images/team/alicia.png')}/>
                            <h4>Alicia Silhavy</h4>
                            <hr />
                            <p><i>Creative Director</i></p>
                        </div>
                        <div className={classNames(about.person, 'col-xs-12', 'col-sm-6', 'col-md-3')}>
                            <img src={require('../../assets/images/team/christian.png')}/>
                            <h4>Christian Espinoza</h4>
                            <hr />
                            <p><i>Mobile Engineer</i></p>
                        </div>
                        <div className={classNames(about.person, 'col-xs-12', 'col-sm-6', 'col-md-3')}>
                            <img src={require('../../assets/images/team/sami.png')}/>
                            <h4>Sami Fassnacht</h4>
                            <hr />
                            <p><i>Mobile Engineer</i></p>
                        </div>
                        <div className={classNames(about.person, 'col-xs-12', 'col-sm-6', 'col-md-3')}>
                            <img src={require('../../assets/images/team/nick.png')}/>
                            <h4>Nick von Bulow</h4>
                            <hr />
                            <p><i>System Administrator</i></p>
                        </div>
                        <div className={classNames(about.person, 'col-xs-12', 'col-sm-6', 'col-md-3')}>
                            <img src={require('../../assets/images/team/charles.png')}/>
                            <h4>Charles Engel</h4>
                            <hr />
                            <p><i>Developer</i></p>
                        </div>
                        <div className={classNames(about.person, 'col-xs-12', 'col-sm-6', 'col-md-3')}>
                            <img src={require('../../assets/images/team/daniel.png')}/>
                            <h4>Daniel Adelfinsky</h4>
                            <hr />
                            <p><i>Developer</i></p>
                        </div>
                        <div className={classNames(about.person, 'col-xs-12', 'col-sm-6', 'col-md-3')}>
                            <img src={require('../../assets/images/team/nich.png')}/>
                            <h4><Link to="/poetry">Nich Dullam</Link></h4>
                            <hr />
                            <p><i>Developer</i></p>
                        </div>
                        <div className={classNames(about.person, 'col-xs-12', 'col-sm-6', 'col-md-3')}>
                            <img src={require('../../assets/images/team/xander.png')}/>
                            <h4>Xander Weintraut</h4>
                            <hr />
                            <p><i>Developer</i></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <SubscribeComponent/>
    </div>;

export default About;
