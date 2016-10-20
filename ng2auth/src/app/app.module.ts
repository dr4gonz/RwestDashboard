import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { LinksComponent } from './links/links.component';
import { LinksAdminComponent } from './links-admin/links-admin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { routing, routedComponents } from './app.routing';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service'
import { AuthGuardAdmin } from './auth-guard-admin.service';

export const firebaseConfig = {
  apiKey: 'AIzaSyAFGPdUQeU1MywC6TPkHh4TrLF9Z7Fbl3M',
  authDomain: 'rwest-auth-login-test.firebaseapp.com',
  databaseURL: 'https://rwest-auth-login-test.firebaseio.com',
  storageBucket: 'rwest-auth-login-test.appspot.com'
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    JsonpModule,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  declarations: [
    AppComponent,
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
