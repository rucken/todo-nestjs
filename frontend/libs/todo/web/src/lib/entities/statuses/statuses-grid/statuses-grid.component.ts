import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorsExtractor, translate } from '@rucken/core';
import { Project, STATUSES_CONFIG_TOKEN, StatusWithProject } from '@rucken/todo-core';
import { BaseEntityListComponent, IBaseEntityModalOptions, IEntityGridFilter, MessageModalService } from '@rucken/web';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { StatusModalComponent } from '../status-modal/status-modal.component';

@Component({
  selector: 'statuses-grid',
  templateUrl: './statuses-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusesGridComponent
  extends BaseEntityListComponent<StatusWithProject>
  implements OnInit {
  @Input()
  modalItem: IBaseEntityModalOptions = {
    component: StatusModalComponent
  };
  @Input()
  title = translate('Statuses');
  @Input()
  project: Project;

  constructor(
    public modalService: BsModalService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    protected messageModalService: MessageModalService,
    @Inject(STATUSES_CONFIG_TOKEN)
    protected statusesConfig: IRestProviderOptions<StatusWithProject>
  ) {
    super(
      dynamicRepository.fork<StatusWithProject>(StatusWithProject),
      modalService,
      StatusWithProject
    );
  }
  ngOnInit() {
    if (!this.mockedItems) {
      this.useRest({
        apiUrl: this.apiUrl,
        ...this.statusesConfig,
        autoload: false
      });
    }
    if (this.mockedItems) {
      this.useMock({
        items: this.mockedItems,
        ...this.statusesConfig,
        autoload: false
      });
    }
    this.onChangeFilter();
  }
  onChangeFilter(filter?: IEntityGridFilter) {
    filter = filter ? filter : {};
    if (this.project) {
      filter.project = this.project.id;
    } else {
      filter.project = -1;
    }
    super.onChangeFilter(filter);
  }
  defaultCreateCreateModal(): BsModalRef {
    const item = new StatusWithProject();
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
  defaultCreateUpdateModal(item?: StatusWithProject): BsModalRef {
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
