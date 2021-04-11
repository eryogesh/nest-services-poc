import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserRepositoryInterface } from 'src/users/interface/user.repository.interface';

import {
  GlobalManagerResources,
  IPermissionResult,
  RouteCheckfactory,
} from '../route-check.factory';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor(
    @Inject('UserRepositoryInterface')
    private userRepository: UserRepositoryInterface,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    Logger.log(`login URL is ${req.url}`, 'AUTHORIZTIONMIDDLEWARE');

    const userRO = req.user;
    if (!userRO || !userRO['id']) {
      throw new HttpException('Access Denied!!', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.userRepository.findOneById(userRO['id']);
    const resourcePath = req.url.split('/')[1];
    const resourceId = req.url.split('/')[2];
    let grant = false;

    if (resourcePath && GlobalManagerResources.includes(resourcePath)) {
      grant = true;
    }

    if (RouteCheckfactory.isUserGlobalManager(user)) {
      grant = true;
    } else if (
      /**
       * checking for routes with resourceID
       * if it is a globalmanger's resource skipped-(RoleGuard will handle that)
       */
      resourcePath &&
      !GlobalManagerResources.includes(resourcePath) &&
      resourceId
    ) {
      const checkStrategy = RouteCheckfactory.getStrategy(resourcePath, true);
      const res: IPermissionResult = checkStrategy(user, resourceId);
      if (!res)
        throw new HttpException('Access Denied!!', HttpStatus.UNAUTHORIZED);
      const grantedMethods = RouteCheckfactory.getGrantedMethods(res.role);
      if (!grantedMethods.includes(req.method.toLowerCase()))
        throw new HttpException(
          'Unautorized access!!',
          HttpStatus.UNAUTHORIZED,
        );
      grant = true;
    }

    Logger.log(
      `user ${
        user.email
      } trying to access ${resourcePath} with grant: ${grant} and is GlobalManagerResource: ${GlobalManagerResources.includes(
        resourcePath,
      )} `,
      'AuthorizationMiddleware',
    );

    if (!grant) {
      throw new HttpException('Access Denied!!', HttpStatus.UNAUTHORIZED);
    }

    next();
  }
}
