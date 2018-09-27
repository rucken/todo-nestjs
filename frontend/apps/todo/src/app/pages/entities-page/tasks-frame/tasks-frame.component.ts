import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'tasks-frame',
  templateUrl: './tasks-frame.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksFrameComponent {
  public apiUrl = environment.apiUrl;
  constructor(public activatedRoute: ActivatedRoute) {}
}
