import { ProjectsService } from './projects.service';
import { StatusesService } from './statuses.service';
import { TasksService } from './tasks.service';
import { ProjectsUsersService } from './projects-users.service';
import { ProjectsStatusesService } from './projects-statuses.service';

export const TODO_SERVICES = [
  ProjectsService,
  StatusesService,
  TasksService,
  ProjectsUsersService,
  ProjectsStatusesService
];
