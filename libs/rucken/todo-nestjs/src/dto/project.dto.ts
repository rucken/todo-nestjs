import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { UserDto } from '@rucken/core-nestjs';
import { StatusDto } from './status.dto';

export class ProjectDto {
  @ApiModelProperty({ type: Number })
  id: number;

  @MaxLength(255)
  @IsNotEmpty()
  @ApiModelProperty()
  title: string;

  @MaxLength(512)
  @ApiModelPropertyOptional()
  description: string;

  @ApiModelPropertyOptional({ type: Boolean })
  isPublic: boolean;

  @Type(() => StatusDto)
  @ApiModelProperty({ type: StatusDto, isArray: true })
  statuses: StatusDto[];

  @Type(() => UserDto)
  @ApiModelProperty({ type: UserDto, isArray: true })
  users: UserDto[];
}
