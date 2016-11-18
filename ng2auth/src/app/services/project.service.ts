import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Project } from '../models/project.model';
import { FileEntry } from '../models/file-entry.model';
import { Task } from '../models/task.model';

@Injectable()
export class ProjectService {

  constructor(private aF: AngularFire) { }

  currentProjects(): FirebaseListObservable<Project[]> {
    return this.aF.database.list('/projects', {
      query: {
        orderByChild: 'archived',
        equalTo: false
      }
    });
  }

  archivedProjects(): FirebaseListObservable<Project[]> {
    return this.aF.database.list('/projects', {
      query: {
        orderByChild: 'archived',
        equalTo: true
      }
    });
  }

  findProject(id: string): FirebaseObjectObservable<Project> {
    return this.aF.database.object('/projects/' + id);
  }

  projectFiles(id: string): FirebaseListObservable<FileEntry[]> {
    return this.aF.database.list('/fileEntries', {
      query: {
        orderByChild: 'projectId',
        equalTo: id
      }
    });
  }

  projectTasks(id: string): FirebaseListObservable<Task[]> {
    return this.aF.database.list('/tasks', {
      query: {
        orderByChild: 'projectId',
        equalTo: id
      }
    });
  }

  recentFiles(id: string): FirebaseListObservable<FileEntry[]> {
    return this.aF.database.list('/fileEntries', {
      query: {
        orderByChild: 'projectId',
        equalTo: id,
        limitToLast: 4
      }
    });
  }

  newProject(proj: Project) {
    this.currentProjects().push(proj);
  }

  archiveProject(proj: FirebaseObjectObservable<Project>) {
    proj.update( {archived: true} );
  }

  unarchiveProject(proj: FirebaseObjectObservable<Project>) {
    console.log("*********************", proj);
    proj.update( {archived: false} );
  }

}
