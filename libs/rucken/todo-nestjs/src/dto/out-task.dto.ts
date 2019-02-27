import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { TaskDto } from './task.dto';
export class OutTaskDto {
  @Type(() => TaskDto)
  @ApiModelProperty({ type: TaskDto })
  task: TaskDto;
}
