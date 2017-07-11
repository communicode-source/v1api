import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const handleLogout = (logout) => {
    localStorage.removeItem('id_token');
    logout();
};

const Logout = ( props ) => {
    const {
        onLogoutClick
    } = props;

    return (
        <li onClick={() => { handleLogout(onLogoutClick); }}>
            <Link to="#">Logout</Link>
        </li>
    );
};

Logout.propTypes = {
    onLogoutClick: PropTypes.func
};

export default Logout;
