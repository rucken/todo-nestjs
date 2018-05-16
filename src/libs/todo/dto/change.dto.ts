import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ContentTypeDto } from '../../core/dto/content-type.dto';
import { UserDto } from '../../core/dto/user.dto';
import { ProjectDto } from './project.dto';

export class ChangeDto {

    @ApiModelProperty({ type: Number })
    id: number;
    @ApiModelPropertyOptional()
    data: string;
    @ApiModelPropertyOptional()
    dataId: string;
    @ApiModelPropertyOptional()
    method: string;
    @Type(() => ProjectDto)
    @ApiModelProperty({ type: ProjectDto })
    project: ProjectDto;
    @Type(() => ContentTypeDto)
    @ApiModelProperty({ type: ContentTypeDto })
    contentType: ContentTypeDto;
    @Type(() => UserDto)
    @ApiModelProperty({ type: UserDto })
    user: UserDto;

}