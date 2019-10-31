import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { faCommentDots, faClock } from '@fortawesome/free-regular-svg-icons';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-task-tile',
  templateUrl: './task-tile.component.html',
  styleUrls: ['./task-tile.component.scss']
})

export class TaskTileComponent implements OnInit {

  @Input("task") task: any;

  projectUrl;
  projectId;
  checkedList = 0;
  tasks;
  users;

  faCommentDots = faCommentDots;
  faTasks = faTasks;
  faClock = faClock;


  constructor(private router: Router, private dataService: DataService, private nav : NavbarService) { }

  ngOnInit() {
    this.nav.show();
    this.projectUrl = this.router.url;
    this.projectId = this.projectUrl.split('/').pop(); // get last element of splited array => id from url

    this.dataService
      .getTasksByProject(this.projectId)
      .subscribe((data:any) => {
        // console.log(data);
        this.tasks = data;
  
        this.tasks.map(oneTask => {
          // console.log(oneTask)
          oneTask.checklist.map(el => { //for checklist
            el.done === true ? this.checkedList += 1 : this.checkedList += 0;
          });
        });
      });
  }
}
