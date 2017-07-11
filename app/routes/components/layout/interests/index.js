import React, { PropTypes } from 'react';
import interestsCss from './../../../assets/css/pages/interests.scss';
import classNames from 'classnames';
import InterestCard from './InterestCard';
import NameModal from './../../../containers/NameModalContainer';
/*
  If ComponentDidMount fires,
    check if there is a name in the db
      if there is not a name
        Open a modal window that says "please enter your name ...."
      else
        Choose interests
*/
class MainInterests extends React.Component {
    constructor({interests, stateInterests = [], onClickInterest, fname, lname, showModal, error, onNameSubmit, onFnameEnter, onLnameEnter}) {
        super();
        this.interests = interests;
        this.stateInterests = stateInterests;
        this.onClickInterest = onClickInterest;
        this.showModal = showModal;
        this.fname = fname;
        this.lname = lname;
        this.error = error;
        this.onNameSubmit = onNameSubmit;
        this.onFnameEnter = onFnameEnter;
        this.onLnameEnter = onLnameEnter;
    };

    componentWillUpdate(props) {
        this.stateInterests = props.stateInterests;
        this.showModal = props.showModal;
        this.fname = props.fanme;
        this.lname = props.lname;
        this.error = props.error;
        return;
    };

    render() {
        const interestsBoxes = this.interests.map((json, index) => {
            const nextIndex = index + 1;
            const nextJson = (this.interests[nextIndex]) ? this.interests[nextIndex] : {};
            const nextCard = (!this.interests[nextIndex]) ? <div className={classNames(interestsCss.hold)}></div> : <InterestCard key={nextIndex} stateInterests={this.stateInterests} json={nextJson} index={nextIndex} onClickInterest={this.onClickInterest} />;
            if(index % 2 === 0) {
                return (
                    <div key={index} className={classNames('row', interestsCss['interest-row'])}>
                        <InterestCard key={index} stateInterests={this.stateInterests} json={json} index={index} onClickInterest={this.onClickInterest} />
                        {nextCard}
                    </div>);
            }

            return null;
        });
        return (
            <div>
                <NameModal />
                <div className={classNames(interestsCss['interests-main'], 'container-fluid')}>
                {interestsBoxes}
                </div>
            </div>
        );
    };
}


MainInterests.propTypes = {
    stateInterests: PropTypes.array,
    interests: PropTypes.array,
    onClickInterest: PropTypes.func,
    fname: PropTypes.string,
    lname: PropTypes.string,
    error: PropTypes.string,
    onNameSubmit: PropTypes.func,
    onFnameEnter: PropTypes.func,
    onLnameEnter: PropTypes.func
};

export default MainInterests;
