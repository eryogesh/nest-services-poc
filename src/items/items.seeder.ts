import { Inject, Injectable, Logger } from '@nestjs/common';
import { datatype, internet } from 'faker';
import { times } from 'lodash';
import { CollectionRepositoryInterface } from 'src/collections/interface/collection.repository.interface';
import { ItemRepositoryInterface } from './interface/items.repository.interface';

@Injectable()
export class ItemsSeedService {
  constructor(
    @Inject('ItemRepositoryInterface')
    private itemsRepository: ItemRepositoryInterface,
    @Inject('CollectionRepositoryInterface')
    private collectionRepository: CollectionRepositoryInterface,
  ) {}

  async seedItems() {
    Logger.log(`seeding into items table`, 'ItemsSeeder');
    const noOfRecords: number = datatype.number({ min: 10, max: 20 });
    this.collectionRepository.findAll().then((collections) =>
      collections.forEach((collection) => {
        times(noOfRecords, async () => {
          await this.itemsRepository.create({
            name: internet.userName(),
            collection: collection,
          });
        });
      }),
    );
    return { message: `${noOfRecords} records inserted into items Table` };
  } //end of seedusers
}
