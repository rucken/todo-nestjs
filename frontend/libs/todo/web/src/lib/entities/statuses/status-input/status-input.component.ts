import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorsExtractor, translate } from '@rucken/core';
import { STATUSES_CONFIG_TOKEN, StatusWithProject } from '@rucken/todo-core';
import { IBaseEntityModalOptions, MessageModalService } from '@rucken/web';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DynamicRepository, IRestProviderOptions } from 'ngx-repository';
import { StatusesGridModalComponent } from '../statuses-grid-modal/statuses-grid-modal.component';
import { StatusesGridComponent } from '../statuses-grid/statuses-grid.component';

@Component({
  selector: 'status-input',
  templateUrl: './status-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusInputComponent extends StatusesGridComponent
  implements OnInit {
  @Input()
  modalAppendFromGrid: IBaseEntityModalOptions = {
    component: StatusesGridModalComponent,
    initialState: {
      title: translate('Select status'),
      yesTitle: translate('Select')
    }
  };
  @Output()
  select = new EventEmitter<StatusWithProject>();

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
    this.mockedItems = [];
    this.useMock({
      items: this.mockedItems,
      ...this.statusesConfig
    });
    this.mockedItemsChange.subscribe(items => this.onSelect(items[0]));
  }
  defaultAppendFromGridModal(): BsModalRef {
    this.modalAppendFromGrid = {
      ...this.modalAppendFromGrid,
      initialState: {
        ...this.modalAppendFromGrid.initialState,
        project: this.project
      }
    };
    return super.defaultAppendFromGridModal();
  }
  onSelect(item: StatusWithProject) {
    this.select.emit(item);
  }
}
