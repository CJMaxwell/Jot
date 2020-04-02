  
import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if(!bearerHeader){
      res.status(403).json({
          message: 'Access denied, unable to login user'
      });
      return;
  }
  const bearer = bearerHeader.split(' ');
  if(bearer.length < 2){
      res.status(400).json({
          message: 'Kindly check the format of your Authorization'
      });
      return;
  };

  const bearerToken = bearer[1];
  req.user = undefined;
  if (bearerToken) {
    jwt.verify(bearerToken, process.env.JWT_SECRET, (error, payload) => {
      if (error) {
        res.status(400).json({
          message: 'Invalid authentication token',
        });
      } else {
        req.user = payload;
        next();
      }
    });
  }
};

export default verifyToken;