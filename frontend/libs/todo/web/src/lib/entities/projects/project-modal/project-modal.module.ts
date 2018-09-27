import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PromptFormModalModule } from '@rucken/web';
import { ProjectStatusesGridModule } from '../project-statuses-grid/project-statuses-grid.module';
import { ProjectUsersGridModule } from '../project-users-grid/project-users-grid.module';
import { ProjectModalComponent } from './project-modal.component';

@NgModule({
  imports: [
    CommonModule,
    PromptFormModalModule,
    ProjectStatusesGridModule,
    ProjectUsersGridModule,
    TranslateModule.forChild()
  ],
  declarations: [ProjectModalComponent],
  entryComponents: [ProjectModalComponent],
  exports: [
    ProjectModalComponent,
    PromptFormModalModule,
    ProjectStatusesGridModule,
    ProjectUsersGridModule
  ]
})
export class ProjectModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ProjectModalModule,
      providers: []
    };
  }
}
