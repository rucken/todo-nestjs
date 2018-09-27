import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EntitySelectModule } from '@rucken/web';
import { ProjectsGridModalModule } from '../projects-grid-modal/projects-grid-modal.module';
import { ProjectSelectComponent } from './project-select.component';

@NgModule({
  imports: [CommonModule, EntitySelectModule, ProjectsGridModalModule],
  declarations: [ProjectSelectComponent],
  exports: [ProjectSelectComponent, EntitySelectModule, ProjectsGridModalModule]
})
export class ProjectSelectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ProjectSelectModule,
      providers: []
    };
  }
}
