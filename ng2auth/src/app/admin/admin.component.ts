import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFire, FirebaseApp } from 'angularfire2';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { AdminUserListComponent } from '../admin-user-list/admin-user-list.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ RegisterUserComponent ]
})
export class AdminComponent implements OnInit {

  errorMessage: string;
  profile: Object;

  constructor(private authService: AuthService, private ru: RegisterUserComponent) {
  }

  ngOnInit() {
  }

  createUser() {
    this.ru.registerUser();
  }

}
