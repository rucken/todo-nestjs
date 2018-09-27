import {
  Component,
  Input,
  OnInit,
  Inject,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ErrorsExtractor } from '@rucken/core';
import { Task, TASKS_CONFIG_TOKEN } from '@rucken/todo-core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { MessageModalService } from '@rucken/web';
import { TasksGridComponent } from '../tasks-grid/tasks-grid.component';

@Component({
  selector: 'task-select',
  templateUrl: './task-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskSelectComponent extends TasksGridComponent implements OnInit {
  @Input()
  searchField: FormControl = new FormControl();

  nameField = 'title';

  constructor(
    public modalService: BsModalService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    protected messageModalService: MessageModalService,
    @Inject(TASKS_CONFIG_TOKEN)
    protected tasksConfig: IRestProviderOptions<Task>
  ) {
    super(
      modalService,
      errorsExtractor,
      translateService,
      dynamicRepository,
      messageModalService,
      tasksConfig
    );
  }
  ngOnInit() {
    if (!this.mockedItems) {
      this.useRest({
        apiUrl: this.apiUrl,
        ...this.tasksConfig,
        paginationMeta: { perPage: 1000 }
      });
    }
    if (this.mockedItems) {
      this.useMock({
        items: this.mockedItems,
        ...this.tasksConfig
      });
    }
  }
  checkChange(value: any, item: any) {
    return item instanceof Task;
  }
}
