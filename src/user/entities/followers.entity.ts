import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'user_schema', name: 'followers_table' })
@Unique(['userid', 'followerid'])
@Check('userid != followerid')
export class FollowersEntity {
  @PrimaryGeneratedColumn('uuid')
  followsid: string;

  @Column({ type: 'uuid' })
  userid: string;

  @Column({ type: 'uuid' })
  followerid: string;

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;
}
