import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { PromptFormModalModule } from '@rucken/web';
import { StatusModalComponent } from './status-modal.component';

@NgModule({
  imports: [CommonModule, PromptFormModalModule],
  declarations: [StatusModalComponent],
  entryComponents: [StatusModalComponent],
  exports: [StatusModalComponent, PromptFormModalModule]
})
export class StatusModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StatusModalModule,
      providers: []
    };
  }
}
