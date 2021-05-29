import { Injectable } from "@nestjs/common";
import { TaskDto } from "./dto/task.dto";

@Injectable()
export class TaskService {
  readonly tasks: TaskDto[] = [];

  create(taskDto: TaskDto) {
    taskDto.taskId = Date.now();
    const currentTime = new Date();
    taskDto.startedTrackingDate = currentTime;
    if(this.tasks.length !== 0) {
      this.stopCurrentlyTrackedTask(currentTime);
    }
    this.tasks.push(taskDto);
    return taskDto;
  }

  findAll() {
    return this.tasks;
  }

  findOneById(taskId: number) {
    const task: TaskDto = this.tasks.find(task => task.taskId = taskId);
    if (!task) {
      throw new Error('Such task does not exist.')
    }
    return task;
  }

  private stopCurrentlyTrackedTask(currentTime: Date): void {
    this.tasks.find(task => task.stoppedTrackingDate === undefined).stoppedTrackingDate = currentTime;
  }
}
