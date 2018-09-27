import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EntityGridModalModule } from '@rucken/web';
import { TasksGridModule } from '../tasks-grid/tasks-grid.module';
import { TasksGridModalComponent } from './tasks-grid-modal.component';

@NgModule({
  imports: [CommonModule, EntityGridModalModule, TasksGridModule],
  declarations: [TasksGridModalComponent],
  entryComponents: [TasksGridModalComponent],
  exports: [TasksGridModalComponent, EntityGridModalModule, TasksGridModule]
})
export class TasksGridModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TasksGridModalModule,
      providers: []
    };
  }
}
