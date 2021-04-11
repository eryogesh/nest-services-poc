import { BaseInterfaceRepository } from 'src/repository/base/base.interface.repository';

import { User } from '../entities/user.entity';

export type UserRepositoryInterface = BaseInterfaceRepository<User>;
