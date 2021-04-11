import { Injectable } from '@nestjs/common';

import { CollectionsSeedService } from './collections/collections.seeder';
import { GroupsSeedService } from './groups/groups.seeder';
import { ItemsSeedService } from './items/items.seeder';
import { RolesSeedService } from './roles/role.seeder';
import { UsersSeedService } from './users/users.seeder';

@Injectable()
export class AppService {
  constructor(
    private readonly usersSeedService: UsersSeedService,
    private readonly groupsSeedService: GroupsSeedService,
    private readonly collectionsSeedService: CollectionsSeedService,
    private readonly itemsSeedService: ItemsSeedService,
    private readonly rolesSeedService: RolesSeedService,
  ) {}

  generateMockData() {
    const TIMEOUT = 5000;
    this.groupsSeedService.seedGroups().then(() => {
      setTimeout(() => {
        this.collectionsSeedService.seedCollections().then(() => {
          setTimeout(() => {
            this.itemsSeedService.seedItems().then(() => {
              setTimeout(() => {
                this.usersSeedService.createUsers().then(() => {
                  setTimeout(() => {
                    this.rolesSeedService.seedManagerRoles().then(() => {
                      setTimeout(() => {
                        this.rolesSeedService.seedRegularRoles().then(() => {
                          setTimeout(() => {
                            this.rolesSeedService
                              .assignRegularRolesToUsers()
                              .then(() => {
                                setTimeout(() => {
                                  this.rolesSeedService.createGlobalManager();
                                }, TIMEOUT);
                              });
                          }, TIMEOUT);
                        });
                      }, TIMEOUT);
                    });
                  }, TIMEOUT);
                });
              }, TIMEOUT);
            });
          }, TIMEOUT);
        });
      }, TIMEOUT);
    });
  }
}
