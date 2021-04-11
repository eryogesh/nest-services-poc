import { Group } from 'src/groups/entities/group.entity';
import { UserRole } from 'src/shared/models/role.enum';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @ManyToOne(() => Group, (group) => group.roles, { eager: true })
  @JoinColumn()
  group: Group;

  @ManyToMany(() => User, (user) => user.roles, { cascade: true })
  users: User[];
}
