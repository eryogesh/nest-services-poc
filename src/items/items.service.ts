import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CollectionRepositoryInterface } from 'src/collections/interface/collection.repository.interface';

import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './entities/item.entity';
import { ItemRepositoryInterface } from './interface/items.repository.interface';

@Injectable()
export class ItemsService {
  constructor(
    @Inject('ItemRepositoryInterface')
    private itemRepository: ItemRepositoryInterface,
    @Inject('CollectionRepositoryInterface')
    private collectionRepository: CollectionRepositoryInterface,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const collection = await this.collectionRepository.findOneById(
      createItemDto.collectionId,
    );
    if (collection) {
      const item = new Item();
      item.name = createItemDto.name;
      item.collection = collection;
      return await this.itemRepository.create(item);
    }
    throw new HttpException('Collection not found', HttpStatus.NOT_FOUND);
  }

  async findAll() {
    return await this.itemRepository.findAll();
  }

  async findOne(id: number) {
    return await this.collectionRepository.findOneById(id);
  }

  async remove(id: number) {
    return await this.itemRepository.remove(id);
  }
}
