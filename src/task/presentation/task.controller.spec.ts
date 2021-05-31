import { Test, TestingModule } from "@nestjs/testing";
import { TaskController } from "./task.controller";
import { TaskService } from "../application/task.service";
import { TaskModule } from "../task.module";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { TaskInmemoryRepository } from "../infrastructure/task.inmemory-repository";

describe('TaskController', () => {
  let app: INestApplication;
  let taskService =  {
    findCurrentTrackedTask: jest.fn(),
    startTracking: jest.fn(),
    stopById: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TaskModule],
    }).overrideProvider(TaskService)
      .useValue(taskService)
      .overrideProvider('TaskRepository')
      .useValue(new TaskInmemoryRepository())
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  xit('POST tracked-task', () => {
    taskService.startTracking.mockReturnValue('taskID')

    return request(app.getHttpServer())
      .post('/tracked-task')
      .expect(201)
      .expect({
        data: 'taskID',
      })
  })
});
