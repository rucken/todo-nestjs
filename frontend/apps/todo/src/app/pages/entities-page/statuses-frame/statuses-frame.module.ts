import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StatusesGridModule } from '@rucken/todo-web';
import { SharedModule } from '../../../shared/shared.module';
import { StatusesFrameComponent } from './statuses-frame.component';
import { StatusesFrameRoutes } from './statuses-frame.routes';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  imports: [
    SharedModule,
    NgxPermissionsModule,
    RouterModule.forChild(StatusesFrameRoutes),
    StatusesGridModule,
    FormsModule
  ],
  declarations: [StatusesFrameComponent]
})
export class StatusesFrameModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StatusesFrameModule,
      providers: []
    };
  }
}
