import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorsExtractor, translate } from '@rucken/core';
import { Project, Task, TASKS_CONFIG_TOKEN } from '@rucken/todo-core';
import {
  BaseEntityListComponent,
  IBaseEntityModalOptions,
  IEntityGridFilter,
  MessageModalService
} from '@rucken/web';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'tasks-grid',
  templateUrl: './tasks-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksGridComponent extends BaseEntityListComponent<Task>
  implements OnInit {
  @Input()
  modalItem: IBaseEntityModalOptions = {
    component: TaskModalComponent
  };
  @Input()
  title = translate('Tasks');
  @Input()
  project: Project;

  constructor(
    public modalService: BsModalService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    protected messageModalService: MessageModalService,
    @Inject(TASKS_CONFIG_TOKEN)
    protected tasksConfig: IRestProviderOptions<Task>
  ) {
    super(dynamicRepository.fork<Task>(Task), modalService, Task);
  }
  ngOnInit() {
    if (!this.mockedItems) {
      this.useRest({
        apiUrl: this.apiUrl,
        ...this.tasksConfig,
        autoload: false
      });
    }
    if (this.mockedItems) {
      this.useMock({
        items: this.mockedItems,
        ...this.tasksConfig,
        autoload: false
      });
    }
  }
  onChangeFilter(filter?: IEntityGridFilter) {
    filter = filter ? filter : {};
    if (this.project) {
      filter.project = this.project.id;
      this.mockedItems = undefined;
    } else {
      this.mockedItems = [];
    }
    this.ngOnInit();
    super.onChangeFilter(filter);
  }
  defaultCreateCreateModal(): BsModalRef {
    const item = new Task();
    item.project = this.project;
    this.modalCreate = {
      ...this.modalCreate,
      initialState: {
        ...this.modalCreate.initialState,
        data: item
      }
    };
    return super.defaultCreateCreateModal(item);
  }
  defaultCreateUpdateModal(item?: Task): BsModalRef {
    item.project = this.project;
    this.modalUpdate = {
      ...this.modalUpdate,
      initialState: {
        ...this.modalUpdate.initialState,
        data: item
      }
    };
    return super.defaultCreateUpdateModal(item);
  }
}
