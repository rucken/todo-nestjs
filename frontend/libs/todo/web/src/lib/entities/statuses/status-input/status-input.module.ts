import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EntityInputModule } from '@rucken/web';
import { StatusesGridModalModule } from '../statuses-grid-modal/statuses-grid-modal.module';
import { StatusInputComponent } from './status-input.component';

@NgModule({
  imports: [CommonModule, EntityInputModule, StatusesGridModalModule],
  declarations: [StatusInputComponent],
  exports: [StatusInputComponent, EntityInputModule, StatusesGridModalModule]
})
export class StatusInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StatusInputModule,
      providers: []
    };
  }
}
