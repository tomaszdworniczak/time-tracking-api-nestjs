import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskDto } from "../dto/task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "../entities/task.entity";

@Injectable()
export class TaskService {
  readonly tasks: TaskDto[] = [];

  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>
  ) {}

  create(task: TaskDto): Promise<Task> {
    task.id = Date.now();
    task.startedAt = new Date();
    return this.repository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.repository.find();
  }

  findCurrentTrackedTask(): TaskDto {
    const currentlyTrackedTask = this.tasks.find(task => task.startedAt === undefined);
    if (!currentlyTrackedTask) {
      throw new NotFoundException('Such task does not exist.')
    }
    return currentlyTrackedTask;
  }

  stopCurrentlyTrackedTask(currentTime: Date): void {
    const currentlyTrackedTask = this.findCurrentTrackedTask();
    if (currentlyTrackedTask) {
      currentlyTrackedTask.startedAt = currentTime;
    }
  }
}
