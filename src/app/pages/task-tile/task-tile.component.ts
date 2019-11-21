import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { faCommentDots, faClock } from '@fortawesome/free-regular-svg-icons';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { NavbarService } from 'src/app/services/navbar.service';
import { MatDialog } from '@angular/material/dialog';
import { FormEditTaskComponent } from '../forms/form-edit-task/form-edit-task.component';

@Component({
  selector: 'app-task-tile',
  templateUrl: './task-tile.component.html',
  styleUrls: ['./task-tile.component.scss']
})

export class TaskTileComponent implements OnInit {

  @Input("task") task: any;
  @Input() id: string;

  projectUrl;
  checkedList = 0;
  tasks;
  users;
  tempUser= [];
  tempAvatar = [];

  project_id;
  task_id;
  user_id = "5da98b33867e3d0a5e31c9d9";

  faCommentDots = faCommentDots;
  faTasks = faTasks;
  faClock = faClock;

  constructor(  
    private router: Router, 
    private dataService: DataService, 
    private nav : NavbarService, 
    private dialog : MatDialog
  ) {}

  openPopup(id){
    this.task_id = id;
    const dialogRef = this.dialog.open(FormEditTaskComponent,{
      width : '1000px',
      data : {
        task_id : this.task_id,
        project_id : this.project_id
      }
    });
  }

  ngOnInit() {

    this.projectUrl = this.router.url;
    this.project_id = this.projectUrl.split('/').pop(); // get last element of splited array => id from url

    this.dataService
    .getTasksByProject(this.project_id)
    .subscribe((data:any) => {
      this.tasks = data; // get the object task

      this.tasks.map(oneTask => { //loop on each task

        oneTask.checklist.map(el => { //for checklist
          el.done === true ? this.checkedList += 1 : this.checkedList += 0;
        });
        });

    });

    this.dataService
    .getTaskById(this.project_id, this.id)
    .subscribe((data:any) => {

      data.assigned.map(personOnProject => {

        let taskId = personOnProject.user_id;
        
        this.dataService
        .getUserById(taskId)
        .subscribe(user => {
          //errors because some users don't exists in the database
          this.tempAvatar.push(user['users'].avatar_url);
          return this.tempAvatar;
        });
      });
    });
  }
}
