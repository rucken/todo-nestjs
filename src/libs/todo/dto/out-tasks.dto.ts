import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MetaDto } from '../../core/dto/meta.dto';
import { TaskDto } from './task.dto';


export class OutTasksDto {
    @Type(() => TaskDto)
    @ApiModelProperty({ type: TaskDto, isArray: true })
    tasks: TaskDto[];
    @Type(() => MetaDto)
    @ApiModelProperty({ type: MetaDto })
    meta: MetaDto;
}