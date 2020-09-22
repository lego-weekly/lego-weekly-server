import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm'

@Entity()
export class Week {
  @PrimaryGeneratedColumn()
  id: number

  @Column({charset: 'utf8mb4'})
  title: string

  @Column()
  week: number

  @Column()
  image: string

  @Column({ type: 'simple-array'})
  articleIds: number[];

  @CreateDateColumn()
  createdTime: Date
}
