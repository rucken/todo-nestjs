import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { UserModalModule, UsersGridModalModule } from '@rucken/web';
import { ProjectUserModalModule } from '../project-user-modal/project-user-modal.module';
import { ProjectUsersGridComponent } from './project-users-grid.component';

@NgModule({
  imports: [
    CommonModule,
    UsersGridModalModule,
    UserModalModule,
    ProjectUserModalModule
  ],
  declarations: [ProjectUsersGridComponent],
  exports: [
    ProjectUsersGridComponent,
    UsersGridModalModule,
    UserModalModule,
    ProjectUserModalModule
  ]
})
export class ProjectUsersGridModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ProjectUsersGridModule,
      providers: []
    };
  }
}
