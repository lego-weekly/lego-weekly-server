import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm'

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  link: String;

  @Column({ nullable: true })
  parentId: number;

  @Column({ nullable: true })
  count: number;

  @CreateDateColumn()
  createdTime: Date;
}