import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class TaskDto {
  @IsNumber()
  @IsOptional()
  taskId: number;

  @IsString()
  taskName: string;

  @IsDate()
  @IsOptional()
  startedTrackingDate: Date;

  @IsDate()
  @IsOptional()
  stoppedTrackingDate: Date | undefined;
}
