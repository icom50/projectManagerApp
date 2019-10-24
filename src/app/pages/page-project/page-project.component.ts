import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-page-project',
  templateUrl: './page-project.component.html',
  styleUrls: ['./page-project.component.scss']
})
export class PageProjectComponent implements OnInit {

  projectUrl;
  projectId;
  projectName;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {

    this.projectUrl = this.router.url;
    this.projectId = this.projectUrl.split('/').pop(); // get last element of splited array => id from url

    //get name of the project
    this.dataService
      .getProjectById(this.projectId)
      .subscribe((data:any) => {
        this.projectName = data.projects.name;
    });
  }

}
