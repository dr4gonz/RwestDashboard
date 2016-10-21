import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { Keys } from '../keys';

import { AppComponent } from './app.component';
import { LinksComponent } from './links/links.component';
import { LinksAdminComponent } from './links-admin/links-admin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FirebaseLoginComponent } from './firebase-login/firebase-login.component';
import { ContentListItemComponent } from './content/content-list-item/content-list-item.component';
import { ContentAdminComponent } from './content/content-admin/content-admin.component';
import { ContentDetailComponent } from './content/content-detail/content-detail.component';
import { NewContentComponent } from './content/new-content/new-content.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { FileUploadComponent } from './file-storage/file-upload/file-upload.component';
import { StorageListItemComponent } from './file-storage/storage-list-item/storage-list-item.component';

import { routing, routedComponents } from './app.routing';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service'
import { AuthGuardAdmin } from './auth-guard-admin.service';

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};
export const firebaseConfig = Keys.FireBaseConfig;

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
    ContentListItemComponent,
    ContentAdminComponent,
    ContentDetailComponent,
    FileUploadComponent,
    FirebaseLoginComponent,
    LinksComponent,
    LinksAdminComponent,
    NavbarComponent,
    NewContentComponent,
    RegisterUserComponent,
    StorageListItemComponent,
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
