import { ApiModelProperty } from '@nestjs/swagger';
import { MetaDto } from '@rucken/core-nestjs';
import { Type } from 'class-transformer';
import { ProjectDto } from './project.dto';

export class OutProjectsDto {
  @Type(() => ProjectDto)
  @ApiModelProperty({ type: ProjectDto, isArray: true })
  projects: ProjectDto[];

  @Type(() => MetaDto)
  @ApiModelProperty({ type: MetaDto })
  meta: MetaDto;
}
