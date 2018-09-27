import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'projects-frame',
  templateUrl: './projects-frame.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsFrameComponent {
  public apiUrl = environment.apiUrl;
  constructor(public activatedRoute: ActivatedRoute) {}
}
