import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component',
  templateUrl: 'app.component.html',
  styleUrls : ['app.component.css']
})
export class AppComponent implements OnInit {

  title = 'R/West Angular2 Login Mockup';
  constructor(private authService: AuthService) { }

  ngOnInit() { }
}
