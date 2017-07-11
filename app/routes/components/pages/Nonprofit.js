import React from 'react';
import classNames from 'classnames';
import Divider from '../layout/Divider';
import SubscribeComponent from '../layout/SubscribeComponent';
import Title from 'react-title-component';

import nonprofit from '../../assets/css/pages/nonprofit.scss';
import common from '../../assets/css/pages/common.scss';

const Nonprofit = () =>

    <div>
        <Title render={parentTitle => `Nonprofits | ${parentTitle}`}/>
        <div className={classNames('container-fluid', common.hero, nonprofit.hero)}>
            <center>
                <div className={common['hero-text']}>
                    <h1>For Nonprofits</h1>
                    <h3>Connect to talented tech volunteers and expand your influence.</h3>
                </div>
            </center>
        </div>
        <div className={classNames('container-fluid', common.about2)}>
            <Divider />
            <div className="container">
                <div className="row">
                    <div className={classNames('col-md-12', common.mission)}>
                        <center>
                            <h1>Let's Do Big Things.</h1>
                            <hr />
                            <h3>As entrepreneurs, we love your willingness to change the world. In the modern era, that's impossible to do without the right technology.</h3>
                        </center>
                    </div>
                </div>
            </div>
            <div id={common['more-info-good']} className="row">
                <div id={common['info-background-nonprofit-1']} className="col-md-6 col-md-push-6"/>
                <div className={classNames('col-md-6', 'col-md-pull-6', common['small-info-container'])}>
                    <center>
                        <div className={common['small-info']}>
                            <h3>How can we help?</h3>
                            <hr />
                            <p>
                                As entrepreneurs, we know that in modern times it can be incredibly hard to juggle all the things it takes to run
                                a nonprofit. But as programmers, we know that it is almost impossible to make a difference without a digital presence.
                                Communicode connects your nonprofit with programmers and designers  who are interested in helping you and looking to
                                expand their portfolio by volunteering their tech and creative skills.
                            </p>
                        </div>
                    </center>
                </div>
            </div>
            <div id={common['more-info-good']} className="row">
                <div id={common['info-background-nonprofit-2']} className={classNames('col-md-6')}/>
                <div className={classNames('col-md-6', common['small-info-container'])}>
                    <center>
                        <div className={common['small-info']}>
                            <h3>Why should I join?</h3>
                            <hr />
                            <p>
                                As we said before, it is almost impossible to grow and make an impact nowadays without having a solid
                              online presence. Joining Communicode gives you easy access to programmers and designers who want to help you make that difference by volunteering
                               their time in the most impactful way they can. You, the nonprofit, post projects (websites, mobile apps, advice, anything really) and we use machine learning
                               algorithms to match you with the perfect volunteer. Easy peesy.
                            </p>
                        </div>
                    </center>
                </div>
            </div>
        </div>
        <SubscribeComponent/>
    </div>;

export default Nonprofit;
