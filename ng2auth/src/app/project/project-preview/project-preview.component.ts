import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Project } from '../../models/project.model';
import { FileEntry } from '../../models/file-entry.model';
import { CalEvent } from '../../models/calevent.model';

@Component({
  selector: 'app-project-preview',
  inputs: ['project'],
  templateUrl: './project-preview.component.html',
  styleUrls: ['./project-preview.component.css']
})
export class ProjectPreviewComponent implements OnInit {

  private project: Project;
  recentFiles: FirebaseListObservable<FileEntry[]>;
  upcomingEvents: FirebaseListObservable<CalEvent[]>;

  constructor(private aF: AngularFire) {
  }

  ngOnInit() {
    let pKey: string = this.project.$key;
    this.recentFiles = this.aF.database.list('/fileEntries', {
      query: {
        orderByChild: 'projectId',
        equalTo: pKey,
        limitToLast: 4
      }
    });

    this.upcomingEvents = this.aF.database.list('/events', {
      query: {
        orderByChild: 'projectId',
        equalTo: pKey,
        limitToLast: 4
      }
    });

  }

}
