import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { AuthGuardAdmin } from './auth-guard-admin.service'

import { AppComponent } from './app.component';
import { LinksComponent } from './links/links.component';
import { LinksAdminComponent } from './links-admin/links-admin.component';
import { PublicComponent } from './public/public.component';
import { BehindAuthComponent } from './behind-auth/behind-auth.component';
import { AdminComponent } from './admin/admin.component';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/public'
  },
  {
    path: 'links',
    component: LinksComponent,
    canActivate: [AuthGuard]
  },{
    path: 'links-admin',
    component: LinksAdminComponent,
    canActivate: [AuthGuardAdmin]
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
  }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [AppComponent, LinksComponent, LinksAdminComponent, PublicComponent, BehindAuthComponent, AdminComponent];
