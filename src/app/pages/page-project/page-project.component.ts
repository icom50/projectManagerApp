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
  comments;
  priority;
  tasks: string[];

  constructor(private router: Router, private dataService: DataService) { }

  priorityColor(priority) {
    switch(priority) {
      case 'high' :
        return 'red';
      case 'middle' :
        return 'orange';
      case 'low' :
        return "green"
      default :
        return 'grey';
    }
  }

  ngOnInit() {

    this.projectUrl = this.router.url;
    this.projectId = this.projectUrl.split('/').pop(); // get last element of splited array => id from url

    //get name of the project
    this.dataService
      .getProjectById(this.projectId)
      .subscribe((data:any) => {
        this.projectName = data.projects.name;
    });


    this.dataService
      .getTasksByProject(this.projectId)
      .subscribe((data:any) => {
        // console.log(data);
        this.tasks = data;
        // this.taskPriority = this.tasks.priority;
        console.log(this.tasks);
      });

  }

}
