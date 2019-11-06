import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/models/users.model';
import { Task } from 'src/app/models/projects.model';


@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {
  user : User;
  tasks : Task[];

  constructor(private nav : NavbarService, private _dataService : DataService) { }

  ngOnInit() {
    this.nav.show();
    const id = "5da98631e2dcd109d6ab35db";

    this._dataService.getUserById(id).subscribe((data:User)=>{
      this.user = data['users'];
      //console.log(this.user['projects'][0].favorite)
      this._dataService.getTasksByUser(id)
    .subscribe((data: Task[])=>{
      this.tasks = data;
      //console.log(this.tasks);
    })
    })
  }
}
