import * as crypto from 'crypto';
import ynv from 'src/config/envConfig';

const makeHashPassword = (password: string) => {
  const salt = crypto.randomBytes(10).toString(ynv.jwt.encoding);
  const hashPassword = crypto
    .pbkdf2Sync(
      password,
      salt,
      ynv.jwt.iterations,
      ynv.jwt.keylen,
      ynv.jwt.algorithm,
    )
    .toString(ynv.jwt.encoding);
  return { salt, hashPassword };
};
const hashingPassword = (password: string, salt: string): string => {
  return crypto
    .pbkdf2Sync(
      password,
      salt,
      ynv.jwt.iterations,
      ynv.jwt.keylen,
      ynv.jwt.algorithm,
    )
    .toString(ynv.jwt.encoding);
};

export { makeHashPassword, hashingPassword };
