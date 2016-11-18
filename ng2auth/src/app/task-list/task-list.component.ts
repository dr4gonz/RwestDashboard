import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { ProjectService } from '../project.service';
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
  newTask(description: HTMLInputElement, date: HTMLInputElement) {
    console.log(moment(date.value).format());
    this.taskService.addTask(description.value, moment(date.value).format());
    this.newTaskToggle = false;
  }
  toggleNewTask() {
    this.newTaskToggle = true;
  }
}
