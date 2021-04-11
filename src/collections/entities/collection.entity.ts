import { Group } from 'src/groups/entities/group.entity';
import { Item } from 'src/items/entities/item.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('collections')
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 40,
    unique: true,
    nullable: true,
  })
  name: string;

  @OneToMany(() => Item, (item) => item.collection, {
    cascade: true,
    eager: true,
  })
  items: Item[];

  @ManyToOne(() => Group, (group) => group.collections)
  group: Group;
}
