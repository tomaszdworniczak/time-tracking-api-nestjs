import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { TaskService } from "../application/task.service";
import { TaskDto } from "./dto/task.dto";
import { Task } from "../domain/task";
import { CreateTaskRequestBody } from "./createTaskRequestBody";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Tasks')
@Controller('tracked-tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() req: CreateTaskRequestBody): Promise<string> {
    return this.taskService.startTracking({ name: req.name });
  }

  @Get('current-running')
  async findCurrentTrackedTask(): Promise<TaskDto> {
    return domainToDto(await this.taskService.findCurrentTrackedTask());
  }

  @Patch(':id/finish')
  async stopTaskById(@Param('id') id: string): Promise<TaskDto> {
    return domainToDto(await this.taskService.stopById(id));
  }
}

function domainToDto(task: Task): TaskDto {
  return new TaskDto(task.getId(), task.getName(), task.getTrackingStartedAt(), task.getTrackingStoppedAt())
}
