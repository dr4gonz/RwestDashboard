import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';
import { FirebaseListObservable } from 'angularfire2';
import { Task } from '../models/task.model';
import { Project } from '../models/project.model';
import * as moment from 'moment';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: FirebaseListObservable<Task[]>;
  newTaskToggle: boolean = false;
  projects: FirebaseListObservable<Project[]>;

  constructor(private taskService: TaskService, private projectService: ProjectService) { }

  ngOnInit() {
    this.getTasks();
    this.getProjects();
    this.newTaskToggle = false;
  }

  getTasks() {
    this.tasks = this.taskService.getTasks();
  }

  getProjects() {
    this.projects = this.projectService.currentProjects();
  }

  toggleNewTask() {
    this.newTaskToggle = true;
  }
}
