import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserRepositoryInterface } from 'src/users/interface/user.repository.interface';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    @Inject('UserRepositoryInterface')
    private userRepository: UserRepositoryInterface,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    Logger.log(
      `Authentication Middleware and Url is ${req.originalUrl} ${req.baseUrl} ${req.url}`,
      'AuthenticationMiddleware',
    );

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.split(' ')[1])
      throw new HttpException('Access Denied!!', HttpStatus.UNAUTHORIZED);

    const token = authHeader.split(' ')[1];
    const decodeValue: any = jwt.verify(token, process.env.JWT_SECRETKEY);
    if (!decodeValue.sub)
      throw new HttpException('Invalid payload', HttpStatus.UNAUTHORIZED);

    const user = await this.userRepository.findOneById(decodeValue.sub);
    if (!user)
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);

    const roles: string[] = [];
    user.roles.forEach((role) => {
      roles.push(role.role);
    });

    req.user = {
      id: user.id,
      email: user.email,
      roles: roles,
    };

    next();
  }
}
