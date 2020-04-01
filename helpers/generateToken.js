import jwt from 'jsonwebtoken';

const generateToken = user => jwt.sign(
  user,
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRY },
);

export default generateToken;