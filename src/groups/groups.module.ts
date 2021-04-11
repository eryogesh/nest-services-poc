import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupRepository } from 'src/repository/groups.repository';

import { Group } from './entities/group.entity';
import { GroupsController } from './groups.controller';
import { GroupsSeedService } from './groups.seeder';
import { GroupsService } from './groups.service';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  controllers: [GroupsController],
  providers: [
    {
      provide: 'GroupRepositoryInterface',
      useClass: GroupRepository,
    },
    GroupsService,
    GroupsSeedService,
  ],
  exports: [
    {
      provide: 'GroupRepositoryInterface',
      useClass: GroupRepository,
    },
    GroupsSeedService,
  ],
})
export class GroupsModule {}
