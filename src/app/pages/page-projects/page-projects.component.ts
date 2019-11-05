import { Component, OnInit, Input, Output } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Project } from 'src/app/models/projects.model';
import { NavbarService } from 'src/app/services/navbar.service';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-page-projects',
  templateUrl: './page-projects.component.html',
  styleUrls: ['./page-projects.component.scss']
})
export class PageProjectsComponent implements OnInit {

  sortUp = faSortUp;
  sortDown = faSortDown;

  isShow: boolean = true;
  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  //projects: Project[];
  //project: Project
  projectsUser: Project[];
  constructor(private _dataService: DataService, private nav: NavbarService) { }



  ngOnInit() {
    this.nav.show();
    const id = "5da98631e2dcd109d6ab35db";
    this._dataService.getProjectsByUser(id).subscribe(data =>{
      this.projectsUser = data;
      //console.log(this.projectsUser)
    })
  }
}


