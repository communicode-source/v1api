import React, { PropTypes } from 'react';
import * as classes from '../../../assets/classes/LoginModal';
import * as rules from '../../../rules';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const handleLogin = (data, methods) => {
    if(data.provider === 'local') {
        const email = data.email.value;
        const password = data.password.value;
        const provider = data.provider;

        if(!email || !password) return;

        methods.onLoginLocal({ email, password, provider });
    }
    else if(data.provider === 'google') {
        const accessToken = data.accessToken;
        const tokenId = data.tokenId;
        const provider = data.provider;
        methods.onLoginGoogle({access_token: accessToken, token_id: tokenId, provider: provider, accountType: 0});
    }
     else if(data.provider === 'facebook') {
         const accessToken = data.accessToken;
         const provider = data.provider;
         const name = data.user.name;
         const email = data.user.email;
         const userid = data.user.userid;
         methods.onLoginFacebook({token_id: accessToken, name, email, userid, provider, accountType: 0});
     }
};

const LoginForm = ( props ) => {
    const data = {
        email: '',
        password: '',
        provider: 'local'
    };

    const {
      methods,
      error
    } = props;

    return (

        <div id={classes.MODAL_ID}>
            <div className={classes.ROW}>
                <div className={classes.SOCIAL_CONTAINER}>
                    <GoogleLogin
                      clientId="42299952850-v2ofgh81ngrahtp8djhh1rf6j65cqgj3.apps.googleusercontent.com"
                      buttonText="Login"
                      onSuccess={response => { data.accessToken = response.accessToken; data.provider = 'google'; data.tokenId = response.tokenId; }}
                      onFailure={response => { return response; }}
                      className="btn btn-block btn-google"
                    >
                        <span className="fa fa-google"/>&nbsp;&nbsp;Login with Google
                    </GoogleLogin>
                </div>
            </div>
            <div className={classes.ROW}>
                <div className={classes.SOCIAL_CONTAINER_2}>
                    <FacebookLogin
                      appId="164246817399322"
                      fields="name,email,picture"
                      callback={response => { data.accessToken = response.accessToken; data.user = {name: response.name, email: response.email, userid: response.userID}; data.provider = 'facebook'; }}
                      cssClass="btn btn-block btn-facebook"
                      icon="fa fa-facebook"
                      textButton="&nbsp;&nbsp;Login with Facebook"
                      />
                </div>
            </div>
            <form>
                <div className={classes.INPUT_FIELD}>
                    <div className={classes.INPUT_LABEL}>
                        <h6 className={classes.INPUT_LABEL_NAME}>Email</h6>
                        <h6 className={classes.INPUT_LABEL_ERROR}>{error}</h6>
                    </div>
                    <input type="email" placeholder="Email" required
                      ref={ node => {data.email = node;}}
                      maxLength={`${rules.MAX_EMAIL_LENGTH}`}/>
                </div>
                <div className={classes.INPUT_FIELD}>
                    <div className={classes.INPUT_LABEL}>
                        <h6 className={classes.INPUT_LABEL_NAME}>Password</h6>
                    </div>
                    <input type="password" placeholder="Password" required
                      ref={ node => {data.password = node;}}
                      maxLength={`${rules.MAX_PASSWORD_LENGTH}`} />
                </div>
            </form>

            <div className="login-submit-button row">
                <button onClick={() => handleLogin(data, methods)} type="submit" className={classes.SUBMIT_BUTTON}>Let's change the World!</button>
            </div>
        </div>
    );
};

LoginForm.propTypes = {
    methods: PropTypes.object,
    error: PropTypes.string
};

export default LoginForm;
