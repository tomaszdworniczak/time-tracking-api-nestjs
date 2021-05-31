import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('task')
export class TaskEntity {
  @PrimaryColumn()
  id: string;

  //TODO: poczytaj o typach, określ max długości

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: 'timestamptz' })
  startedAt: Date;

  @Column({ nullable: true, type: 'timestamptz' })
  finishedAt: Date | undefined;

  constructor(id: string, name: string, startedAt: Date, finishedAt: Date | undefined) {
    this.id = id;
    this.name = name;
    this.startedAt = startedAt;
    this.finishedAt = finishedAt;
  }
}
