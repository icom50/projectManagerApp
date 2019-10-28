import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-page-project',
  templateUrl: './page-project.component.html',
  styleUrls: ['./page-project.component.scss']
})
export class PageProjectComponent implements OnInit {

  projects;
  projectUrl;
  projectId;
  comments;
  priority;
  tasks: string[];
  todo;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {

    this.projectUrl = this.router.url;
    this.projectId = this.projectUrl.split('/').pop(); // get last element of splited array => id from url

    //get name of the project
    this.dataService
      .getProjectById(this.projectId)
      .subscribe((data:any) => {
        this.projects = data;
        console.log(this.projects);
        // console.log(data.projects.status)
        data.projects.status === 'todo' || data.projects.status === 'created' ? this.todo = true : this.todo = false; 
        // console.log(this.todo)
    });

    // this.projects.map((users: string[]) => {
    //   console.log(users)
    //   // console.log(this.projects.projects.user_id);
    // });

    // this.dataService  
    //   .getUserById(this.projects.projects.user_id)
    //   .subscribe((data:any) => {
    //     console.log(data);
    //   })


    this.dataService
      .getTasksByProject(this.projectId)
      .subscribe((data:any) => {
        // console.log(data);
        this.tasks = data;
        // this.taskPriority = this.tasks.priority;
        // console.log(this.tasks);
      });

  }
}
