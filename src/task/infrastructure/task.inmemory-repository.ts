import { TaskRepository } from "../application/task.repository";
import { Injectable } from "@nestjs/common";
import { Task } from "../domain/task";

@Injectable()
export class TaskInmemoryRepository implements TaskRepository {
  private readonly entities: Task[] = []

  async save(task: Task): Promise<void> {
    this.entities.push(task);
  }

  findById(id: string): Promise<Task | undefined> {
    return Promise.resolve(this.entities.find(id => id));
  }

  findCurrentRunning(): Promise<Task | undefined> {
    return Promise.resolve(this.entities.find(task => task.getTrackingStoppedAt() === undefined));
  }
}