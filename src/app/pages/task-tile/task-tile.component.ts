import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/projects.model';
import { Router } from '@angular/router'

@Component({
  selector: 'app-task-tile',
  templateUrl: './task-tile.component.html',
  styleUrls: ['./task-tile.component.scss']
})
export class TaskTileComponent implements OnInit {

  projectUrl;
  projectId;
  projectName;
  task;
  taskTitle;
  taskPriority;
  taskComment;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {

    // this.projectId = this.router.url.splice('')
    this.projectUrl = this.router.url;
    this.projectId = this.projectUrl.split('/').pop(); // get last element of splited array => id from url

    //TODO:créer une boucle pour aller récupérer tout les tasks (a faire dans l'autre doc)


    this.dataService
      .getProjectById(this.projectId)
      .subscribe((data:any) => {
        console.log(data);
        this.projectName = data.projects.name;
        this.task = data.projects.tasks[0];
        
        console.log(this.task);

        this.taskTitle = this.task.name;
        this.taskPriority = this.task.priority;
        this.taskComment = this.task.comments; // juste afficher s'il y en a ou pas

        console.log(this.taskTitle);

        // return this.task;
        //console.log(this.task.title)
    });
  
    
  }

}
