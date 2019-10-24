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
  taskCollaborator;
  coucou;
  allTasks: {};

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

    // this.projectId = this.router.url.splice('')
    this.projectUrl = this.router.url;
    this.projectId = this.projectUrl.split('/').pop(); // get last element of splited array => id from url

    //TODO:créer une boucle pour aller récupérer tout les tasks (a faire dans l'autre doc)


      this.dataService
      .getTasksByProject(this.projectId)
      .subscribe((data: any) => {
        console.log(data);

        data.map(index => {

          this.taskTitle = index.name;
          this.taskPriority = index.priority;

          this.taskComment = index.comments;
          this.taskComment = this.taskComment.length;

          this.taskCollaborator = index.assigned;


          this.taskCollaborator.map(person => {
            console.log("collabo : " + person._id);
            this.coucou = person._id;
          });
        });
      });

      

      // this.dataService
      // .getUserById(this.coucou)
      // .subscribe((data:any) => {
      //   console.log("data collabo : "+data);
      // });
      
  }

}
