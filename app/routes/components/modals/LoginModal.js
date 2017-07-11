import React, { PropTypes } from 'react';
import LoginForm from '../layout/form/LoginForm';
import {Modal} from 'react-bootstrap';

class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.close = this.close.bind(this);
    }

    close() {
        this.props.onOverlayLoginModal(false);
        this.forceUpdate();
    }

    render() {
        const {
            onLoginLocal,
            onLoginFacebook,
            onLoginGoogle,
            error
        } = this.props;

        this.showModal = this.props.shouldShowModal || this.props.shouldShowModalAuth ? true : false;

        return (
            <Modal backdrop={false} show={this.showModal} onHide={this.close}>
                <Modal.Header>
                    <Modal.Title>Login to Communicode</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm methods={{onLoginFacebook, onLoginGoogle, onLoginLocal}} error={error} />
                </Modal.Body>
            </Modal>
        );
    }
}

LoginModal.propTypes = {
    onLoginLocal: PropTypes.func,
    onLoginGoogle: PropTypes.func,
    onLoginFacebook: PropTypes.func,
    error: PropTypes.string,
    shouldShowModalAuth: PropTypes.bool,
    shouldShowModal: PropTypes.bool,
    onOverlayLoginModal: PropTypes.func
};

export default LoginModal;
