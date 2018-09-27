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
import { Project, PROJECTS_CONFIG_TOKEN } from '@rucken/todo-core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { MessageModalService } from '@rucken/web';
import { ProjectsGridComponent } from '../projects-grid/projects-grid.component';

@Component({
  selector: 'project-select',
  templateUrl: './project-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectSelectComponent extends ProjectsGridComponent
  implements OnInit {
  @Input()
  searchField: FormControl = new FormControl();

  nameField = 'title';

  constructor(
    public modalService: BsModalService,
    protected errorsExtractor: ErrorsExtractor,
    protected translateService: TranslateService,
    protected dynamicRepository: DynamicRepository,
    protected messageModalService: MessageModalService,
    @Inject(PROJECTS_CONFIG_TOKEN)
    protected projectsConfig: IRestProviderOptions<Project>
  ) {
    super(
      modalService,
      errorsExtractor,
      translateService,
      dynamicRepository,
      messageModalService,
      projectsConfig
    );
  }
  ngOnInit() {
    if (!this.mockedItems) {
      this.useRest({
        apiUrl: this.apiUrl,
        ...this.projectsConfig,
        paginationMeta: { perPage: 1000 }
      });
    }
    if (this.mockedItems) {
      this.useMock({
        items: this.mockedItems,
        ...this.projectsConfig
      });
    }
  }
  checkChange(value: any, item: any) {
    return item instanceof Project;
  }
}
