import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EntityInputModule } from '@rucken/web';
import { TasksGridModalModule } from '../tasks-grid-modal/tasks-grid-modal.module';
import { TaskInputComponent } from './task-input.component';

@NgModule({
  imports: [CommonModule, EntityInputModule, TasksGridModalModule],
  declarations: [TaskInputComponent],
  exports: [TaskInputComponent, EntityInputModule, TasksGridModalModule]
})
export class TaskInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TaskInputModule,
      providers: []
    };
  }
}
