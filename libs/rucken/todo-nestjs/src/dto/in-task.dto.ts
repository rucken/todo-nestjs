import { Exclude } from 'class-transformer';
import { TaskDto } from './task.dto';
import { UserDto } from '@rucken/core-nestjs';

export class InTaskDto extends TaskDto {
  @Exclude()
  createdUser: UserDto;

  @Exclude()
  updatedUser: UserDto;
}
