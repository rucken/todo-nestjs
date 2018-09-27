import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EntitySelectModule } from '@rucken/web';
import { StatusesGridModalModule } from '../statuses-grid-modal/statuses-grid-modal.module';
import { StatusSelectComponent } from './status-select.component';

@NgModule({
  imports: [CommonModule, EntitySelectModule, StatusesGridModalModule],
  declarations: [StatusSelectComponent],
  exports: [StatusSelectComponent, EntitySelectModule, StatusesGridModalModule]
})
export class StatusSelectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StatusSelectModule,
      providers: []
    };
  }
}
