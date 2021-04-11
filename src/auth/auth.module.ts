import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthenticationMiddleware } from './middlewares/authentication.middleware';
import { AuthorizationMiddleware } from './middlewares/authorization.middleware';
import { JwtStrategy } from './strrategies/jwt.strategy';
import { LocalStrategy } from './strrategies/local.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRETKEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRESIN || '360s' },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AuthenticationMiddleware,
    AuthorizationMiddleware,
  ],
  exports: [AuthService, AuthenticationMiddleware, AuthorizationMiddleware],
})
export class AuthModule {}
