import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryInterface } from 'src/users/interface/user.repository.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepositoryInterface')
    private userRepository: UserRepositoryInterface,
    private jwtService: JwtService,
  ) {}

  async validatUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findByCondition({ email: username });
    Logger.log(`${username}`, 'AuthService');
    if (user && user.password === password) {
      return { id: user.id, email: user.email };
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
