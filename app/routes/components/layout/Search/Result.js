import React, { Component, PropTypes } from 'react';

class Result extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="">
                <a href={this.props.url} className="list-group-item-action"><h5>{this.props.fname} {this.props.lname}</h5><p>Email: {this.props.email}</p></a>
            </div>
        );
    }
}


Result.propTypes = {
    fname: PropTypes.string,
    lname: PropTypes.string,
    url: PropTypes.string,
    accounttype: PropTypes.string,
    email: PropTypes.string
};


export default Result;
