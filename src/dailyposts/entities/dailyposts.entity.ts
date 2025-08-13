import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'user_posts', name: 'daily_posts' })
export class DailyPosts {
  @PrimaryGeneratedColumn('uuid')
  postid: string;

  @Column({ type: 'uuid' })
  userid: string;

  @Column({ type: 'varchar', length: 1000 })
  content: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  mediaUrl?: string;

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;
}
