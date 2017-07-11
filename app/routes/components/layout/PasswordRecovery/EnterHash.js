import React from 'react';

class EnterHash extends React.Component {
    constructor({hash, onHashEnter, onHashSubmit}) {
        super();
        this.hash = hash;
        this.onHashEnter = onHashEnter;
        this.onHashSubmit = onHashSubmit;
    }

    handleHashEnter(e) {
        this.onHashEnter(e.target.value);
    }

    handleHashSubmit() {
        this.onHashSubmit();
    }

    render() {
        return (
            <div>
                <h5>Check your email!</h5>
                <h5>You should have received a code, copy and paste that here!</h5>
                <input onChange={this.handleHashEnter.bind(this)} value={this.hash} placeholder="Enter in the validation code sent to your email" />
                <button onClick={this.handleHashSubmit.bind(this)}>Submit!</button>
            </div>
        );
    }
}


export default EnterHash;
