import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  USER = 'USER',
  INTERVIEWER = 'INTERVIEWER',
  RECRUITER = 'RECRUITER',
  ADMIN = 'ADMIN',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    name: 'username',
    nullable: false,
  })
  username: string;

  @Column({
    type: 'varchar',
    name: 'display_name',
    nullable: false,
  })
  displayName: string;

  @Column({
    type: 'varchar',
    name: 'avatar_url',
    nullable: true,
  })
  avatarUrl?: string;

  @Column({
    type: 'enum',
    name: 'role',
    enum: UserRole,
    default: UserRole.USER,
    nullable: false,
  })
  role: UserRole;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
