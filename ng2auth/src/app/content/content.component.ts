import { Component, OnInit } from '@angular/core';
import { ContentItem } from '../content-item';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  content: FirebaseListObservable<ContentItem[]>;
  constructor(af: AngularFire) {
    this.content = af.database.list('/contentItems');
    console.log(this.content);
  }

  ngOnInit() {
  }

}
