import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'user_schema', name: 'followers_table' })
export class FollowersEntity {
  @PrimaryGeneratedColumn('uuid')
  followsid: string;

  @Column({ type: 'varchar' })
  userid: string;

  @Column({ type: 'varchar' })
  followerid: string;

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;
}
