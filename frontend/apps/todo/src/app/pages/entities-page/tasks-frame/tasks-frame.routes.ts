import { translate } from '@rucken/core';
import { TasksFrameComponent } from './tasks-frame.component';
import { MetaGuard } from '@ngx-meta/core';

export const TasksFrameRoutes = [
  {
    path: '',
    component: TasksFrameComponent,
    canActivate: [MetaGuard],
    data: {
      name: 'tasks',
      meta: {
        title: translate('Tasks'),
        description: translate('Tasks frame')
      }
    }
  }
];
