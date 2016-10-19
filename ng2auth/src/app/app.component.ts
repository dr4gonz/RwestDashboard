import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { FileService } from './file.service';

@Component({
  selector: 'app-component',
  templateUrl: 'app.component.html',
  styleUrls : ['app.component.css'],
  providers: [ FileService ]
})
export class AppComponent implements OnInit {

  title = 'R/West Angular2 Login Mockup';
  response: any;
  errorMessage: string;
  constructor(private authService: AuthService, private fileService: FileService) { }

  ngOnInit() { this.getUser(); }
  getUser() {
    this.fileService.userLogin().subscribe( res => this.response = res, error => this.errorMessage = <any>error);
  }
}
