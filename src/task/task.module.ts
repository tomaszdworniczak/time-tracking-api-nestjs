import { Module } from "@nestjs/common";
import { TaskService } from "./application/task.service";
import { TaskController } from "./presentation/task.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskEntity } from "./infrastructure/task.entity";
import { TaskTypeormRepository } from "./infrastructure/task.typeorm-repository";
import { SystemTimeProvider } from "./application/systemTimeProvider";
import { UuidEntityIdGenerator } from "./application/uuidEntityIdGenerator";

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity])
  ],
  controllers: [TaskController],
  providers: [TaskService, {
    provide: "TaskRepository",
    useClass: TaskTypeormRepository
  }, { provide: "CurrentTimeProvider", useClass: SystemTimeProvider }, {
    provide: "EntityIdGenerator",
    useClass: UuidEntityIdGenerator
  }]
})


export class TaskModule {
}
