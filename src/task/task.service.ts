import { Injectable } from "@nestjs/common";
import { TaskDto } from "./dto/task.dto";

@Injectable()
export class TaskService {
  readonly tasks: TaskDto[] = [];

  create(taskDto: TaskDto): TaskDto {
    taskDto.taskId = Date.now();
    const currentTime = new Date();
    taskDto.startedTrackingDate = currentTime;
    if(this.tasks.length !== 0) {
      this.stopCurrentlyTrackedTask(currentTime);
    }
    this.tasks.push(taskDto);
    return taskDto;
  }

  findAll(): TaskDto[] {
    return this.tasks;
  }

  findCurrentTrackedTask(): TaskDto {
    const currentlyTrackedTask = this.tasks.find(task => task.stoppedTrackingDate === undefined);
    if (!currentlyTrackedTask) {
      throw new Error('Such task does not exist.')
    }
    return currentlyTrackedTask;
  }

  stopCurrentlyTrackedTask(currentTime: Date): void {
    const currentlyTrackedTask = this.findCurrentTrackedTask();
    if (currentlyTrackedTask) {
      currentlyTrackedTask.stoppedTrackingDate = currentTime;
    }
  }
}
