import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum AuthProvider {
  LOCAL = 'LOCAL',
  GOOGLE = 'GOOGLE',
}

@Entity('auth_identities')
export class AuthIdentity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column({
    type: 'enum',
    name: 'provider',
    enum: AuthProvider,
    nullable: false,
  })
  provider: AuthProvider;

  @Column({
    type: 'varchar',
    name: 'provider_id',
    nullable: true,
  })
  providerId?: string;

  @Column({
    type: 'varchar',
    name: 'password_hash',
    nullable: true,
  })
  passwordHash?: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
