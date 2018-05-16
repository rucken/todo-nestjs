import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { StatusDto } from './status.dto';

export class OutStatusDto {
    @Type(() => StatusDto)
    @ApiModelProperty({ type: StatusDto })
    status: StatusDto;
}