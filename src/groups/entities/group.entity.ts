import { Collection } from 'src/collections/entities/collection.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 40, unique: true, nullable: false })
  name: string;

  @OneToMany(() => Role, (role) => role.group, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  roles: Role[];

  @OneToMany(() => Collection, (collection) => collection.group, {
    cascade: true,
    eager: true,
  })
  collections: Collection[];
}
