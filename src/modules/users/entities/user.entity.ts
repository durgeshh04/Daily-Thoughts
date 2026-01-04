import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'user_info',
  schema: 'user_schema',
})
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  first_name: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  last_name: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  phone_no: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  address_id: number;
}
