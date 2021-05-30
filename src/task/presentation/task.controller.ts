import { Body, Controller, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { TaskService } from "../application/task.service";
import { TaskDto } from "./dto/task.dto";

@Controller('tracked-tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() taskDto: TaskDto): Promise<string> { //CreateTaskRequestBody
    return this.taskService.startTracking({ name: taskDto.name });
  }

  @Get('current-running')
  findCurrentTrackedTask() {
    return this.taskService.findCurrentTrackedTask();
  }

  @Patch(':id/finish')
  @HttpCode(204)
  stopTaskById(@Param('id') id: string) {
    this.taskService.stopById(id);
  }
}
