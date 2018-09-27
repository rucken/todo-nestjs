import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { PromptFormModalModule } from '@rucken/web';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { StatusInputModule } from '../../statuses/status-input/status-input.module';
import { StatusSelectModule } from '../../statuses/status-select/status-select.module';
import { TaskModalComponent } from './task-modal.component';

@NgModule({
  imports: [
    CommonModule,
    PromptFormModalModule,
    BsDatepickerModule,
    StatusInputModule,
    TypeaheadModule.forRoot()
  ],
  declarations: [TaskModalComponent],
  entryComponents: [TaskModalComponent],
  exports: [
    TaskModalComponent,
    PromptFormModalModule,
    BsDatepickerModule,
    StatusSelectModule
  ]
})
export class TaskModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TaskModalModule,
      providers: []
    };
  }
}
