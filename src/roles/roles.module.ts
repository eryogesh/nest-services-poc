import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsModule } from 'src/groups/groups.module';
import { RoleRepository } from 'src/repository/roles.repository';
import { UsersModule } from 'src/users/users.module';

import { Role } from './entities/role.entity';
import { RolesSeedService } from './role.seeder';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), GroupsModule, UsersModule],
  controllers: [RolesController],
  providers: [
    {
      provide: 'RoleRepositoryInterface',
      useClass: RoleRepository,
    },
    RolesService,
    RolesSeedService,
  ],
  exports: [RolesSeedService],
})
export class RolesModule {}
