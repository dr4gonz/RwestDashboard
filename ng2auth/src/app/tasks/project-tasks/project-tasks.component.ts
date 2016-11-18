import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.model';
import { FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-project-tasks',
  inputs: ['projects'],
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.css']
})
export class ProjectTasksComponent implements OnInit {
  projects;
  constructor() { }

  ngOnInit() {
  }


}
