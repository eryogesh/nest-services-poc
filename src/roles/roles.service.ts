import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { GroupRepositoryInterface } from 'src/groups/interface/group.repository.interface';

import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';
import { RoleRepositoryInterface } from './interface/role.repository.interface';

@Injectable()
export class RolesService {
  constructor(
    @Inject('RoleRepositoryInterface')
    private roleRepository: RoleRepositoryInterface,
    @Inject('GroupRepositoryInterface')
    private groupRepository: GroupRepositoryInterface,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const group = await this.groupRepository.findOneById(createRoleDto.groupId);
    if (group) {
      const role = new Role();
      role.role = createRoleDto.role;
      role.group = group;
      return await this.roleRepository.create(role);
    }
    throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
  }

  async findAll() {
    return await this.roleRepository.findAll();
  }

  async findOne(id: number) {
    return await this.roleRepository.findOneById(id);
  }

  async remove(id: number) {
    return await this.roleRepository.remove(id);
  }
}
