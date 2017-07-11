import React, { PropTypes } from 'react';
import LoginModal from '../containers/LoginContainer';

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    componentDidMount() {
        // Attempt to Fetch local user if user is authenticated and profile is undefined
        if(!this.props.isAuthenticated) {
            this.props.setRedirectUrl(this.props.currentURL);
        }
    }

    render() {
        let modal;
        if(!this.props.isAuthenticated) {
            modal = (<LoginModal shouldShowModalAuth="true" />);
        }
        return (
            <div>
                {modal}
                {this.props.children}
            </div>
        );
    }
}

Auth.propTypes = {
    children: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    setRedirectUrl: PropTypes.func,
    currentURL: PropTypes.string
};

export default Auth;
