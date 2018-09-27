import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PromptFormModalModule } from '@rucken/web';
import { ProjectUserModalComponent } from './project-user-modal.component';

@NgModule({
  imports: [CommonModule, PromptFormModalModule, TranslateModule.forChild()],
  declarations: [ProjectUserModalComponent],
  entryComponents: [ProjectUserModalComponent],
  exports: [ProjectUserModalComponent, PromptFormModalModule]
})
export class ProjectUserModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ProjectUserModalModule,
      providers: []
    };
  }
}
