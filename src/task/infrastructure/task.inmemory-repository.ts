import { TaskRepository } from "../application/task.repository";
import { Injectable } from "@nestjs/common";
import { Task } from "../domain/task";

@Injectable()
export class TaskInmemoryRepository implements TaskRepository {
  private readonly entities: { [id:string]: Task} = {}

  async save(task: Task): Promise<void> {
    this.entities[task.getId()] = task;
  }

  findById(id: string): Promise<Task | undefined> {
    return Promise.resolve(this.entities[id]);
  }

  findCurrentRunning(): Promise<Task | undefined> {
    return Promise.resolve(Object.values(this.entities).find(task => task.getTrackingStoppedAt() === undefined));
  }
}