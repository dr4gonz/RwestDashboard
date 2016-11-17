import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../project.service';
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
  // upcomingEvents: FirebaseListObservable<CalEvent[]>;

  constructor(private pService: ProjectService) { }

  ngOnInit() {
    // let pKey: string = this.project.$key;
    this.recentFiles = this.pService.recentFiles(this.project.$key);

    // this.upcomingEvents = this.pService.upcomingEve

  }

}
