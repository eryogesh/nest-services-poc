import { Inject, Injectable } from '@nestjs/common';

import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entities/group.entity';
import { GroupRepositoryInterface } from './interface/group.repository.interface';

@Injectable()
export class GroupsService {
  constructor(
    @Inject('GroupRepositoryInterface')
    private groupRepository: GroupRepositoryInterface,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const group = new Group();
    group.name = createGroupDto.name;
    return await this.groupRepository.create(group);
  }

  async findAll(): Promise<Group[]> {
    return await this.groupRepository.findAll();
  }

  async findOne(id: string): Promise<Group> {
    return await this.groupRepository.findOneById(id);
  }

  async remove(id: string) {
    return await this.groupRepository.remove(id);
  }
}
