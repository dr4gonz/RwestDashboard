import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.model';
import { Router } from '@angular/router';
import { FirebaseListObservable } from 'angularfire2';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  projects: FirebaseListObservable<Project[]>;

  constructor(private pService: ProjectService, private router: Router) {
    this.projects = pService.currentProjects();
  }

  ngOnInit() {
  }

  createProject(name: HTMLInputElement, dueDate: HTMLInputElement) {
    let newProject = new Project();
    newProject.name = name.value;
    newProject.dueDate = dueDate.value;
    newProject.archived = false;
    this.pService.newProject(newProject);
    name.value = "";
    dueDate.value = "";
    this.router.navigate(['/projects']);
  }

}
