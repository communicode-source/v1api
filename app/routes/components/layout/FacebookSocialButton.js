import React from 'react';
import { OutboundLink } from 'react-ga';

const FacebookSocialButton = () =>
    <OutboundLink eventLabel="Facebook" className="btn btn-social-icon btn-facebook" to="https://facebook.com/communicode.co" target="_blank">
        <span className="fa fa-facebook"/>
    </OutboundLink>;

export default FacebookSocialButton;
