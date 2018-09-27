import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'statuses-frame',
  templateUrl: './statuses-frame.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusesFrameComponent {
  public apiUrl = environment.apiUrl;
  constructor(public activatedRoute: ActivatedRoute) {}
}
