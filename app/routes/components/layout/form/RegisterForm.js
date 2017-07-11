import React, { PropTypes } from 'react';
import * as classes from '../../../assets/classes/LoginModal';
import * as rules from '../../../rules';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import RegisterSlider from '../draggable/RegisterSlider';

const handleUpdateProvider = (provider, response, onUpdateProvider) => {
    onUpdateProvider(provider, response);
};

// Note for the future: This currently does not display errors.
const RegisterForm = ( props ) => {
    const {
      onValidateEmail,
      onValidatePassword,
      onRegisterLocal,
      onRegisterFacebook,
      onRegisterGoogle,
      onUpdateProvider,
      user
    } = props;

    let email;
    let password;

    return (

        <div id={classes.MODAL_ID}>
            <div className={classes.ROW}>
                <div className={classes.SOCIAL_CONTAINER}>
                    <GoogleLogin
                      clientId="42299952850-v2ofgh81ngrahtp8djhh1rf6j65cqgj3.apps.googleusercontent.com"
                      buttonText="Login"
                      onSuccess={response => { handleUpdateProvider('google', response, onUpdateProvider); }}
                      onFailure={response => { return response; }}
                      className="btn btn-block btn-google"
                    >
                        <span className="fa fa-google"/>&nbsp;&nbsp;Register with Google
                    </GoogleLogin>
                </div>
            </div>

            <div className={classes.ROW}>
                <div className={classes.SOCIAL_CONTAINER_2}>
                    <FacebookLogin
                      appId="164246817399322"
                      fields="name,email,picture"
                      callback={response => { handleUpdateProvider('facebook', response, onUpdateProvider);  }}
                      cssClass="btn btn-block btn-facebook"
                      icon="fa fa-facebook"
                      textButton="&nbsp;&nbsp;Register with Facebook"
                      />
                </div>
            </div>

            {user.provider === 'local' &&
                <form>
                    <div className={classes.INPUT_FIELD}>
                        <div className={classes.INPUT_LABEL}>
                            <h6 className={classes.INPUT_LABEL_NAME}>Email</h6>
                        </div>
                        <input type="email" placeholder="Email"
                          value={user.email || ''} ref={node => {email = node;}} onChange={() => onValidateEmail(email.value) } />
                    </div>

                    <div className={classes.INPUT_FIELD}>
                        <div className={classes.INPUT_LABEL}>
                            <h6 className={classes.INPUT_LABEL_NAME}>Password</h6>
                        </div>
                        <input type="password" placeholder="Password"
                          value={user.password || ''} ref={node => {password = node;}} onChange={() => onValidatePassword(password.value) }
                          maxLength={`${rules.MAX_PASSWORD_LENGTH}`} />
                    </div>
                </form>
            }

            {user.provider !== 'local' &&
                <div>
                    <h3>Hello, {user.name}</h3>
                    <img src={user.imageUrl} />
                </div>
            }

            <div id={classes.SLIDER_MAIN}>
                <div id={classes.LABEL_CONT}>
                    <h6><i className={classes.ARROW_LEFT} aria-hidden="true"></i>Developer</h6>
                    <h6 className={classes.NONPROFIT_SLIDE}>Non-profit<i className={classes.ARROW_RIGHT} aria-hidden="true"></i></h6>
                </div>
                <RegisterSlider user={user} methods={{onRegisterLocal, onRegisterFacebook, onRegisterGoogle}} />
            </div>
        </div>
    );
};

/*
<div id={classes.HANDLER}>
    <RegisterSlider user={user} methods={{onRegisterLocal, onRegisterFacebook, onRegisterGoogle}} />
    <div id={classes.LEFT_SIDE}></div>
</div>
*/
// data.accessToken = response.accessToken; data.user = {name: response.name, email: response.email, userid: response.userID}; data.provider = 'facebook';
// <h6 className={classes.INPUT_LABEL_ERROR}>{error.message}</h6>

RegisterForm.propTypes = {
    onValidateEmail: PropTypes.func,
    onValidatePassword: PropTypes.func,
    onRegisterLocal: PropTypes.func,
    onRegisterFacebook: PropTypes.func,
    onRegisterGoogle: PropTypes.func,
    onUpdateProvider: PropTypes.func,
    user: PropTypes.object,
    error: PropTypes.string
};

export default RegisterForm;
