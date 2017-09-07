export const requireLogin = async (req, res, next) => {
  let p ;
  if(!req.userToken) {
    p = await req.startSessUser(req);
  } else {
    p = req.userToken;
  }
  if(p === false) {
    return res.status(401).json({err:true, msg: 'User not logged in'});
  }

  next();
}
