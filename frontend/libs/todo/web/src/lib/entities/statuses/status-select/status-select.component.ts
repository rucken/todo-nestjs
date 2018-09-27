import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ErrorsExtractor } from '@rucken/core';
import { STATUSES_CONFIG_TOKEN, StatusWithProject } from '@rucken/todo-core';
import { MessageModalService } from '@rucken/web';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { StatusesGridComponent } from '../statuses-grid/statuses-grid.component';

@Component({
  selector: 'status-select',
  templateUrl: './status-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusSelectComponent extends StatusesGridComponent
  implements OnInit {
  @Input()
  searchField: FormControl = new FormControl();

  nameField = 'name';

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
        apiUrl: this.apiUrl,
        ...this.statusesConfig,
        paginationMeta: { perPage: 1000 }
      });
    }
    if (this.mockedItems) {
      this.useMock({
        items: this.mockedItems,
        ...this.statusesConfig
      });
    }
  }
  checkChange(value: any, item: any) {
    return item instanceof StatusWithProject;
  }
}
