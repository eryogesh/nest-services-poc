import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { Repository } from 'typeorm';

import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class RoleRepository extends BaseAbstractRepository<Role> {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {
    super(rolesRepository);
  }
}
