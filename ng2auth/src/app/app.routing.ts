import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { AuthGuardAdmin } from './auth-guard-admin.service'

import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { FileStorageComponent } from './file-storage/file-storage.component';
import { HomeComponent } from './home/home.component';

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
    path: 'documents',
    component: DocumentListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'files',
    component: FileStorageComponent,
    canActivate: [AuthGuard]
  }
];

export const routing = RouterModule.forRoot(appRoutes);
export const routedComponents = [AppComponent, AdminComponent, CalendarComponent, DocumentListComponent, FileStorageComponent, HomeComponent];
