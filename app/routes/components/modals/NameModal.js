import React, { PropTypes } from 'react';
import {Modal} from 'react-bootstrap';
// import modal from '../../assets/css/modals/notify.scss';
// import common from '../../assets/css/pages/common.scss';
import * as classes from '../../assets/classes/NameModal';

class NameModal extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        console.log(this.props.user.showModal);
        this.close = this.close.bind(this);
    }

    // componentDidMount() {
    //     if(this.props.user.profile.fname !== null && this.props.user.profile.lname !== null && this.props.user.profile.interests.length > 0) {
    //         this.props.onOverlayNameModal(false);
    //     }
    // }

    componentWillReceiveProps({user}) {
        this.props = user;
        this.forceUpdate();
    }

    close() {
        this.props.user.showModal = false;
    }

    handleUpdateName(e, data, user) {
        e.preventDefault();
        if(data.fname.value !== '' && data.lname.value !== '') {
            this.props.onUpdateName({fname: data.fname.value, lname: data.lname.value, user});
        }
    }

    render() {
        const data = {
            fname: '',
            lname: ''
        };

        const {
            user,
            error
        } = this.props;
        if(this.props.user.showModal === true) {
            return (
                <Modal backdrop={this.props.user.showModal} show={this.props.user.showModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Hello Random Citizen!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div id={classes.MODAL_ID}>
                            <p className={classes.NAME_PARAGRAPH}>
                                Before you <b>#CodeSomeGood</b>, well need your name:
                            </p>
                            <form onSubmit={(e) => this.handleUpdateName(e, data, user)}>
                                <div className={classes.INPUT_FIELD}>
                                    <div className={classes.INPUT_LABEL}>
                                        <h6 className={classes.INPUT_LABEL_NAME}>First Name</h6>
                                        <h6 className={classes.INPUT_LABEL_ERROR}>{error}</h6>
                                    </div>
                                    <input type="text" placeholder="First Name" required
                                        ref={ node => {data.fname = node;}} />
                                </div>

                                <div className={classes.INPUT_FIELD}>
                                    <div className={classes.INPUT_LABEL}>
                                        <h6 className={classes.INPUT_LABEL_NAME}>Last Name</h6>
                                    </div>
                                    <input type="text" placeholder="Last Name" required
                                        ref={ node => {data.lname = node;}} />
                                </div>
                                <div className="login-submit-button">
                                    <button type="submit" className={classes.SUBMIT_BUTTON}>Keep Rollin</button>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            );
        }
        return <div></div>;
    }
}

NameModal.propTypes = {
    user: PropTypes.object,
    error: PropTypes.string,
    shouldShowModal: PropTypes.bool,
    onUpdateName: PropTypes.func
    // onOverlayNameModal: PropTypes.func
};

// <h6 className={classes.INPUT_LABEL_ERROR}>{error}</h6>

export default NameModal;
