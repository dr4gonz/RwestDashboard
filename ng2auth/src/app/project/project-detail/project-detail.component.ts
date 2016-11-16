import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Project } from '../../models/project.model';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-project-detail',
  inputs: ['id'],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  private project: FirebaseObjectObservable<Project>;
  private id: string;
  private name: string;
  private prj: Project;

  constructor(private aF: AngularFire, private route: ActivatedRoute, private router: Router) {
    let id: string;
    this.route.params.forEach((params: Params) => {
      id = params['id'];
    });
    this.id = id;
    console.log(this.id);
    this.project = aF.database.object('/projects/' + this.id);
    console.log(this.project);
  }

  ngOnInit() {
  }

}
