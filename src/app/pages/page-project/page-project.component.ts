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
  tasks;
  todo;
  users;
  checkedList = 0;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {

    this.projectUrl = this.router.url;
    this.projectId = this.projectUrl.split('/').pop(); // get last element of splited array => id from url

    //get name of the project
    this.dataService
      .getProjectById(this.projectId)
      .subscribe((data:any) => {
        this.projects = data.projects;
        console.log(this.projects);
        // console.log(data.projects.status)
        data.projects.status === 'todo' || data.projects.status === 'created' ? this.todo = true : this.todo = false;
        // TODO: adapter la ternaire pour les autres cas de figure (ou l'enlever, a voir) 
        this.users = this.projects.users;
        console.log(this.users)
        // console.log(this.todo)
    });

    this.dataService
      .getTasksByProject(this.projectId)
      .subscribe((data:any) => {
        // console.log(data);
        this.tasks = data;
  
        this.tasks.map(oneTask => {
          oneTask.checklist.map(el => {
            el.done === true ? this.checkedList += 1 : this.checkedList += 0;
          });
          // console.log("Total done : " + this.checkedList);
        });
      });
  }
}
