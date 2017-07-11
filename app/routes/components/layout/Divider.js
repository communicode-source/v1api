import React from 'react';
import home from '../../assets/css/pages/home.scss';
import classNames from 'classnames';

const Divider = () =>
    <div>
        <div className="row">
            <div className={classNames('col-md-12', home.divider)}>

            </div>
        </div>
    </div>;

export default Divider;
