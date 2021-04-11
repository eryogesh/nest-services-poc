import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Collection } from 'src/collections/entities/collection.entity';
import { Repository } from 'typeorm';

import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class CollectionRepository extends BaseAbstractRepository<Collection> {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionsRepository: Repository<Collection>,
  ) {
    super(collectionsRepository);
  }
}
