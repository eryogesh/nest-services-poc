import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from 'src/constants/common';
import { Role } from 'src/roles/entities/role.entity';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
