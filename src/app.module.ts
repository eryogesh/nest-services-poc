import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthenticationMiddleware } from './auth/middlewares/authentication.middleware';
import { AuthorizationMiddleware } from './auth/middlewares/authorization.middleware';
import { CollectionsModule } from './collections/collections.module';
import { CoreModule } from './core/core.module';
import { ormConfig } from './database/config/ormconfig';
import { GroupsModule } from './groups/groups.module';
import { ItemsModule } from './items/items.module';
import { RolesModule } from './roles/roles.module';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig()),
    GroupsModule,
    CollectionsModule,
    ItemsModule,
    RolesModule,
    UsersModule,
    SharedModule,
    CoreModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private readonly appService: AppService) {
    this.appService.generateMockData();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware, AuthorizationMiddleware)
      .exclude({ path: 'api/v1/auth/login', method: RequestMethod.POST })
      .forRoutes('/');
  }
}
