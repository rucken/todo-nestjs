import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MetaDto } from '../../core/dto/meta.dto';
import { ProjectDto } from './project.dto';


export class OutProjectsDto {
    @Type(() => ProjectDto)
    @ApiModelProperty({ type: ProjectDto, isArray: true })
    projects: ProjectDto[];
    @Type(() => MetaDto)
    @ApiModelProperty({ type: MetaDto })
    meta: MetaDto;
}