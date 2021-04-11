import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/constants/common';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    Logger.log('Roles Guard activated', 'RolesGuard');
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    let granted = false;
    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.id || !user.roles)
      throw new HttpException('Access Denied!!', HttpStatus.UNAUTHORIZED);
    for (const role of user.roles) {
      if (role === requiredRoles[0]) {
        granted = true;
      }
    }
    Logger.log(
      `user accessed ${
        context.switchToHttp().getRequest().url
      } and Grant: ${granted}`,
      'RolesGuard',
    );
    if (!granted)
      throw new HttpException('Access Denied!!!', HttpStatus.UNAUTHORIZED);
    return granted;
  }
}
