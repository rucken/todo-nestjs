import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { ProjectDto } from './project.dto';

export class OutProjectDto {
    @Type(() => ProjectDto)
    @ApiModelProperty({ type: ProjectDto })
    project: ProjectDto;
}