import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({charset: 'utf8mb4'})
  name: string;

  @Column({ select: false })
  password: string;

  @Column()
  email: string;
}