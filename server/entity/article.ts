import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm'

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({charset: 'utf8mb4'})
  title: string;

  @Column({charset: 'utf8mb4'})
  description: string;

  @Column()
  link: String;

  @Column()
  tag: number;

  @Column()
  user: number;

  @CreateDateColumn()
  createdTime: Date;

  @Column({ nullable: true })
  weekId: number;
}