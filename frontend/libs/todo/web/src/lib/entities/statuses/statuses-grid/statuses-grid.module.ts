import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EntityGridModule } from '@rucken/web';
import { StatusModalModule } from '../status-modal/status-modal.module';
import { StatusesGridComponent } from './statuses-grid.component';

@NgModule({
  imports: [CommonModule, EntityGridModule, StatusModalModule],
  declarations: [StatusesGridComponent],
  exports: [StatusesGridComponent, EntityGridModule, StatusModalModule]
})
export class StatusesGridModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StatusesGridModule,
      providers: []
    };
  }
}
