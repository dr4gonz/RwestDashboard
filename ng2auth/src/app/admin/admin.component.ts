import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFire, FirebaseApp, FirebaseListObservable } from 'angularfire2';
import { User } from '../models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  errorMessage: string;
  private showRegisterForm: boolean = false;
  private users: FirebaseListObservable<User[]>;

  constructor(private authService: AuthService, private af: AngularFire) { }

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
