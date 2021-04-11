import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { GroupRepositoryInterface } from 'src/groups/interface/group.repository.interface';

import { CreateCollectionDto } from './dto/create-collection.dto';
import { Collection } from './entities/collection.entity';
import { CollectionRepositoryInterface } from './interface/collection.repository.interface';

@Injectable()
export class CollectionsService {
  constructor(
    @Inject('CollectionRepositoryInterface')
    private collectionRepository: CollectionRepositoryInterface,
    @Inject('GroupRepositoryInterface')
    private groupRepository: GroupRepositoryInterface,
  ) {}

  async create(createCollectionDto: CreateCollectionDto) {
    const group = await this.groupRepository.findOneById(
      createCollectionDto.groupId,
    );
    if (group) {
      const collection = new Collection();
      collection.group = group;
      collection.name = createCollectionDto.name;
      return await this.groupRepository.create(collection);
    }
    throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
  }

  async findAll() {
    return await this.collectionRepository.findAll();
  }

  async findOne(id: number) {
    return await this.collectionRepository.findOneById(id);
  }

  async remove(id: number) {
    return await this.collectionRepository.remove(id);
  }
}
