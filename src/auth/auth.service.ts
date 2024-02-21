import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import ynv from 'src/config/envConfig';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  createToken(payload) {
    const [accessToken, refreshToken] = [
      this.jwtService.sign(payload, {
        secret: ynv.jwt.access.secret,
        expiresIn: ynv.jwt.access.expiresIn,
      }),
      this.jwtService.sign(payload, {
        secret: ynv.jwt.refresh.secret,
        expiresIn: ynv.jwt.refresh.expiresIn,
      }),
    ];
    return { accessToken, refreshToken };
  }

  public makeHashPassword = (password: string) => {
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

  public hashingPassword = (password: string, salt: string): string => {
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
}
