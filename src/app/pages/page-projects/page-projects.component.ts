import { Component, OnInit, Input, Output } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Project } from 'src/app/models/projects.model';
import { NavbarService } from 'src/app/services/navbar.service';
import { ProjectsDataService } from 'src/app/services/projects-data.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-page-projects',
  templateUrl: './page-projects.component.html',
  styleUrls: ['./page-projects.component.scss']
})
export class PageProjectsComponent implements OnInit {
  current_user = "5dd3b3277576670bf8387f43";
 
  title;

  isShow: boolean = true;
  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  projectsUser;
  constructor(private _dataService: DataService, private nav: NavbarService, public projectsData: ProjectsDataService, private route : Router) { 
    this.current_user = "5dd3b3277576670bf8387f43";
  }

  router(id){
    event.stopPropagation();
    this.route.navigate(['/project/'+id])
  }

  ngOnInit() {
    this.nav.show();
    //const id = "5dd3b3277576670bf8387f43";
  }
}


