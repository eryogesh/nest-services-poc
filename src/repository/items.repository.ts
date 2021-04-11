import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/items/entities/item.entity';
import { Repository } from 'typeorm';

import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class ItemRepository extends BaseAbstractRepository<Item> {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ) {
    super(itemsRepository);
  }
}
