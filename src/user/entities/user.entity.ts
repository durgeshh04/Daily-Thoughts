import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
