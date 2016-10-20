import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AngularFireModule } from 'angularfire2';

import { Keys } from '../keys';

import { AppComponent } from './app.component';
import { LinksComponent } from './links/links.component';
import { LinksAdminComponent } from './links-admin/links-admin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContentDetailComponent } from './content-detail/content-detail.component';
import { routing, routedComponents } from './app.routing';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service'
import { AuthGuardAdmin } from './auth-guard-admin.service';

export const firebaseConfig = Keys.FireBaseConfig;

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    JsonpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  declarations: [
    AppComponent,
    ContentDetailComponent,
    LinksComponent,
    LinksAdminComponent,
    NavbarComponent,
    routedComponents
  ],
  providers: [
    AUTH_PROVIDERS,
    AuthService,
    AuthGuard,
    AuthGuardAdmin
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
