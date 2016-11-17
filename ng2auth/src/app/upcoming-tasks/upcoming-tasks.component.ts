import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-upcoming-tasks',
  inputs: ['tasks'],
  templateUrl: './upcoming-tasks.component.html',
  styleUrls: ['./upcoming-tasks.component.css']
})

export class UpcomingTasksComponent implements OnInit {
  tasks;
  constructor() { }

  ngOnInit() {
  }

}
