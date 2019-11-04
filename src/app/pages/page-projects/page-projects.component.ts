import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Project } from 'src/app/models/projects.model';
import { NavbarService } from 'src/app/services/navbar.service';
import { User } from 'src/app/models/users.model';



@Component({
  selector: 'app-page-projects',
  templateUrl: './page-projects.component.html',
  styleUrls: ['./page-projects.component.scss']
})
export class PageProjectsComponent implements OnInit {


  projects: Project[];
  project: Project
  user: User;
  constructor(private _dataService: DataService, private nav: NavbarService) { }



  ngOnInit() {
    this.nav.show();
    const id = "5da98631e2dcd109d6ab35db";

    this._dataService.getUserById(id).subscribe((data:User)=>{
      this.user = data['users'];
      console.log(this.user)
    })
  }
}


