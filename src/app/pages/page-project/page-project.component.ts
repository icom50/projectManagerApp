import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { NavbarService } from 'src/app/services/navbar.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Task } from 'src/app/models/projects.model';


@Component({
  selector: 'app-page-project',
  templateUrl: './page-project.component.html',
  styleUrls: ['./page-project.component.scss']
})

export class PageProjectComponent implements OnInit {

  projects;
  projectUrl;
  // project_id;
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
  
  todoArray: String[];
  doingArray: String[];
  doneArray: String[];
  pausedArray: String[];

  project_id;
  // task_id;
  // user_id = "5da98b33867e3d0a5e31c9d9";

  isHidden = true;


  constructor(
    private router: Router, 
    private dataService: DataService, 
    private nav : NavbarService
    ) { }


  drop(event: CdkDragDrop<string[]>) {

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

      // console.log("target column : " + this.targetId.id);
      switch(this.targetId.id) {

        case 'cdk-drop-list-0' :

          this.targetData.map(tile => {
            if(tile.status != 'todo') {
              tile.status = 'todo';
              this.dataService.putTaskByProject(this.project_id, tile);
            } 
          })
          break;

        case 'cdk-drop-list-1' :

          this.targetData.map(tile => {
            if(tile.status != 'doing') {
              tile.status = 'doing';
              this.dataService.putTaskByProject(this.project_id, tile);
            } 
          })
          break;

        case 'cdk-drop-list-2' :

          this.targetData.map(tile => {
            if(tile.status != 'done') {
              tile.status = 'done';
              this.dataService.putTaskByProject(this.project_id, tile);
            } 
          })
          break;

        case 'cdk-drop-list-3' :

          this.targetData.map(tile => {
            if(tile.status != 'paused') {
              tile.status = 'paused';
              this.dataService.putTaskByProject(this.project_id, tile);
            } 
          })
          break;
        
      }
    }
  }

  ngOnInit() {
    this.nav.show();
    this.projectUrl = this.router.url;
    this.project_id = this.projectUrl.split('/').pop(); // get last element of splited array => id from url

    //get name of the project
    this.dataService
      .getProjectById(this.project_id)
      .subscribe((data:any) => {
        this.projects = data.projects;
        // console.log(this.projects);

        this.users = this.projects.users;
        // console.log(this.users)
    });

    this.dataService
      .getTasksByProject(this.project_id)
      .subscribe((data:any) => {
        // console.log(data);
        this.tasks = data;
  
        this.tasks.map(oneTask => {
          // console.log(oneTask)
          oneTask.checklist.map(el => { //for checklist
            el.done === true ? this.checkedList += 1 : this.checkedList += 0;
          });

          //filter by status of task
          // console.log(oneTask.status);
          this.taskStatus = oneTask.status;

          //convert to array
          this.todoArray = this.todoArray || [];
          this.doingArray = this.doingArray || [];
          this.doneArray = this.doneArray || [];
          this.pausedArray = this.pausedArray || [];

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
