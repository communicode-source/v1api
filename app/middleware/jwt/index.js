import jwtController from './../../controller/jwt';

module.exports = (req, res, next) => {
  req.startSessUser = (req, token) => {
    if(!req.params.token && !req.body.token && !token) {
      return false;
    }
    const tk = req.params.token || req.body.token || token;
    const payload = jwtController.decode(tk, req);
    if(payload.err === true) {
      req.userToken = false;
      return req.userToken;
    }
    req.userToken = payload.msg;
    return req.userToken;
  };


  next();
}
