import {
  Component,
  OnInit,
  HostBinding
} from '@angular/core';
import {default as routerAnimations} from '../route_animations';
import { AuthService } from '../auth.service';
import { AngularFire, FirebaseApp } from 'angularfire2';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { AdminUserListComponent } from '../admin-user-list/admin-user-list.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css', '../slider.css'],
  providers: [ RegisterUserComponent ],
  animations: [routerAnimations('routeAnimations')]
})
export class AdminComponent implements OnInit {

  @HostBinding('@routeAnimations')
  public animatePage = true;

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
