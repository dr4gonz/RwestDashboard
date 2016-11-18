import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service'

import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FileDetailComponent } from './file-storage/file-detail/file-detail.component';
import { HomeComponent } from './home/home.component';
import { NewProjectComponent } from './project/new-project/new-project.component';
import { ProjectComponent } from './project/project.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { TaskListComponent } from './tasks/task-list.component';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardAdmin]
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'files/:id',
    component: FileDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'projects',
    component: ProjectComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'projects/new',
    component: NewProjectComponent,
    canActivate: [AuthGuardAdmin]
  },
  {
    path: 'projects/:id',
    component: ProjectDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks',
    component: TaskListComponent,
    canActivate: [AuthGuard]
  }
];

export const routing = RouterModule.forRoot(appRoutes);
export const routedComponents = [AppComponent, AdminComponent, CalendarComponent, HomeComponent, FileDetailComponent, NewProjectComponent, ProjectComponent, ProjectDetailComponent, TaskListComponent];
