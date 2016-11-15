import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  projects: FirebaseListObservable<Project[]>;

  constructor(private aF: AngularFire) {
    this.projects = this.aF.database.list('/projects');
  }

  ngOnInit() {
  }

  createProject(name: HTMLInputElement, dueDate: HTMLInputElement) {
    let newProject = new Project();
    newProject.name = name.value;
    newProject.dueDate = dueDate.value;
    this.projects.push(newProject);
    name.value = "";
    dueDate.value = "";
    // next: redirect to project detail page
  }

}
