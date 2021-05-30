import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from '../application/task.service';
import { TaskDto } from "./dto/task.dto";

describe('TaskController', () => {
  let taskController: TaskController;
  let taskService: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService],
    }).compile();

    taskController = module.get<TaskController>(TaskController);
    taskService = module.get<TaskService>(TaskService)
  });

  // describe('findAll', () => {
  //   it('should return an array of all tasks', async () => {
  //     const result: TaskDto[] = [ { id: 123123, name: 'testTask', startedAt: new Date(), finishedAt: new Date() },
  //       { id: 456456, name: 'testTask2', startedAt: new Date(), finishedAt: undefined } ];
  //
  //     jest.spyOn(taskService, 'findAll').mockImplementation(() => Promise.resolve(result));
  //
  //     expect(await taskController.findAll()).toBe(result);
  //   });
  // });
});
