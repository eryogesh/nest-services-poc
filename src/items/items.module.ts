import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionsModule } from 'src/collections/collections.module';
import { ItemRepository } from 'src/repository/items.repository';

import { Item } from './entities/item.entity';
import { ItemsController } from './items.controller';
import { ItemsSeedService } from './items.seeder';
import { ItemsService } from './items.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), CollectionsModule],
  controllers: [ItemsController],
  providers: [
    {
      provide: 'ItemRepositoryInterface',
      useClass: ItemRepository,
    },
    ItemsService,
    ItemsSeedService,
  ],
  exports: [ItemsSeedService],
})
export class ItemsModule {}
