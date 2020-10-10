import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm'

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({charset: 'utf8mb4'})
  name: string;

  @Column({ nullable: true, charset: 'utf8mb4' })
  description: string;

  @Column({ nullable: true })
  link: string;

  @Column({ nullable: true })
  parentId: number;

  @Column({ nullable: true })
  count: number;

  @CreateDateColumn()
  createdTime: Date;
}
