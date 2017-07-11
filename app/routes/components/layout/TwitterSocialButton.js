import React from 'react';
import { OutboundLink } from 'react-ga';

const TwitterSocialButton = () =>
    <OutboundLink eventLabel="Twitter" className="btn btn-social-icon btn-twitter" to="https://twitter.com/CommunicodeLLC" target="_blank">
        <span className="fa fa-twitter"/>
    </OutboundLink>;

export default TwitterSocialButton;
