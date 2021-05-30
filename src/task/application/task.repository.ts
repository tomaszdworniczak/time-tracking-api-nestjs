import { Task } from "../domain/task";

export interface TaskRepository {
    save(task: Task): Promise<void>;

    findById(id: string): Promise<Task | undefined>;

    findCurrentRunning(): Promise<Task | undefined>;
}