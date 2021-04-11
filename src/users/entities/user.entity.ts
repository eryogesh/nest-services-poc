import { IsEmail } from 'class-validator';
import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Role, (role) => role, { eager: true })
  @JoinTable({ name: 'users_roles' })
  roles: Role[];
}
