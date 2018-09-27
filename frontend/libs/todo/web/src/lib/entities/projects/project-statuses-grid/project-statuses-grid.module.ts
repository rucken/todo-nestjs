import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EntityGridModule } from '@rucken/web';
import { StatusModalModule } from '../../statuses/status-modal/status-modal.module';
import { StatusesGridModalModule } from '../../statuses/statuses-grid-modal/statuses-grid-modal.module';
import { ProjectStatusesGridComponent } from './project-statuses-grid.component';

@NgModule({
  imports: [
    CommonModule,
    EntityGridModule,
    StatusModalModule,
    StatusesGridModalModule
  ],
  declarations: [ProjectStatusesGridComponent],
  exports: [
    ProjectStatusesGridComponent,
    EntityGridModule,
    StatusModalModule,
    StatusesGridModalModule
  ]
})
export class ProjectStatusesGridModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ProjectStatusesGridModule,
      providers: []
    };
  }
}
