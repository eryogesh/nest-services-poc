import { Injectable, Logger } from '@nestjs/common';
import { datatype, internet } from 'faker';
import { times } from 'lodash';
import { getConnection } from 'typeorm';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Injectable()
export class UsersSeedService {
  constructor(private userService: UsersService) {}

  async seedUsers() {
    Logger.log(`seeding into users table`, 'UsersSeeder');
    const noOfRecords: number = datatype.number({ min: 10, max: 30 });
    times(noOfRecords, async () => {
      await this.userService.create({
        email: internet.email(),
        password: internet.password(),
      });
    });
    Logger.log(`${noOfRecords} inserted into users table`, 'UsersSeeder');
    return { message: `${noOfRecords} records inserted into user Table` };
  }

  async createUsers() {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { email: 'abc1@gmail.com', password: 'pass@123' },
        { email: 'abc2@gmail.com', password: 'pass@123' },
        { email: 'abc3@gmail.com', password: 'pass@123' },
        { email: 'abc4@gmail.com', password: 'pass@123' },
        { email: 'abc5@gmail.com', password: 'pass@123' },
      ])
      .execute();
  }
}
