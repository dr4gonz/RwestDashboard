import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  inputs: ['contentItem'],
  styleUrls: ['./content-detail.component.css']
})
export class ContentDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
