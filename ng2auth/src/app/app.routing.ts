import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './auth-guard.service';

import { AppComponent } from './app.component';
import { LinksComponent } from './links/links.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/placeholder'
  },
  {
    path: 'links',
    component: LinksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'placeholder',
    component: PlaceholderComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [AppComponent, LinksComponent, PlaceholderComponent];
