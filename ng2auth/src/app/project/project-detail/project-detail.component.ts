import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Project } from '../../models/project.model';
import { FileEntry } from '../../models/file-entry.model';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-project-detail',
  inputs: ['id'],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  private project: FirebaseObjectObservable<Project>;
  private fileEntries: FirebaseListObservable<FileEntry[]>;
  private id: string;
  private name: string;
  private prj: Project;
  private authService: AuthService;
  private newFile: boolean = false;
  private statusMessage: string = "";
  private selectedFile: FileEntry = null;

  constructor(private aF: AngularFire, private route: ActivatedRoute, private router: Router, authService: AuthService) {
    this.authService = authService;
    let id: string;
    this.route.params.forEach((params: Params) => {
      id = params['id'];
    });
    this.id = id;

    this.project = aF.database.object('/projects/' + this.id);
    this.fileEntries = aF.database.list('/fileEntries');
  }

  ngOnInit() {
  }

  showNewFileForm() {
    this.newFile = true;
  }

  uploadFile(fE) {
    let thisRef = this;
    fE.projectId = this.id;
    this.fileEntries.push(fE).then(function() {
      thisRef.statusMessage = "File uploaded successfully.";
      thisRef.newFile = false;
    }).catch(function(error) {
      thisRef.statusMessage = "Error saving file...";
      console.log("error:", error);
    });
  }

  hideUploadForm() {
    this.newFile = false;
  }

  selectFile(fE: FileEntry) {
    this.selectedFile = fE;
  }

  unselectFile() {
    this.selectedFile = null;
  }

}