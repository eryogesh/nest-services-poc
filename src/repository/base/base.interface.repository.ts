import { DeleteResult } from 'typeorm';

export interface BaseInterfaceRepository<T> {
  create(data: T | any): Promise<T>;

  findOneById(id: number | string): Promise<T>;

  findByCondition(filterCondition: any): Promise<T>;

  findAllByCondition(filterCondition: any): Promise<T[]>;

  findAll(): Promise<T[]>;

  remove(id: number | string): Promise<DeleteResult>;

  findWithRelations(relations: any): Promise<T[]>;
}
