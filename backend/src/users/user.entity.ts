import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Length, IsEmail } from 'class-validator';

@Entity()
export class User {
  @ObjectIdColumn()
  id: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @Length(6, 32)
  password: string;
}
