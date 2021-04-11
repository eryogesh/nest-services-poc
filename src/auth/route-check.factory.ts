import { User } from 'src/users/entities/user.entity';

import { UserRole } from '../shared/models/role.enum';

export enum Resources {
  COLLECTIONS = 'collections',
  ITEMS = 'items',
  GROUPS = 'groups',
}
export interface IPermissionResult {
  role: string;
  groupId: string;
  collectionId?: number;
  itemId?: number;
}
export interface IAllresources {
  role: string;
  groupId: string;
  collectionId?: any[];
  itemId?: any[];
}

export const GRANTEDMETHODS = {
  regular: ['get'],
  manager: ['post', 'patch', 'delete'],
  globalManager: ['get', 'patch', 'delete', 'post'],
};

export const GlobalManagerResources = ['users', 'roles', 'groups'];
export class RouteCheckfactory {
  static getStrategy(routePath: string, withResourceId?: boolean) {
    let checkResourceMethod: any;
    if (withResourceId) {
      switch (routePath) {
        // case 'groups':
        //   checkResourceMethod = RouteCheckfactory.getPermissionForGroups;
        //   break;
        case 'collections':
          checkResourceMethod = RouteCheckfactory.getPermissionForCollections;
          break;
        case 'items':
          checkResourceMethod = RouteCheckfactory.getPermissionForItems;
          break;
      }
    } else {
      switch (routePath) {
        // case 'groups':
        //   checkResourceMethod = RouteCheckfactory.getResourcesForGroups;
        //   break;
        case 'collections':
          checkResourceMethod = RouteCheckfactory.getResourcesForCollections;
          break;
        case 'items':
          checkResourceMethod = RouteCheckfactory.getResourcesForItems;
          break;
      }
    }
    return checkResourceMethod;
  }

  static getGrantedMethods(userRole: string) {
    let grantedMethods: string[];
    switch (userRole) {
      case UserRole.REGULAR:
        grantedMethods = GRANTEDMETHODS.regular;
        break;
      case UserRole.GROUPMANAGER:
        grantedMethods = GRANTEDMETHODS.manager;
        break;
      case UserRole.GLOBALMANAGER:
        grantedMethods = GRANTEDMETHODS.globalManager;
        break;
    }
    return grantedMethods;
  }

  static isUserGlobalManager(user: User) {
    for (const role of user.roles) {
      if (role.role === UserRole.GLOBALMANAGER) return true;
    }
    return false;
  }

  static getPermissionForGroups(user: User, resourceId: string) {
    let result: IPermissionResult;
    for (const role of user.roles) {
      if (role.group.id == resourceId) {
        result = {
          role: role.role,
          groupId: role.group.id,
        };
        return result;
      }
    }
    return undefined;
  } //end of function

  static getPermissionForCollections(user: User, resourceId: number) {
    let result: IPermissionResult;
    for (const role of user.roles) {
      for (const collection of role.group.collections) {
        if (Number(collection.id) === Number(resourceId)) {
          result = {
            groupId: role.group.id,
            role: role.role,
            collectionId: collection.id,
          };
          return result;
        }
      }
    }
    return undefined;
  } //end of function

  static getPermissionForItems(user: User, resourceId: number) {
    let result: IPermissionResult;
    for (const role of user.roles) {
      for (const collection of role.group.collections) {
        for (const item of collection.items) {
          if (Number(item.id) === Number(resourceId)) {
            result = {
              groupId: role.group.id,
              role: role.role,
              collectionId: collection.id,
              itemId: item.id,
            };
            return result;
          }
        }
      }
      return undefined;
    } // end of for
  } //end of functions

  static getResourcesForItems(user: User) {
    let result: any[];
    for (const role of user.roles) {
      for (const collection of role.group.collections) {
        result.push(...collection.items);
      }
    }
    return result;
  } // end of function

  static getResourcesForCollections(user: User) {
    let result: any[];
    for (const role of user.roles) {
      result.push(...role.group.collections);
    }
    return result;
  } //end of function

  static getResourcesForGroups(user: User) {
    let result: any[];
    for (const role of user.roles) {
      result.push(role.group);
    }
    return result;
  }
}
