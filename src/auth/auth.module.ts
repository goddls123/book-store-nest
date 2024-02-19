import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import ynv from 'src/config/envConfig';

@Module({
  imports: [
    JwtModule.register({
      secret: ynv.jwt.access.secret,
      signOptions: { expiresIn: ynv.jwt.access.expiresIn },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [JwtStrategy],
  exports: [JwtStrategy, JwtModule, PassportModule],
})
export class AuthModule {}
