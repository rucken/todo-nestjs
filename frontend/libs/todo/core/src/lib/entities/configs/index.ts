import { Provider } from '@angular/core';
import {
  defaultProjectsConfig,
  PROJECTS_CONFIG_TOKEN
} from './projects.config';
import {
  defaultStatusesConfig,
  STATUSES_CONFIG_TOKEN
} from './statuses.config';
import { defaultTasksConfig, TASKS_CONFIG_TOKEN } from './tasks.config';

export const entitiesProviders: Provider[] = [
  {
    provide: PROJECTS_CONFIG_TOKEN,
    useValue: defaultProjectsConfig
  },
  {
    provide: STATUSES_CONFIG_TOKEN,
    useValue: defaultStatusesConfig
  },
  {
    provide: TASKS_CONFIG_TOKEN,
    useValue: defaultTasksConfig
  }
];
