import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiHideProperty } from "@nestjs/swagger";

export class TaskDto {
  @ApiHideProperty()
  @IsNumber()
  @IsOptional()
  taskId: number;

  @IsString()
  taskName: string;

  @ApiHideProperty()
  @IsDate()
  @IsOptional()
  startedTrackingDate: Date;

  @ApiHideProperty()
  @IsDate()
  @IsOptional()
  stoppedTrackingDate?: Date;
}
