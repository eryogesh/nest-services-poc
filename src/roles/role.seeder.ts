import { Inject, Injectable, Logger } from '@nestjs/common';
import { GroupRepositoryInterface } from 'src/groups/interface/group.repository.interface';
import { UserRole } from 'src/shared/models/role.enum';
import { User } from 'src/users/entities/user.entity';
import { UserRepositoryInterface } from 'src/users/interface/user.repository.interface';
import { getConnection } from 'typeorm';

import { Role } from './entities/role.entity';
import { RoleRepositoryInterface } from './interface/role.repository.interface';
import { RolesService } from './roles.service';

@Injectable()
export class RolesSeedService {
  constructor(
    @Inject('RoleRepositoryInterface')
    private roleRepository: RoleRepositoryInterface,
    @Inject('UserRepositoryInterface')
    private userRepository: UserRepositoryInterface,
    @Inject('GroupRepositoryInterface')
    private groupRepository: GroupRepositoryInterface,
    private rolesService: RolesService,
  ) {}

  async seedRegularRoles() {
    this.groupRepository.findAll().then((data) => {
      data.forEach(
        async (group) =>
          await this.rolesService.create({
            role: UserRole.REGULAR,
            groupId: group.id,
          }),
      );
    });
    Logger.log('regular roles entered for all group', 'RolesSeedService');
  }

  async seedManagerRoles() {
    this.groupRepository.findAll().then((data) => {
      data.forEach(
        async (group) =>
          await this.rolesService.create({
            role: UserRole.GROUPMANAGER,
            groupId: group.id,
          }),
      );
    });
    Logger.log('manager roles entered for all group', 'RolesSeedService');
  }

  async assignRegularRolesToUsers() {
    const roles = await this.roleRepository.findAllByCondition({
      role: UserRole.REGULAR,
    });
    console.log(roles);

    const users = await this.userRepository.findAll();
    for (let i = 0; i < roles.length; i++) {
      if (users[i]) {
        users[i].roles.push(roles[i]);
        await this.userRepository.create(users[i]);
      } else {
        break;
      }
    } //end of for
    return `${roles.length} regular roles assined to users`;
  } //end of functions

  async createGlobalManager() {
    await this.createGlobalManagerRole().then(() => {
      this.createGlobalManagerUser().then(() => {
        this.mapGlobalManagerUserAndRole();
      });
    });
  }

  async createGlobalManagerRole() {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([{ role: UserRole.GLOBALMANAGER, group: null }])
      .execute();
  }

  async createGlobalManagerUser() {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([{ email: 'globalmanager@gmail.com', password: 'pass@123' }])
      .execute();
  }

  async mapGlobalManagerUserAndRole() {
    const gmRole = await this.roleRepository.findByCondition({
      role: UserRole.GLOBALMANAGER,
    });

    this.userRepository
      .findByCondition({ email: 'globalmanager@gmail.com' })
      .then(async (user) => {
        user.roles.push(gmRole);
        await this.userRepository.create(user);
      });
  }
}
