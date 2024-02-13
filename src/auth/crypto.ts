import * as crypto from 'crypto';

const makeHashPassword = (password: string) => {
  const salt = crypto.randomBytes(10).toString('base64');
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 10, 'sha512')
    .toString('base64');
  return { salt, hashPassword };
};
const hashingPassword = (password: string, salt: string): string => {
  return crypto
    .pbkdf2Sync(password, salt, 10000, 10, 'sha512')
    .toString('base64');
};

export { makeHashPassword, hashingPassword };
