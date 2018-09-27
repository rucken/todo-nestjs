import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TasksGridModule } from '@rucken/todo-web';
import { SharedModule } from '../../../shared/shared.module';
import { TasksFrameComponent } from './tasks-frame.component';
import { TasksFrameRoutes } from './tasks-frame.routes';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  imports: [
    SharedModule,
    NgxPermissionsModule,
    RouterModule.forChild(TasksFrameRoutes),
    TasksGridModule,
    FormsModule
  ],
  declarations: [TasksFrameComponent]
})
export class TasksFrameModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TasksFrameModule,
      providers: []
    };
  }
}
