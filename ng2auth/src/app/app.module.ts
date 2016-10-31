/** Dependencies **/
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ng2-modal';
import { NgModule } from '@angular/core';

/** Keys **/
import { Keys } from '../keys';

/** Components **/
import { AppComponent } from './app.component';
import { AddDocumentComponent } from './documents/add-document/add-document.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AdminUserListItemComponent } from './admin-user-list-item/admin-user-list-item.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarListItemComponent } from './calendar/calendar-list-item/calendar-list-item.component';
import { ContentAdminComponent } from './content/content-admin/content-admin.component';
import { ContentDetailComponent } from './content/content-detail/content-detail.component';
import { CommentDetailComponent } from './comments/comment-detail/comment-detail.component';
import { CommentListComponent } from './comments/comment-list/comment-list.component';
import { ContentListItemComponent } from './content/content-list-item/content-list-item.component';
import { FileUploadComponent } from './file-storage/file-upload/file-upload.component';
import { FirebaseLoginComponent } from './firebase-login/firebase-login.component';
import { LinksAdminComponent } from './links-admin/links-admin.component';
import { LinksComponent } from './links/links.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewCommentComponent } from './comments/new-comment/new-comment.component';
import { NewContentComponent } from './content/new-content/new-content.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RemoveDocumentComponent } from './documents/remove-document/remove-document.component';
import { RemoveCommentComponent } from './comments/remove-comment/remove-comment.component';
import { StorageListItemComponent } from './file-storage/storage-list-item/storage-list-item.component';
import { routing, routedComponents } from './app.routing';

/** Pipes **/
import { DayPipe } from './pipes/day.pipe';
import { MonthPipe } from './pipes/month.pipe';
import { TimePipe } from './pipes/time.pipe';
import { ToDatePipe } from './pipes/todate.pipe';
import { ToTimePipe } from './pipes/totime.pipe';


/** Services **/
import { AuthGuard } from './auth-guard.service'
import { AuthGuardAdmin } from './auth-guard-admin.service';
import { AuthService } from './auth.service';
import { CalendarEventService } from './calendar-event.service';

/********** End imports **********/

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};
export const firebaseConfig = Keys.FireBaseConfig;

@NgModule({
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule,
    routing
  ],
  declarations: [
    AddDocumentComponent,
    AdminUserListComponent,
    AdminUserListItemComponent,
    AppComponent,
    CalendarComponent,
    CalendarListItemComponent,
    CommentDetailComponent,
    CommentListComponent,
    ContentListItemComponent,
    ContentAdminComponent,
    ContentDetailComponent,
    DayPipe,
    FileUploadComponent,
    FirebaseLoginComponent,
    LinksComponent,
    LinksAdminComponent,
    MonthPipe,
    NavbarComponent,
    NewCommentComponent,
    NewContentComponent,
    RegisterUserComponent,
    RemoveDocumentComponent,
    RemoveCommentComponent,
    routedComponents,
    StorageListItemComponent,
    TimePipe,
    ToDatePipe,
    ToTimePipe
  ],
  providers: [
    AuthService,
    AuthGuard,
    AuthGuardAdmin,
    CalendarEventService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
