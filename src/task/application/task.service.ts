import { Inject, Injectable } from "@nestjs/common";
import { TaskRepository } from "./task.repository";
import { EntityIdGenerator } from "./entityIdGenerator";
import { CurrentTimeProvider } from "./currentTimeProvider";
import { Task } from "../domain/task";

@Injectable()
export class TaskService {
  constructor(
    @Inject('TaskRepository')
    private readonly repository: TaskRepository,
    @Inject('EntityIdGenerator')
    private readonly idGenerator: EntityIdGenerator,
    @Inject('CurrentTimeProvider')
    private readonly currentTimeProvider: CurrentTimeProvider
  ) {}

  async startTracking(props: { name: string }): Promise<string> {
    const id = this.idGenerator.generate();
    const currentTime = this.currentTimeProvider.currentTime();
    await this.stopCurrentlyTrackedTask(currentTime);
    const newTask = Task.startTracking(id, props.name, currentTime); //transakcja!!!
    await this.repository.save(newTask);
    return id;
  }

  async stopById(id: string): Promise<void> {
    const currentlyTrackedTask = await this.repository.findById(id);
    if (currentlyTrackedTask) {
      const finishedTask = currentlyTrackedTask.stopTracking(this.currentTimeProvider.currentTime()); // błąd jeśli nie ma id i jak już jest zastopowany
      await this.repository.save(finishedTask);
    }
  }

  async findCurrentTrackedTask(): Promise<Task> {
    const currentRunningTask = await this.repository.findCurrentRunning();
    if (!currentRunningTask) {
      throw new Error('There is no current running task');
    }
    return currentRunningTask;
  }

  async stopCurrentlyTrackedTask(currentTime: Date): Promise<void> {     //co gdyby ktoś w tym samym wysłał 2 requesty i w 43 linijce
    const currentlyTrackedTask = await this.repository.findCurrentRunning();
    if (currentlyTrackedTask) {
      const finishedTask = currentlyTrackedTask.stopTracking(currentTime);
      await this.repository.save(finishedTask);
    }
  }
}

