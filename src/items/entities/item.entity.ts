import { Collection } from 'src/collections/entities/collection.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 40 })
  name: string;

  @ManyToOne(() => Collection, (collection) => collection.items)
  @JoinColumn()
  collection: Collection;
}
