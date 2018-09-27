import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorsExtractor, translate, User } from '@rucken/core';
import { Project, STATUSES_CONFIG_TOKEN } from '@rucken/todo-core';
import { IBaseEntityModalOptions, MessageModalService } from '@rucken/web';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository, IRestProviderOptions, ProviderActionEnum } from 'ngx-repository';
import { StatusModalComponent } from '../../statuses/status-modal/status-modal.component';
import { StatusesGridModalComponent } from '../../statuses/statuses-grid-modal/statuses-grid-modal.component';
import { StatusesGridComponent } from '../../statuses/statuses-grid/statuses-grid.component';

@Component({
  selector: 'project-statuses-grid',
  templateUrl: './project-statuses-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectStatusesGridComponent extends StatusesGridComponent
  implements OnInit {
  @Input()
  project: Project;
  @Input()
  modelDelete = {
    initialState: {
      title: translate('Delete status'),
      message: translate(
        'Do you really want to delete status "{{title}}" from project?'
      )
    }
  };
  @Input()
  modelAppendFromGrid = {
    component: StatusesGridModalComponent,
    initialState: {
      title: translate('Select status for append to project')
    }
  };

  constructor(
    public modalService: BsModalService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    protected messageModalService: MessageModalService,
    @Inject(STATUSES_CONFIG_TOKEN)
    protected statusesConfig: IRestProviderOptions<User>
  ) {
    super(
      modalService,
      errorsExtractor,
      translateService,
      dynamicRepository,
      messageModalService,
      statusesConfig
    );
  }
  ngOnInit() {
    if (!this.mockedItems) {
      this.useRest({
        apiUrl: this.apiUrl + '/project/' + this.project.id,
        ...this.statusesConfig,
        globalEventResolver: (data: any, action: ProviderActionEnum) => {
          return (
            action !== ProviderActionEnum.Create &&
            action !== ProviderActionEnum.Delete
          );
        }
      });
    }
    if (this.mockedItems) {
      this.useMock({
        items: this.mockedItems,
        ...this.statusesConfig,
        globalEventResolver: (data: any, action: ProviderActionEnum) => {
          return (
            action !== ProviderActionEnum.Create &&
            action !== ProviderActionEnum.Delete
          );
        }
      });
    }
  }
}
