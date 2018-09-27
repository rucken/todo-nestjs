import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EntitySelectModule } from '@rucken/web';
import { TasksGridModalModule } from '../tasks-grid-modal/tasks-grid-modal.module';
import { TaskSelectComponent } from './task-select.component';

@NgModule({
  imports: [CommonModule, EntitySelectModule, TasksGridModalModule],
  declarations: [TaskSelectComponent],
  exports: [TaskSelectComponent, EntitySelectModule, TasksGridModalModule]
})
export class TaskSelectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TaskSelectModule,
      providers: []
    };
  }
}
