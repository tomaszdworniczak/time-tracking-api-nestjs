import { TaskService } from "../task.service";
import { FromListEntityIdGeneratorStub } from "./fromListEntityIdGeneratorStub";
import { TaskInmemoryRepository } from "../../infrastructure/task.inmemory-repository";
import { Task } from "../../domain/task";

describe('TaskService', () => {

    it('Given task name, should start tracking task, save it to repository and return its id', async () => {
        //Given
        const taskStartAt = new Date();
        const idGenerator = FromListEntityIdGeneratorStub(['taskID1', 'taskID2']);
        const taskRepository = new TaskInmemoryRepository();
        const currentTimeProvider = {currentTime: jest.fn().mockReturnValueOnce(taskStartAt)}
        const taskService: TaskService = new TaskService(taskRepository, idGenerator, currentTimeProvider);
        const taskName = 'testTask';

        //When
        const result = await taskService.startTracking({name: taskName});

        //Then
        const expectedTaskObject = Task.fromEntity('taskID1', taskName, taskStartAt, undefined);

        expect(result).toBe('taskID1');
        expect(await taskRepository.findById('TaskID1')).toStrictEqual(expectedTaskObject);
    });

    it('Given task id, should stop current tracked task and save finished task in repository', async () => {
        //Given
        const taskStartedAt = new Date();
        const taskFinishedAt = new Date(+1);
        const idGenerator = FromListEntityIdGeneratorStub(['taskID1', 'taskID2']);
        const taskRepository = new TaskInmemoryRepository();
        const currentTimeProvider = {currentTime: jest.fn().mockReturnValueOnce(taskStartedAt).mockReturnValueOnce(taskFinishedAt)}
        const taskService: TaskService = new TaskService(taskRepository, idGenerator, currentTimeProvider);
        const taskName = 'testTask';

        const startedTaskId = await taskService.startTracking({ name: taskName });

        //When
        const result = await taskService.stopById(startedTaskId);

        //Then
        const expectedFinishedTask = Task.fromEntity('taskID1', taskName, taskStartedAt, taskFinishedAt);
        expect(result).toStrictEqual(expectedFinishedTask);
        expect(await taskRepository.findById('taskID1')).toStrictEqual(expectedFinishedTask);
    });

    it('Given current tracked task, when create new task, then current tracked task should stop being tracked', async () => {
        //Given
        const task1StartedAt = new Date();
        const task2StartedAt = new Date(+1);
        const idGenerator = FromListEntityIdGeneratorStub(['taskID1', 'taskID2']);
        const taskRepository = new TaskInmemoryRepository();
        const currentTimeProvider = {currentTime: jest.fn().mockReturnValueOnce(task1StartedAt).mockReturnValueOnce(task2StartedAt)}
        const taskService: TaskService = new TaskService(taskRepository, idGenerator, currentTimeProvider);
        const taskName1 = 'testTask1';
        const taskName2 = 'testTask2';

        await taskService.startTracking({ name: taskName1 });

        //When
        const result = await taskService.startTracking({ name: taskName2 });

        //Then
        const expectedTask1 = Task.fromEntity('taskID1', taskName1, task1StartedAt, task2StartedAt);
        const expectedTask2 = Task.fromEntity('taskID2', taskName2, task2StartedAt, undefined);

        expect(result).toBe('taskID2');
        expect(await taskRepository.findById('taskID1')).toStrictEqual(expectedTask1);
        expect(await taskRepository.findById('taskID2')).toStrictEqual(expectedTask2);
    });

    it('Given tracked task, should find current running task', async () => {
        //Given
        const taskStartedAt = new Date();
        const idGenerator = FromListEntityIdGeneratorStub(['taskID']);
        const taskRepository = new TaskInmemoryRepository();
        const currentTimeProvider = {currentTime: jest.fn().mockReturnValueOnce(taskStartedAt)}
        const taskService: TaskService = new TaskService(taskRepository, idGenerator, currentTimeProvider);
        const taskName = 'testTask';

        await taskService.startTracking({ name: taskName });

        //When
        const result = await taskService.findCurrentTrackedTask();

        //Then
        const expectedCurrentTrackedTask = Task.fromEntity('taskID', taskName, taskStartedAt);

        expect(result).toStrictEqual(expectedCurrentTrackedTask);
    });

    it('Given NO tracked task, should throw error', async () => {
        //Given
        const taskStartedAt = new Date();
        const taskFinishedAt = new Date();
        const idGenerator = FromListEntityIdGeneratorStub(['taskID']);
        const taskRepository = new TaskInmemoryRepository();
        const currentTimeProvider = {currentTime: jest.fn().mockReturnValueOnce(taskStartedAt).mockReturnValueOnce(taskFinishedAt)}
        const taskService: TaskService = new TaskService(taskRepository, idGenerator, currentTimeProvider);
        const taskName = 'testTask';

        const trackedTaskId = await taskService.startTracking({ name: taskName });

        //When
        await taskService.stopById(trackedTaskId);

        //Then
        expect.assertions(1);
        try {
            await taskService.findCurrentTrackedTask();
        } catch (e) {
            expect(e).toStrictEqual(new Error('There is no current running task'));
        }
    });
});
