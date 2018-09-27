import { MetaGuard } from '@ngx-meta/core';
import { translate } from '@rucken/core';
import { ProjectsPageComponent } from './projects-page.component';

export const ProjectsPageRoutes = [
  {
    path: '',
    component: ProjectsPageComponent,
    canActivate: [MetaGuard],
    data: {
      name: 'projects',
      meta: {
        title: translate('Projects'),
        description: translate('Projects page')
      }
    }
  }
];
