import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { ProjectDto } from './project.dto';
import { Type } from 'class-transformer';

export class StatusDto {

    @ApiModelProperty({ type: Number })
    id: number;
    @MaxLength(100)
    @ApiModelProperty()
    name: string;
    @MaxLength(255)
    @IsNotEmpty()
    @ApiModelProperty()
    title: string;
    @Type(() => ProjectDto)
    @IsNotEmpty()
    @ApiModelProperty({ type: ProjectDto })
    project: ProjectDto;
}