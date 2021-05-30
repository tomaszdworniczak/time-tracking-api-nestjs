import { Module } from "@nestjs/common";
import { TaskService } from "./services/task.service";
import { TaskController } from "./controllers/task.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Task])
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
