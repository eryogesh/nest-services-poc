import { BaseInterfaceRepository } from '../../repository/base/base.interface.repository';
import { Item } from '../entities/item.entity';

export type ItemRepositoryInterface = BaseInterfaceRepository<Item>;
