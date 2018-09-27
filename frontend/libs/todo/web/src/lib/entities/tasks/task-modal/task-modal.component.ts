import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Task } from '@rucken/todo-core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BasePromptFormModalComponent } from '@rucken/web';

@Component({
  selector: 'task-modal',
  templateUrl: './task-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskModalComponent extends BasePromptFormModalComponent<Task> {
  @Input()
  apiUrl?: string;

  constructor(protected bsModalRef: BsModalRef) {
    super(bsModalRef);
    this.group(Task);
  }
}
