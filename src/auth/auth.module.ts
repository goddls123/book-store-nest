import { Module, forwardRef } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import ynv from 'src/config/envConfig';
import { AuthService } from './auth.service';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: ynv.jwt.access.secret,
      signOptions: { expiresIn: ynv.jwt.access.expiresIn },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => UserModule),
  ],
  providers: [JwtStrategy, AuthService, JwtService, JwtRefreshStrategy],
  exports: [JwtStrategy, AuthService, JwtModule, PassportModule],
})
export class AuthModule {}
