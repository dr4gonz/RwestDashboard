import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.model';
import { Task } from '../../models/task.model';
import { ProjectService } from '../../services/project.service';
import { FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-project-tasks-list-item',
  inputs: ['project'],
  templateUrl: './project-tasks-list-item.component.html',
  styleUrls: ['./project-tasks-list-item.component.css']
})
export class ProjectTasksListItemComponent implements OnInit {
  project;
  tasks: FirebaseListObservable<Task[]>;
  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.tasks = this.getTasks(this.project.$key);
  }
  getTasks(id: string) {
    return this.projectService.projectTasks(id);
  }
}
