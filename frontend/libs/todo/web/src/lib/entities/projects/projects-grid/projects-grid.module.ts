import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EntityGridModule } from '@rucken/web';
import { ProjectModalModule } from '../project-modal/project-modal.module';
import { ProjectsGridComponent } from './projects-grid.component';

@NgModule({
  imports: [
    CommonModule,
    EntityGridModule,
    ProjectModalModule,
    FontAwesomeModule
  ],
  declarations: [ProjectsGridComponent],
  exports: [ProjectsGridComponent, EntityGridModule, ProjectModalModule]
})
export class ProjectsGridModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ProjectsGridModule,
      providers: []
    };
  }
}
