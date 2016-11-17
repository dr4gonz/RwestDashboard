import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Task } from './models/task.model';
import * as moment from 'moment';

@Injectable()
export class TaskService {

  constructor(private af: AngularFire) { }

  getTasks() {
    let taskList = this.af.database.list('/tasks');
    return taskList;
  }
  addTask(description: string, date: string) {
    let newTask = new Task(description, date);
    let ref = this.af.database.list('/tasks');
    ref.push(newTask);
  }
  deleteTask(){

  }
  editTask() {

  }

}
