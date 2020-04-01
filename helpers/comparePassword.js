import bcrypt from 'bcryptjs';

const comparePassword = (password, hashedPassword) => bcrypt
  .compareSync(password, hashedPassword);

export default comparePassword;