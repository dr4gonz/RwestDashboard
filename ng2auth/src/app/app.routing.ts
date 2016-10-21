import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { AuthGuardAdmin } from './auth-guard-admin.service'

import { AppComponent } from './app.component';
import { PublicComponent } from './public/public.component';
import { BehindAuthComponent } from './behind-auth/behind-auth.component';
import { AdminComponent } from './admin/admin.component';
import { ContentListComponent } from './content/content-list.component';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/public'
  },
  {
    path: 'public',
    component: PublicComponent
  },
  {
    path: 'behind-auth',
    component: BehindAuthComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardAdmin]
  },
  {
    path: 'content-list',
    component: ContentListComponent,
    canActivate: [AuthGuard]
  }
];

export const routing = RouterModule.forRoot(appRoutes);
export const routedComponents = [AppComponent, PublicComponent, BehindAuthComponent, AdminComponent, ContentListComponent];
