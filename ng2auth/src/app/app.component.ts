import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { AuthGuardAdmin } from './auth-guard-admin.service';

@Component({
  selector: 'app-component',
  templateUrl: 'app.component.html',
  styleUrls : ['app.component.css']
})
export class AppComponent {

  title = 'R/West Angular2 Login Mockup';

  constructor(private authService: AuthService, private adminService: AuthGuardAdmin) {}
}
