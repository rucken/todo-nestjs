import { ApiModelProperty } from '@nestjs/swagger';
import { MetaDto } from '@todo-nestjs/core';
import { Type } from 'class-transformer';
import { TaskDto } from './task.dto';

export class OutTasksDto {
  @Type(() => TaskDto)
  @ApiModelProperty({ type: TaskDto, isArray: true })
  tasks: TaskDto[];
  @Type(() => MetaDto)
  @ApiModelProperty({ type: MetaDto })
  meta: MetaDto;
}
