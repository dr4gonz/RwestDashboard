import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'content-admin',
  inputs: ['contentItem'],
  templateUrl: './content-admin.component.html',
  styleUrls: ['./content-admin.component.css']
})
export class ContentAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
