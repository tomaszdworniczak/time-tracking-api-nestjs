import { TaskRepository } from "../application/task.repository";
import { Task } from "../domain/task";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskEntity } from "./task.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TaskTypeormRepository implements TaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly repository: Repository<TaskEntity>
  ) {}

  async findById(id: string): Promise<Task | undefined> {
    const findResult = await this.repository.findOne(id)
    return findResult ? entityToDomain(findResult) : undefined;
  }

  findCurrentRunning(): Promise<Task | undefined> {
    return Promise.resolve(undefined);
  }

  async save(task: Task): Promise<void> {
    const entity = new TaskEntity(task.getId(), task.getName(), task.getTrackingStartedAt(), task.getTrackingStoppedAt());
    await this.repository.save(entity);
  }
}

function entityToDomain(entity: TaskEntity): Task {
  return Task.startTracking(entity.id, entity.name, entity.startedAt);
}