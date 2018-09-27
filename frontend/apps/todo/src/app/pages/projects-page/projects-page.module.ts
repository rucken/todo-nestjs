import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectsGridModule, TasksGridModule } from '@rucken/todo-web';
import { NavSidebarModule } from '@rucken/web';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from '../../shared/shared.module';
import { ProjectsPageComponent } from './projects-page.component';
import { ProjectsPageRoutes } from './projects-page.routes';

@NgModule({
  imports: [
    SharedModule,
    NgxPermissionsModule.forChild(),
    NavSidebarModule,
    RouterModule.forChild(ProjectsPageRoutes),
    ProjectsGridModule,
    TasksGridModule
  ],
  declarations: [ProjectsPageComponent]
})
export class ProjectsPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ProjectsPageModule,
      providers: []
    };
  }
}
