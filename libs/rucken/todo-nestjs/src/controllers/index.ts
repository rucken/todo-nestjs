import { ProjectsUsersController } from './projects-users.controller';
import { ProjectsController } from './projects.controller';
import { StatusesController } from './statuses.controller';
import { TasksController } from './tasks.controller';
import { ProjectsStatusesController } from './projects-statuses.controller';

export const TODO_CONTROLLERS = [
  ProjectsUsersController,
  ProjectsStatusesController,
  ProjectsController,
  StatusesController,
  TasksController
];
