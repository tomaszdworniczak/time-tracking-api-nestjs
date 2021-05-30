import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from '../services/task.service';
import { TaskDto } from "../dto/task.dto";

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

  describe('findAll', () => {
    it('should return an array of all tasks', async () => {
      const result: TaskDto[] = [ { id: 123123, taskName: 'testTask', startedAt: new Date(), finishedAt: new Date() },
        { id: 456456, taskName: 'testTask2', startedAt: new Date(), finishedAt: undefined } ];

      jest.spyOn(taskService, 'findAll').mockImplementation(() => result);

      expect(await taskController.findAll()).toBe(result);
    });
  });
});
