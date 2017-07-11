import React from 'react';
import { OutboundLink } from 'react-ga';

const FacebookSocialButton = () =>
    <OutboundLink eventLabel="Instagram" className="btn btn-social-icon btn-instagram" to="https://instagram.com/communicode.co" target="_blank">
        <span className="fa fa-instagram"/>
    </OutboundLink>;

export default FacebookSocialButton;
