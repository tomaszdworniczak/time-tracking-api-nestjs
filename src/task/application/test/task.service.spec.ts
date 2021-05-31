import { TaskService } from "../task.service";
import { EntityIdGeneratorStub } from "./entityIdGeneratorStub";
import { TaskInmemoryRepository } from "../../infrastructure/task.inmemory-repository";
import { SystemTimeProvider } from "../systemTimeProvider";

describe('TaskService', () => {
    const idGenerator = EntityIdGeneratorStub('task1');
    const taskRepository = new TaskInmemoryRepository();
    const currentTimeProvider = new SystemTimeProvider();

    const taskService: TaskService = new TaskService(taskRepository, idGenerator, currentTimeProvider);

    it('', function() {

    });
});
