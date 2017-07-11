import React from 'react';
import main from '../../assets/css/main.scss';
import footer from '../../assets/css/static/footer.scss';
import classNames from 'classnames';
import FacebookSocialButton from '../layout/FacebookSocialButton';
import TwitterSocialButton from '../layout/TwitterSocialButton';
import InstagramSocialButton from '../layout/InstagramSocialButton';

const Footer = () =>
    <footer className={main.footer}>
        <div className={classNames('container', footer.wrap)}><div className="row">

            <div className="col-xs-4 col-sm-2">
                <img id="icon" src={require('../../assets/images/logo/CLight.svg')} />
            </div>

            <div className="col-xs-12 col-sm-4 col-md-6 hidden-xs">
                <h6 className="copyright">©2017 Communicode LLC</h6>
            </div>

            <div className="col-xs-2 col-sm-2 col-md-1">
                <ul>
                    <li>
                        <h6>
                            <FacebookSocialButton/>
                        </h6>
                    </li>
                </ul>
            </div>
            <div className="col-xs-2 col-sm-2 col-md-1">
                <ul>
                    <li>
                        <h6>
                            <InstagramSocialButton/>
                        </h6>
                    </li>
                </ul>
            </div>
            <div className="col-xs-2 col-sm-2 col-md-1">
                <ul>
                    <li>
                        <h6>
                            <TwitterSocialButton/>
                        </h6>
                    </li>
                </ul>
            </div>

        </div></div>
    </footer>;


export default Footer;
