import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/groups/entities/group.entity';
import { Repository } from 'typeorm';

import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class GroupRepository extends BaseAbstractRepository<Group> {
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
  ) {
    super(groupsRepository);
  }
}
