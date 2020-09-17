import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm'

@Entity()
export class Week {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  week: number;

  @Column()
  count: number;

  @CreateDateColumn()
  createdTime: Date;
}