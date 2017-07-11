import React from 'react';
import ReactGA from 'react-ga';
import classNames from 'classnames';
import common from '../../assets/css/pages/common.scss';
import main from '../../assets/css/main.scss';


const Subscribe = () =>
    <div className="row">
        <div className={classNames('col-md-12', common['create-account'])}>
            <center>
                <div>
                    <form onSubmit={() => ReactGA.event({category: 'User', action: 'Subscribed to the mailing list'})} action="//communicode.us15.list-manage.com/subscribe/post?u=bbb63083dbb4eed5b711d098c&amp;id=9119f49dfd" method="post" target="_blank">
                        <div className={main.text}>
                            <h2>Convinced?</h2>
                            <h4>Don't worry, we'll be here soon. And we can't do it without you.</h4>
                            <div className={classNames('input-group', common['input-container'])}>
                                <span className={classNames('input-group-addon', common['email-addon'])} id="basic-addon1">
                                    <i className="fa fa-envelope-o" aria-hidden="true"/>
                                </span>
                                <div>
                                    <input type="email" className={classNames('form-control', common.input, 'email')} name="EMAIL" placeholder="Email Address" required />
                                </div>
                                <div style={{position: 'absolute', 'left': '-5000px'}} aria-hidden="true"><input type="text" name="b_bbb63083dbb4eed5b711d098c_9119f49dfd" tabIndex="-1" value="" /></div>
                                <span className={classNames('input-group-btn', common['mail-submit'])}>
                                    <button className={classNames('btn', main['primary-btn'], common.hiddenMobile)} type="submit">
                                        Help Us Change the World <i className="fa fa-arrow-right" aria-hidden="true"/>
                                    </button>
                                    <button id="mc-embedded-subscribe" className={classNames('btn', main['primary-btn'], common.hiddenDesktop)} type="submit">
                                        <i className="fa fa-arrow-right" aria-hidden="true"/>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </center>
        </div>
    </div>;


/*
<div id="mc_embed_signup">
    <form action="//communicode.us15.list-manage.com/subscribe/post?u=bbb63083dbb4eed5b711d098c&amp;id=9119f49dfd" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" novalidate>
        <div id="mc_embed_signup_scroll">
            <label for="mce-EMAIL">Subscribe to our mailing list</label>
            <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required />
            <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_bbb63083dbb4eed5b711d098c_9119f49dfd" tabindex="-1" value="" /></div>
            <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button" /></div>
         </div>
    </form>
</div>
*/

export default Subscribe;
