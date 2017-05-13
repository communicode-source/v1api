
import facebookStrategy from './providers/facebook';
import githubStrategy   from './providers/github';
import googleStrategy   from './providers/google';
import localStrategy    from './providers/local';

export default (passport) => {
  facebookStrategy(passport);
  githubStrategy(passport);
  googleStrategy(passport);
  localStrategy(passport);
  return;
};
