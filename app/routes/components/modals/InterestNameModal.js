import React, { PropTypes } from 'react';
import {Modal} from 'react-bootstrap';
// import modal from '../../assets/css/modals/notify.scss';
// import common from '../../assets/css/pages/common.scss';
import * as classes from '../../assets/classes/NameModal';

class NameModal extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    handleFnameEnter(e) {
        this.props.onFnameEnter(e.target.value);
    }

    handleLnameEnter(e) {
        this.props.onLnameEnter(e.target.value);
    }

    handleOrgnameEnter(e) {
        this.props.onOrgnameEnter(e.target.value);
    }

    handleOnClick() {
        this.props.onNameSubmit();
    }

    close() {
        this.setState({show: false});
    }

    renderNonprofitModal() {
        return (
            <div className={classes.INPUT_FIELD}>
                <div className={classes.INPUT_LABEL}>
                    <h6 className={classes.INPUT_LABEL_NAME}>Organization Name</h6>
                    <h6 className={classes.INPUT_LABEL_ERROR}>sample error</h6>
                </div>
                <input onChange={this.handleOrgnameEnter.bind(this)} value={this.props.orgname} type="text" placeholder="Organization Name" required />
            </div>
        );
    }

    renderDeveloperModal() {
        return (
            <div>
                <div className={classes.INPUT_FIELD}>
                    <div className={classes.INPUT_LABEL}>
                        <h6 className={classes.INPUT_LABEL_NAME}>First Name</h6>
                        <h6 className={classes.INPUT_LABEL_ERROR}>sample error</h6>
                    </div>
                    <input onChange={this.handleFnameEnter.bind(this)} value={this.props.fname} type="text" placeholder="First Name" required />
                </div>

                <div className={classes.INPUT_FIELD}>
                    <div className={classes.INPUT_LABEL}>
                        <h6 className={classes.INPUT_LABEL_NAME}>Last Name</h6>
                    </div>
                    <input onChange={this.handleLnameEnter.bind(this)} value={this.props.lname} type="text" placeholder="Last Name" required />
                </div>
            </div>
        );
    }

    render() {
        return (
            <Modal show={this.props.showModal}>
                <Modal.Header>
                    <Modal.Title>Hello Random Citizen!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div id={classes.MODAL_ID}>
                        <p className={classes.NAME_PARAGRAPH}>
                            Before you <b>#CodeSomeGood</b>, well need your name:
                        </p>
                        {(this.props.accountType === false) ? this.renderDeveloperModal() : this.renderNonprofitModal()}
                        <div className="login-submit-button">
                            <button onClick={this.handleOnClick.bind(this)} className={classes.SUBMIT_BUTTON}>Keep Rollin</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
          );
    }
}

// {showModal, fname, lname, onNameSubmit, onFnameEnter, onLnameEnter}
NameModal.propTypes = {
    showModal: PropTypes.bool,
    fname: PropTypes.string,
    lname: PropTypes.string,
    orgname: PropTypes.string,
    error: PropTypes.string,
    accountType: PropTypes.bool,
    onNameSubmit: PropTypes.func,
    onFnameEnter: PropTypes.func,
    onLnameEnter: PropTypes.func,
    onOrgnameEnter: PropTypes.func
};
export default NameModal;
