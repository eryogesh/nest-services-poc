import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';
import { IUserRO } from '../user-payload.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(username: string, password: string): Promise<IUserRO> {
    Logger.log('validating user', 'LocalStrategy');
    const user = this.authService.validatUser(username, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
