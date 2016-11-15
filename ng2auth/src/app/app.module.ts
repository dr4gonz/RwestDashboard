/** Dependencies **/
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ng2-modal';
import { Component, NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';


/** Keys **/
import { Keys } from '../keys';

/** Components **/
import { AppComponent } from './app.component';
import { AddDocumentComponent } from './documents/add-document/add-document.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AdminUserListItemComponent } from './admin-user-list-item/admin-user-list-item.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarListItemComponent } from './calendar/calendar-list-item/calendar-list-item.component';
import { CalendarDayBlockComponent } from './calendar/calendar-day-block/calendar-day-block.component';
import { CalendarDayBlockDetailComponent } from './calendar/calendar-day-block-detail/calendar-day-block-detail.component';
import { CalendarDayViewComponent } from './calendar/calendar-day-view/calendar-day-view.component';
import { CalendarMonthGridComponent } from './calendar/calendar-month-grid/calendar-month-grid.component';
import { CalendarMonthViewComponent } from './calendar/calendar-month-view/calendar-month-view.component';
import { CalendarWeekViewComponent } from './calendar/calendar-week-view/calendar-week-view.component';
import { CommentDetailComponent } from './comments/comment-detail/comment-detail.component';
import { CommentListComponent } from './comments/comment-list/comment-list.component';
import { FileDetailComponent } from './file-storage/file-detail/file-detail.component';
import { FilePreviewComponent } from './file-storage/file-preview/file-preview.component';
import { FileUploadComponent } from './file-storage/file-upload/file-upload.component';
import { FirebaseLoginComponent } from './firebase-login/firebase-login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewCommentComponent } from './comments/new-comment/new-comment.component';
import { NewProjectComponent } from './project/new-project/new-project.component';
import { ProjectComponent } from './project/project.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { ProjectPreviewComponent } from './project/project-preview/project-preview.component';
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
import { WeekPipe } from './pipes/week.pipe';


/** Services **/
import { AuthGuard } from './auth-guard.service'
import { AuthGuardAdmin } from './auth-guard-admin.service';
import { AuthService } from './auth.service';
import { CalendarEventService } from './calendar-event.service';
import { MailDeliveryService } from './mail-delivery.service';

/********** End imports **********/

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
    CalendarDayBlockComponent,
    CalendarDayBlockDetailComponent,
    CalendarDayViewComponent,
    CalendarListItemComponent,
    CalendarMonthGridComponent,
    CalendarMonthViewComponent,
    CalendarWeekViewComponent,
    CommentDetailComponent,
    CommentListComponent,
    DayPipe,
    FileDetailComponent,
    FilePreviewComponent,
    FileUploadComponent,
    FirebaseLoginComponent,
    MonthPipe,
    NavbarComponent,
    NewCommentComponent,
    NewProjectComponent,
    ProjectComponent,
    ProjectDetailComponent,
    ProjectPreviewComponent,
    RegisterUserComponent,
    RemoveDocumentComponent,
    RemoveCommentComponent,
    routedComponents,
    StorageListItemComponent,
    TimePipe,
    ToDatePipe,
    ToTimePipe,
    WeekPipe
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    AuthService,
    AuthGuard,
    AuthGuardAdmin,
    CalendarEventService,
    MailDeliveryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
