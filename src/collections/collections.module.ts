import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsModule } from 'src/groups/groups.module';
import { CollectionRepository } from 'src/repository/collections.repository';
import { UsersModule } from 'src/users/users.module';

import { CollectionsController } from './collections.controller';
import { CollectionsSeedService } from './collections.seeder';
import { CollectionsService } from './collections.service';
import { Collection } from './entities/collection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Collection]), UsersModule, GroupsModule],
  controllers: [CollectionsController],
  providers: [
    {
      provide: 'CollectionRepositoryInterface',
      useClass: CollectionRepository,
    },
    CollectionsService,
    CollectionsSeedService,
  ],
  exports: [
    {
      provide: 'CollectionRepositoryInterface',
      useClass: CollectionRepository,
    },
    CollectionsSeedService,
  ],
})
export class CollectionsModule {}
