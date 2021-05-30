import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiHideProperty } from "@nestjs/swagger";

export class TaskDto {
  @ApiHideProperty()
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  name: string;

  @ApiHideProperty()
  @IsDate()
  @IsOptional()
  startedAt: Date;

  @ApiHideProperty()
  @IsDate()
  @IsOptional()
  finishedAt?: Date;
}
