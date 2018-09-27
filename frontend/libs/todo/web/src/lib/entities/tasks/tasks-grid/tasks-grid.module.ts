import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EntityGridModule } from '@rucken/web';
import { TaskModalModule } from '../task-modal/task-modal.module';
import { TasksGridComponent } from './tasks-grid.component';

@NgModule({
  imports: [CommonModule, EntityGridModule, TaskModalModule],
  declarations: [TasksGridComponent],
  exports: [TasksGridComponent, EntityGridModule, TaskModalModule]
})
export class TasksGridModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TasksGridModule,
      providers: []
    };
  }
}
