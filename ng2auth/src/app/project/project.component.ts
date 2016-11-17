import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { ProjectService } from '../project.service';
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

  constructor(authService: AuthService, private pService: ProjectService) {
    this.projects = pService.currentProjects();
    this.archivedProjects = pService.archivedProjects();
    this.authService = authService;
  }

  ngOnInit() {
  }

}
