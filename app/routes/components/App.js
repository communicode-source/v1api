import React, { PropTypes } from 'react';
import Header from '../components/static/Header';
import Footer from '../components/static/Footer';
import Title from 'react-title-component';

import main from '../assets/css/main.scss';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    componentDidMount() {
        // Attempt to Fetch local user if user is authenticated and profile is undefined
        if(this.props.isAuthenticated && this.props.user.profile === undefined) {
            this.props.onGetLoggedInUser(this.props.isAuthenticated);
        }
    }

    render() {
        const {
            children,
            isAuthenticated,
            user,
            shouldShowLoginModal,
            showLoginModal,
            shouldShowRegisterModal,
            toggleRegisterModal
        } = this.props;

        return (
            <div id={main['app-container']}>
                <Title render="Communicode"/>
                <Header user={user} isAuthenticated={isAuthenticated} shouldShowLoginModal={shouldShowLoginModal} showLoginModal={showLoginModal} toggleRegisterModal={toggleRegisterModal} shouldShowRegisterModal={shouldShowRegisterModal}/>
                <div id={main['content-main']}>
                    {children}
                    <div className={main.push}/>
                </div>
                <Footer />
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    onGetLoggedInUser: PropTypes.func,
    user: PropTypes.object,
    showLoginModal: PropTypes.func,
    shouldShowLoginModal: PropTypes.bool,
    shouldShowRegisterModal: PropTypes.bool,
    toggleRegisterModal: PropTypes.func,
};

export default App;
