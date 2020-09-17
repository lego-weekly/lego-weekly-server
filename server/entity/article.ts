import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm'

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  link: String;

  @Column()
  tag: number;

  @Column()
  user: number;

  @CreateDateColumn()
  createdTime: Date;

  @Column()
  week: number;
}