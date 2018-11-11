import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@rucken/core';
import { Project } from '@rucken/todo-core';
import { ProjectsGridComponent, TasksGridComponent } from '@rucken/todo-web';
import { UserPermPipe } from '@rucken/web';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'projects-page',
  templateUrl: './projects-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsPageComponent implements OnDestroy, AfterViewInit {
  @ViewChild('projectsGrid')
  projectsGrid: ProjectsGridComponent;
  @ViewChild('tasksGrid')
  tasksGrid: TasksGridComponent;

  apiUrl = environment.apiUrl;

  private _destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public activatedRoute: ActivatedRoute,
    private _userPermPipe: UserPermPipe,
    private _authService: AuthService
  ) {}
  ngAfterViewInit() {
    this._authService.current$
      .pipe(takeUntil(this._destroyed$))
      .subscribe(_ => {
        if (this.projectsGrid) {
          this.projectsGrid.onReload();
        }
      });
    this.projectsGrid.items$
      .pipe(takeUntil(this._destroyed$))
      .subscribe(items => {
        if (items.length === 0) {
          this.onSelectProjects();
        }
      });
  }
  ngOnDestroy() {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }
  onSelectProjects(projects?: Project[]) {
    const project = projects && projects[0] ? projects[0] : undefined;
    if (!project) {
      this.tasksGrid.readonly = true;
      this.tasksGrid.project = undefined;
      this.tasksGrid.onChangeFilter();
    } else {
      this.tasksGrid.readonly = !this._userPermPipe.transform(project);
      if (this.tasksGrid.project !== project) {
        this.tasksGrid.project = project;
        this.tasksGrid.onChangeFilter();
      }
    }
  }
}
