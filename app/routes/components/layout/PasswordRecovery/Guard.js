import React from 'react';
import propTypes from 'prop-types';

class Guard extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.toShow = (props.logic === props.test) ? props.children : null;
    }

    componentWillReceiveProps(props) {
        this.toShow = (props.logic === props.test) ? props.children : null;
    }

    render() {
        return (
            <div>{this.toShow}</div>
        );
    }
}

Guard.propTypes = {
    children: propTypes.object,
    logic: propTypes.string,
    test: propTypes.string
};

export default Guard;
