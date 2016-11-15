import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../auth.service';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  private projects: FirebaseListObservable<Project[]>;
  private archivedProjects: FirebaseListObservable<Project[]>;
  private authService: AuthService;

  constructor(private aF: AngularFire, authService: AuthService) {
    this.projects = aF.database.list('projects');
    this.archivedProjects = aF.database.list('archivedProjects');
    this.authService = authService;
  }

  ngOnInit() {
  }

}
