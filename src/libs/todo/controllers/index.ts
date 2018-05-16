import { ChangesController } from './changes.controller';
import { ProjectsController } from './projects.controller';
import { StatusesController } from './statuses.controller';
import { TasksController } from './tasks.controller';

export const controllers = [
    ProjectsController,
    TasksController,
    StatusesController,
    ChangesController
]