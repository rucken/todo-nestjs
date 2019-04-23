import { Exclude } from 'class-transformer';
import { ProjectDto } from './project.dto';
import { UserDto } from '@rucken/core-nestjs';

export class InProjectDto extends ProjectDto {
  @Exclude()
  tasksCount: number;

  @Exclude()
  completedTasksCount: number;

  @Exclude()
  createdUser: UserDto;

  @Exclude()
  updatedUser: UserDto;
}
