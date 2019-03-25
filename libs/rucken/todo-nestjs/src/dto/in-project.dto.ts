import { Exclude } from 'class-transformer';
import { ProjectDto } from './project.dto';

export class InProjectDto extends ProjectDto {
  @Exclude()
  tasksCount: number;

  @Exclude()
  completedTasksCount: number;
}
