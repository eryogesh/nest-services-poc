import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { datatype, internet } from 'faker';
import { times } from 'lodash';
import { GroupRepositoryInterface } from 'src/groups/interface/group.repository.interface';
import { Repository } from 'typeorm';

import { Collection } from './entities/collection.entity';

@Injectable()
export class CollectionsSeedService {
  constructor(
    @InjectRepository(Collection)
    private collectionsRepo: Repository<Collection>,
    @Inject('GroupRepositoryInterface')
    private groupRepository: GroupRepositoryInterface,
  ) {}
  async seedCollections() {
    Logger.log(`seeding into collections table`, 'CollectionsSeeder');
    const noOfRecords: number = datatype.number({ min: 10, max: 20 });
    this.groupRepository.findAll().then((groups) => {
      groups.forEach(async (group) => {
        times(noOfRecords, async () => {
          await this.collectionsRepo.save({
            name: internet.userName(),
            group: group,
          });
        });
      });
    });
    Logger.log(
      `${noOfRecords} inserted into collections table`,
      'CollectionsSeedService',
    );
    return {
      message: `${noOfRecords} records inserted into Collections Table`,
    };
  } //end of seedCollections
}
