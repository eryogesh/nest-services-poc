import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/repository/users.repository';

import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersSeedService } from './users.seeder';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
    UsersService,
    UsersSeedService,
  ],
  exports: [
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
    UsersSeedService,
    UsersService,
  ],
})
export class UsersModule {}
