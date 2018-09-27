import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorsExtractor, translate } from '@rucken/core';
import { Project, PROJECTS_CONFIG_TOKEN } from '@rucken/todo-core';
import { BaseEntityListComponent, IBaseEntityModalOptions, MessageModalService, UserPermPipe } from '@rucken/web';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { ProjectModalComponent } from '../project-modal/project-modal.component';

@Component({
  selector: 'projects-grid',
  templateUrl: './projects-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsGridComponent extends BaseEntityListComponent<Project>
  implements OnInit {
  @Input()
  modalItem: IBaseEntityModalOptions = {
    component: ProjectModalComponent,
    class: 'modal-lg'
  };
  @Input()
  modelDelete = {
    class: 'modal-md'
  };
  @Input()
  title = translate('Projects');
  constructor(
    public modalService: BsModalService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    protected messageModalService: MessageModalService,
    @Inject(PROJECTS_CONFIG_TOKEN)
    protected projectsConfig: IRestProviderOptions<Project>,
    protected userPermPipe?: UserPermPipe
  ) {
    super(dynamicRepository.fork<Project>(Project), modalService, Project);
  }
  ngOnInit() {
    if (!this.mockedItems) {
      this.useRest({
        apiUrl: this.apiUrl,
        ...this.projectsConfig,
        autoload: false
      });
    }
    if (this.mockedItems) {
      this.useMock({
        items: this.mockedItems,
        ...this.projectsConfig,
        autoload: false
      });
    }
  }
  onDblClick(item: Project) {
    if (this.userPermPipe.transform(item)) {
      this.onUpdateClick(item);
    } else {
      this.onViewClick(item);
    }
  }
}
