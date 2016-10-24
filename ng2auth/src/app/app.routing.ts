import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { AuthGuardAdmin } from './auth-guard-admin.service'

import { AppComponent } from './app.component';
import { PublicComponent } from './public/public.component';
import { BehindAuthComponent } from './behind-auth/behind-auth.component';
import { AdminComponent } from './admin/admin.component';
import { ContentListComponent } from './content/content-list.component';
import { FileStorageComponent } from './file-storage/file-storage.component';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/public'
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardAdmin]
  },
  {
    path: 'behind-auth',
    component: BehindAuthComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'content-list',
    component: ContentListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'public',
    component: PublicComponent
  },
  {
    path: 'file-storage',
    component: FileStorageComponent,
    canActivate: [AuthGuard]
  }
];

export const routing = RouterModule.forRoot(appRoutes);
export const routedComponents = [AppComponent, AdminComponent, BehindAuthComponent, ContentListComponent, FileStorageComponent, PublicComponent];
