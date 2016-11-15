import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFire, FirebaseApp, FirebaseListObservable } from 'angularfire2';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { AdminUserListComponent } from '../admin-user-list/admin-user-list.component';
import { User } from '../models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ RegisterUserComponent ]
})
export class AdminComponent implements OnInit {

  private af: AngularFire;
  errorMessage: string;
  profile: Object;
  private showRegisterForm: boolean = false;
  private users: FirebaseListObservable<User[]>;

  constructor(private authService: AuthService, private ru: RegisterUserComponent, af: AngularFire) {
    this.af = af;
  }

  ngOnInit() {
    this.users = this.af.database.list('/users');
  }

  showForm() {
    this.showRegisterForm = true;
  }

  hideForm() {
    this.showRegisterForm = false;
  }

  registerUser(newUser) {
    this.users.push(newUser);
    this.hideForm();
  }

}
