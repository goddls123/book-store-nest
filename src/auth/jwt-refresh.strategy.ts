import { AuthenticationError } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import ynv from 'src/config/envConfig';
import { User } from 'src/modules/user/entity/user.entity';
import { jwtTokenResponse } from 'src/modules/user/response/jwtToken.response';
import { UserService } from 'src/modules/user/user.service';
import { AuthService } from './auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ynv.jwt.refresh.secret,
      passReqToCallback: true,
    });
  }

  async validate(req) {
    const token = req.headers.authorization.split(' ')[1];

    const user = await this.validateUser(token);

    const { accessToken, refreshToken } = this.authService.createToken({
      email: user.email,
    });

    await this.userService.updateRefreshToken(user.email, refreshToken);

    return { email: user.email, accessToken, refreshToken };
  }

  async validateUser(payload: jwtTokenResponse): Promise<User> {
    const user = this.userService.findUserByRefreshToken(payload.refreshToken);

    if (!user) {
      throw new AuthenticationError('유효하지 않은 토큰');
    }

    return user;
  }
}
