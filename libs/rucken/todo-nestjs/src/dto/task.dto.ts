import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { ProjectDto } from './project.dto';
import { StatusDto } from './status.dto';

export class TaskDto {
  @ApiModelProperty({ type: Number })
  id: number;
  @MaxLength(255)
  @IsNotEmpty()
  @ApiModelProperty()
  title: string;
  @MaxLength(512)
  @ApiModelPropertyOptional()
  description: string;
  @ApiModelPropertyOptional({ type: String })
  openAt: Date;
  @ApiModelPropertyOptional({ type: String })
  closeAt: Date;
  @Type(() => ProjectDto)
  @IsNotEmpty()
  @ApiModelProperty({ type: ProjectDto })
  project: ProjectDto;
  @Type(() => StatusDto)
  @IsNotEmpty()
  @ApiModelProperty({ type: StatusDto })
  status: StatusDto;
}
