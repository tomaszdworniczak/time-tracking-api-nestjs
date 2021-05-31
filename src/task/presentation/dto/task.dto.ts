import { IsDate, IsString } from "class-validator";

export class TaskDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsDate()
  startedAt: Date;

  @IsDate()
  finishedAt: Date | undefined;

  constructor(id: string, name: string, startedAt: Date, finishedAt: Date | undefined) {
    this.id = id;
    this.name = name;
    this.startedAt = startedAt;
    this.finishedAt = finishedAt;
  }
}
