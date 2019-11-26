import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from 'src/app/models/projects.model';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { FormCreateTaskComponent } from '../forms/form-create-task/form-create-task.component';
import { FormEditTaskComponent } from '../forms/form-edit-task/form-edit-task.component';


@Component({
  selector: 'app-page-project',
  templateUrl: './page-project.component.html',
  styleUrls: ['./page-project.component.scss']
})

export class PageProjectComponent implements OnInit {

  projects;
  projectUrl;
  project_id;
  comments;
  priority;
  tasks;
  users;
  checkedList = 0;
  taskStatus;
  targetId;
  task: Task = {}
  task_id;
  targetData;
  tileStatus: String;
  myTasks = false;

  todoArray: String[];
  doingArray: String[];
  doneArray: String[];
  pausedArray: String[];

  current_user = localStorage.getItem('current_user');
  faPlus = faPlus;

  constructor(
    private router: Router,
    private dataService: DataService,
    private nav: NavbarService,
    private dialog: MatDialog,
  ) { }


  drop(event: CdkDragDrop<string[]>) { // do smth when tile is dropped

    console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      this.targetId = event.container._dropListRef.element;
      this.targetData = event.container.data;
      switch (this.targetId.id) {

        case 'cdk-drop-list-0':
          this.tileStatus = 'todo';
          break;

        case 'cdk-drop-list-1':
          this.tileStatus = 'doing';
          break;

        case 'cdk-drop-list-2':
          this.tileStatus = 'done';
          break;

        case 'cdk-drop-list-3':
          this.tileStatus = 'paused';
          break;
      }

      this.targetData.map(tile => { // modify db when a tile is moved
        if (tile.status != this.tileStatus) {
          tile.status = this.tileStatus;
          this.dataService.putTaskByProject(this.project_id, tile);
        }
      })
    }
  }

  openPopup() {
    const dialogRef = this.dialog.open(FormCreateTaskComponent, {
      width: '300px',
      data: {
        project_id: this.project_id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.filter();
    })
  }

  openPopupup(id){
    this.task_id = id;
    const dialogRef = this.dialog.open(FormEditTaskComponent,{
      width : '1000px',
      data : {
        task_id : this.task_id,
        project_id : this.project_id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.filter();
    })
  }

  

  onlyMyTasks() {
    this.myTasks = true;
    this.filter();
  }

  allTasks() {
    this.myTasks = false;
    this.filter();
  }

  filter() {

    console.log('filter')

    this.todoArray = [];
    this.doingArray = [];
    this.doneArray = [];
    this.pausedArray = [];

    if(this.myTasks) {
      this.dataService
      .getTasksByUser(this.current_user)
      .subscribe((data:any) => {
        // console.log(data);

        this.tasks = data;

        this.tasks.map(oneTask => {
          oneTask.checklist.map(el => { //for checklist
            el.done === true ? this.checkedList += 1 : this.checkedList += 0;
          });

          //filter by status of task
          this.taskStatus = oneTask.status;

          switch(this.taskStatus) {
            case 'todo' :
              this.todoArray.push(oneTask);
              break;
            case 'doing' :
              this.doingArray.push(oneTask);
              break;
            case 'done' :
              this.doneArray.push(oneTask);
              break;
            case 'paused' :
              this.pausedArray.push(oneTask);
              break;
          }
        });
      });

    } else {

      this.dataService
      .getTasksByProject(this.project_id)
      .subscribe((data:any) => {
        this.tasks = data;

        this.tasks.map(oneTask => {
          oneTask.checklist.map(el => { //for checklist
            el.done === true ? this.checkedList += 1 : this.checkedList += 0;
          });

          //filter by status of task
          this.taskStatus = oneTask.status;

          switch(this.taskStatus) {
            case 'todo' :
              this.todoArray.push(oneTask);
              break;
            case 'doing' :
              this.doingArray.push(oneTask);
              break;
            case 'done' :
              this.doneArray.push(oneTask);
              break;
            case 'paused' :
              this.pausedArray.push(oneTask);
              break;
          }
        });
      });
    }
  }

  ngOnInit() {
    this.nav.show();
    this.projectUrl = this.router.url;
    this.project_id = this.projectUrl.split('/').pop(); // get last element of splited array => id from url

    //get name of the project
    this.dataService
      .getProjectById(this.project_id)
      .subscribe((data: any) => {
        this.projects = data.projects;
        this.users = this.projects.users;

        this.dataService.setProject(this.projects);
      });

    this.filter();
  }
}