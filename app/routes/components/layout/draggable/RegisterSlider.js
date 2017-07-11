import React, { PropTypes } from 'react';
// import { connect } from 'react-redux';
import Slider from 'rc-slider';

const handleRegister = (sliderValue, user, methods) => {
    let accountType;
    if(sliderValue < 40) {
        accountType = 0;
    }
    else if(sliderValue > 60) {
        accountType = 1;
    }
    else {
        return;
    }

    if(user.provider === 'local') {
        const email = user.email;
        const password = user.password;
        const provider = user.provider;

        if(!email || !password) return;

        methods.onRegisterLocal({ email, password, provider, accountType });
    }
    else if(user.provider === 'google') {
        const accessToken = user.accessToken;
        const tokenId = user.tokenId;
        const provider = user.provider;
        methods.onRegisterGoogle({access_token: accessToken, token_id: tokenId, provider: provider, accountType});
    }
     else if(user.provider === 'facebook') {
         const accessToken = user.accessToken;
         const provider = user.provider;
         const name = user.name;
         const email = user.email;
         const userid = user.userid;
         methods.onRegisterFacebook({token_id: accessToken, name, email, userid, provider, accountType});
     }
};

const RegisterSlider = ({ user, methods }) => {
    return (
        <Slider
          defaultValue={50}
          trackStyle={{ backgroundColor: '#333', height: 40, borderRadius: 50 }}
          handleStyle={{
              borderColor: '#333',
              height: 50,
              width: 50,
              marginLeft: -25,
              marginTop: -5,
              backgroundColor: '#fff',
              marks: {number: 'hi'}
          }}
          railStyle={{ backgroundColor: '#ffb42e', height: 40, borderRadius: 50 }}
          onAfterChange={(val) => { handleRegister(val, {...user}, {...methods}); }}
        />
    );
};

RegisterSlider.propTypes = {
    user: PropTypes.object,
    methods: PropTypes.object
};

// <button onClick={() => handleRegister({...registerData}, {...methods})}>Register</button>
/*  <div id={classes.HANDLE}>
      <i className={classes.HANDLE_ARROWS} aria-hidden="true"></i>
  </div>
*/

export default RegisterSlider;
