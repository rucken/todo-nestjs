import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProjectsGridModule } from '@rucken/todo-web';
import { SharedModule } from '../../../shared/shared.module';
import { ProjectsFrameComponent } from './projects-frame.component';
import { ProjectsFrameRoutes } from './projects-frame.routes';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  imports: [
    SharedModule,
    NgxPermissionsModule,
    RouterModule.forChild(ProjectsFrameRoutes),
    ProjectsGridModule,
    FormsModule
  ],
  declarations: [ProjectsFrameComponent]
})
export class ProjectsFrameModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ProjectsFrameModule,
      providers: []
    };
  }
}
