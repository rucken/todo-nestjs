import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorsExtractor, translate, User, USERS_CONFIG_TOKEN } from '@rucken/core';
import { Project } from '@rucken/todo-core';
import { IBaseEntityModalOptions, MessageModalService, UsersGridComponent, UsersGridModalComponent } from '@rucken/web';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository, IRestProviderOptions, ProviderActionEnum } from 'ngx-repository';
import { ProjectUserModalComponent } from '../project-user-modal/project-user-modal.component';

@Component({
  selector: 'project-users-grid',
  templateUrl: './project-users-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectUsersGridComponent extends UsersGridComponent
  implements OnInit {
  @Input()
  modalItem: IBaseEntityModalOptions = {
    component: ProjectUserModalComponent,
    initialState: {
      simpleMode: true
    }
  };
  @Input()
  modelDelete = {
    initialState: {
      title: translate('Delete user'),
      message: translate(
        'Do you really want to delete user "{{fullName}}" from project?'
      )
    }
  };
  @Input()
  modelAppendFromGrid = {
    component: UsersGridModalComponent,
    initialState: {
      title: translate('Select user for append to project'),
      simpleMode: true
    }
  };
  @Input()
  project: Project;

  constructor(
    public modalService: BsModalService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    protected messageModalService: MessageModalService,
    @Inject(USERS_CONFIG_TOKEN)
    protected usersConfig: IRestProviderOptions<User>
  ) {
    super(
      modalService,
      errorsExtractor,
      translateService,
      dynamicRepository,
      messageModalService,
      usersConfig
    );
  }
  ngOnInit() {
    if (!this.mockedItems) {
      this.useRest({
        apiUrl: this.apiUrl + '/project/' + this.project.id,
        ...this.usersConfig,
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
        ...this.usersConfig,
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
