import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { ChangeDto } from './change.dto';

export class OutChangeDto {
    @Type(() => ChangeDto)
    @ApiModelProperty({ type: ChangeDto })
    change: ChangeDto;
}