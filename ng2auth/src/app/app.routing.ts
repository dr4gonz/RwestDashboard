import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { AuthGuardAdmin } from './auth-guard-admin.service'

import { AppComponent } from './app.component';
import { PublicComponent } from './public/public.component';
import { BehindAuthComponent } from './behind-auth/behind-auth.component';
import { AdminComponent } from './admin/admin.component';
import { FirebaseComponent } from './firebase/firebase.component';
import { FirebaseLoginComponent } from './firebase-login/firebase-login.component';
import { ContentComponent } from './content/content.component';

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
    path: 'firebase',
    component: FirebaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'firebase-login',
    component: FirebaseLoginComponent,
  },
  {
    path: 'content',
    component: ContentComponent,
    canActivate: [AuthGuard]
  }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [AppComponent, PublicComponent, BehindAuthComponent, AdminComponent, FirebaseComponent, FirebaseLoginComponent, ContentComponent];
