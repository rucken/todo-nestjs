import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MetaDto } from '../../core/dto/meta.dto';
import { ChangeDto } from './change.dto';


export class OutChangesDto {
    @Type(() => ChangeDto)
    @ApiModelProperty({ type: ChangeDto, isArray: true })
    changes: ChangeDto[];
    @Type(() => MetaDto)
    @ApiModelProperty({ type: MetaDto })
    meta: MetaDto;
}