import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '@rucken/core';
import { BasePromptFormModalComponent } from '@rucken/web';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'project-user-modal',
  templateUrl: './project-user-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectUserModalComponent extends BasePromptFormModalComponent<
  User
> {
  @Input()
  apiUrl?: string;

  constructor(protected bsModalRef: BsModalRef) {
    super(bsModalRef);
    this.group(User);
  }
}
