import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MetaDto } from '../../core/dto/meta.dto';
import { StatusDto } from './status.dto';


export class OutStatusesDto {
    @Type(() => StatusDto)
    @ApiModelProperty({ type: StatusDto, isArray: true })
    statuses: StatusDto[];
    @Type(() => MetaDto)
    @ApiModelProperty({ type: MetaDto })
    meta: MetaDto;
}