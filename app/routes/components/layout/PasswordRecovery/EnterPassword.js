import React from 'react';

class EnterPassword extends React.Component {
    constructor({password, onPasswordEnter, onPasswordSubmit}) {
        super();
        this.password = password;
        this.onPasswordEnter = onPasswordEnter;
        this.onPasswordSubmit = onPasswordSubmit;
    }

    handlePasswordEnter(e) {
        this.onPasswordEnter(e.target.value);
    }

    handlePasswordSubmit() {
        this.onPasswordSubmit();
    }

    render() {
        return (
            <div>
                <h5>All set! Just type in your new password below (and write it down somewhere super safe) </h5>
                <input type="password" onChange={this.handlePasswordEnter.bind(this)} value={this.password} placeholder="Enter your new password" />
                <button onClick={this.handlePasswordSubmit.bind(this)}>Submit!</button>
            </div>
        );
    }
}


export default EnterPassword;
