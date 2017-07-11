import React, { PropTypes } from 'react';
import interestsCss from './../../../assets/css/pages/interests.scss';
import classNames from 'classnames';

const InterestCard = ({stateInterests = [], json, onClickInterest}) => {
    return (
        <div
            className={classNames(
                (stateInterests.indexOf(json.title) !== -1) ? interestsCss.chosen : interestsCss.uncheckedInterest,
                interestsCss[json.bg], interestsCss.interestCard,
                'col-md-6',
                interestsCss['interest-picture']
            )}
            onClick={onClickInterest}
            data-title={json.title}>
            <h3 data-title={json.title}><span className={classNames('title')} data-title={json.title}>{json.title}</span><i data-title={json.title} className={classNames('fa fa-check')} aria-hidden="true"  ></i></h3>
        </div>
    );
};

InterestCard.propTypes = {
    stateInterests: PropTypes.array,
    json: PropTypes.object,
    onClickInterest: PropTypes.func,
};

export default InterestCard;
