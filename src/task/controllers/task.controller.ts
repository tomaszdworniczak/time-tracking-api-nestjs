import { Body, Controller, Get, HttpCode, Patch, Post } from "@nestjs/common";
import { TaskService } from "../services/task.service";
import { TaskDto } from "../dto/task.dto";

@Controller('tracked-task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() taskDto: TaskDto) {
    return this.taskService.create(taskDto);
  }

  @Get('all')
  findAll() {
    return this.taskService.findAll();
  }

  @Get('current')
  findCurrentTrackedTask() {
    return this.taskService.findCurrentTrackedTask();
  }

  @Patch('current/stop')
  @HttpCode(204)
  stopTrackingCurrentTask() {
    this.taskService.stopCurrentlyTrackedTask(new Date());
  }
}
