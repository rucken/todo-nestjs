import { translate } from '@rucken/core';
import { StatusesFrameComponent } from './statuses-frame.component';
import { MetaGuard } from '@ngx-meta/core';

export const StatusesFrameRoutes = [
  {
    path: '',
    component: StatusesFrameComponent,
    canActivate: [MetaGuard],
    data: {
      name: 'statuses',
      meta: {
        title: translate('Statuses'),
        description: translate('Statuses frame')
      }
    }
  }
];
