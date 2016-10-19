import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-behind-auth',
  templateUrl: './behind-auth.component.html',
  styleUrls: ['./behind-auth.component.css']
})
export class BehindAuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem('profile')));
    console.log((JSON.parse(localStorage.getItem('profile')).roles[0] == "admin"));
    console.log(JSON.parse(localStorage.getItem('profile')).roles[0])
  }

}
