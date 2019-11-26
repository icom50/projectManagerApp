import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { User } from 'src/app/models/users.model';
import { Task } from 'src/app/models/projects.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-page-task-list',
  templateUrl: './page-task-list.component.html',
  styleUrls: ['./page-task-list.component.scss']
})
export class PageTaskListComponent implements OnInit {
  user: User;
  tasks: Task[];

  constructor(private nav: NavbarService, private _dataService: DataService) { }

  ngOnInit() {
    this.nav.show();
    //const id = '5da987981a158f09eb249ceb';
    const id = localStorage.getItem('current_user');


    this._dataService.getUserById(id).subscribe((data:User)=>{
      this.user = data['users'];
      this._dataService.getTasksByUser(id)
    .subscribe((data: Task[]) => {
      this.tasks = data;
      //console.log(this.tasks)
    });
    });
  }

}
