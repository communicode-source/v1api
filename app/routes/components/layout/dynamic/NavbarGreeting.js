import React, { PropTypes } from 'react';

const NavbarGreeting = ({ isAuthenticated, user }) => {
    let greeting;

    if(isAuthenticated && user.profile !== undefined) {
        if(user.profile.fname === null) {
            greeting = user.profile.email;
        }
        else {
            greeting = user.profile.fname + ' ' + user.profile.lname;
        }
    }

    return (
        <div>
            {greeting} <i className="fa fa-caret-down"></i>
        </div>
    );
};

NavbarGreeting.propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.string,
};

export default NavbarGreeting;
