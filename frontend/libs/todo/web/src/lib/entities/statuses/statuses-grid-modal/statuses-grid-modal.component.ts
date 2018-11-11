import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild
} from '@angular/core';
import { Project, StatusWithProject } from '@rucken/todo-core';
import { BaseEntityListModalComponent } from '@rucken/web';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { StatusesGridComponent } from '../statuses-grid/statuses-grid.component';

@Component({
  selector: 'statuses-grid-modal',
  templateUrl: './statuses-grid-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusesGridModalComponent extends BaseEntityListModalComponent<
  StatusWithProject
> {
  @ViewChild('grid')
  grid: StatusesGridComponent;
  @Input()
  apiUrl?: string;
  @Input()
  project: Project;

  constructor(protected bsModalRef: BsModalRef) {
    super(bsModalRef);
  }
}
