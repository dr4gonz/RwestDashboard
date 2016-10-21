import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FirebaseLoginComponent } from '../firebase-login/firebase-login.component';
import { FirebaseAuth } from 'angularfire2';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ FirebaseLoginComponent ]
})
export class NavbarComponent implements OnInit {

  constructor(public firebaseLogin: FirebaseLoginComponent, public auth: FirebaseAuth) { }
  ngOnInit() {
  }

}
