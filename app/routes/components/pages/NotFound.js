import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import Title from 'react-title-component';

import main from '../../assets/css/main.scss';

const primaryBtnClassnames = classNames(main['primary-btn'], main.btn, main.a);

import styles from '../../assets/css/pages/notfound.scss';

const NotFound = () =>
    <div id={styles['error-page']}>
        <Title render={parentTitle => `Page Not Found | ${parentTitle}`}/>
        <div className="container-fluid" id={styles['error-page-container']}>
            <div className="row">
                <center><span id={styles['error-404']}>404</span></center>
            </div>
            <div className="row">
                <div className="col-xs-12 col-md-6 col-md-push-3">
                    <center><span id={styles['error-message']}>
                        Whoops! This page has either relocated or no longer exists (maybe it's just on vacation).
                    </span></center>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <div className="row">
                <center><Link to="/" className={primaryBtnClassnames}><span className="fa fa-arrow-left"/> Back to Safety</Link></center>
            </div>
        </div>
    </div>;

export default NotFound;
