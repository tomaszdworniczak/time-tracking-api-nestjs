import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskName: string;

  @Column()
  startedAt: Date;

  @Column({ type: 'timestamp', default: () => undefined })
  finishedAt: Date;
}
