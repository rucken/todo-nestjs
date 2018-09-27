import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EntityGridModalModule } from '@rucken/web';
import { StatusesGridModule } from '../statuses-grid/statuses-grid.module';
import { StatusesGridModalComponent } from './statuses-grid-modal.component';

@NgModule({
  imports: [CommonModule, EntityGridModalModule, StatusesGridModule],
  declarations: [StatusesGridModalComponent],
  entryComponents: [StatusesGridModalComponent],
  exports: [
    StatusesGridModalComponent,
    EntityGridModalModule,
    StatusesGridModule
  ]
})
export class StatusesGridModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StatusesGridModalModule,
      providers: []
    };
  }
}
