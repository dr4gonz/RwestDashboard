import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseApp, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FileEntry } from '../models/file-entry.model';

@Injectable()
export class FileService {

  private storageRef: any;

  constructor(@Inject(FirebaseApp) firebase: any, private aF: AngularFire) {
    this.storageRef = firebase.storage().ref();
  }

  getFileEntries(projectId: string): FirebaseListObservable<FileEntry[]> {
    return this.aF.database.list('/fileEntries', {
      query: {
        orderByChild: 'projectId',
        equalTo: projectId
      }
    });
  }

  getAllFiles(): FirebaseListObservable<FileEntry[]> {
    return this.aF.database.list('/fileEntries');
  }

  getFileEntry(id: string): FirebaseObjectObservable<FileEntry> {
    return this.aF.database.object('/fileEntries/' + id);
  }


  saveFileEntry(file: any, newFileEntry: FileEntry) {
    let thisRef = this;
    this.storageRef.child(file.name).put(file).then(function() {
      thisRef.getAllFiles().push(newFileEntry);
    });
  }

  removeFileEntry(id: string) {
    this.aF.database.list('/fileEntries').remove(id);
  }

}
