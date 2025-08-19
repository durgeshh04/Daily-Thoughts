import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'user_schema', name: 'user_details' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  userid: string;

  @Column({ type: 'varchar' })
  firstname: string;

  @Column({ type: 'varchar' })
  lastname: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  googleid: string;

  @Column({ type: 'varchar', nullable: true })
  picture: string;

  @Column({ type: 'varchar', nullable: true })
  refreshtoken: string;

  @Column({ type: 'boolean', default: false })
  privateaccount: boolean;

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;
}
