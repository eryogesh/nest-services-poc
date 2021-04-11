import { Injectable, Logger } from '@nestjs/common';
import { datatype, internet } from 'faker';
import { times } from 'lodash';
import { GroupsService } from './groups.service';

@Injectable()
export class GroupsSeedService {
  constructor(private groupService: GroupsService) {}

  async seedGroups() {
    Logger.log(`seeding into items table`, 'ItemsService');
    const noOfRecords: number = datatype.number({ min: 5, max: 10 });
    times(noOfRecords, async () => {
      await this.groupService.create({
        name: internet.domainName(),
      });
    }); //end of seedgroups
    return { message: `${noOfRecords} records inserted into user Table` };
  }
}
