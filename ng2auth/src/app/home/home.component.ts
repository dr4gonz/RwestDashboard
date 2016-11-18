import { Component, OnInit } from '@angular/core';
import { FirebaseAuth, FirebaseListObservable } from 'angularfire2';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private recentProjects: FirebaseListObservable<Project[]>;

  constructor(private auth: FirebaseAuth, private pService: ProjectService) {
    this.recentProjects = pService.recentProjects();
  }

  ngOnInit() {
  }

}
