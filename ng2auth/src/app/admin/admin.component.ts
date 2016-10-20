import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  errorMessage: string;
  profile: Object;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
