import jwtController from './../../controller/jwt';

module.exports = (req, res, next) => {
  req.startSessUser =  null;
  req.startSessUser = (req, token) => {
    if(!req.params.token && !req.body.token && !token) {
      return false;
    }
    const tk = req.params.token || req.body.token || token;
    const payload = jwtController.check(tk, req);
    if(payload.err === true) {
      return req.userToken = false;
    }
    return req.userToken = payload.msg;
  };


  next();
}
