import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskRequestBody {
  @ApiProperty()
  @IsString()
  name: string;
}