import React from 'react';

class EnterEmail extends React.Component {
    constructor({email, onEmailEnter, onEmailSubmit}) {
        super();
        this.email = email;
        this.onEmailEnter = onEmailEnter;
        this.onEmailSubmit = onEmailSubmit;
    }

    handleEmailEnter(e) {
        this.onEmailEnter(e.target.value);
    }

    handleEmailSubmit() {
        this.onEmailSubmit();
    }

    render() {
        return (
            <div>
                <h5>Enter in the email of the account of the password you wish to recover!</h5>
                <input onChange={this.handleEmailEnter.bind(this)} value={this.email} placeholder="Enter in your email" />
                <button onClick={this.handleEmailSubmit.bind(this)}>Submit!</button>
            </div>
        );
    }
}


export default EnterEmail;
