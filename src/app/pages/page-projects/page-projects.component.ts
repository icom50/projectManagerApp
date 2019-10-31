import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Project } from 'src/app/models/projects.model';
import { NavbarService } from 'src/app/services/navbar.service';



@Component({
  selector: 'app-page-projects',
  templateUrl: './page-projects.component.html',
  styleUrls: ['./page-projects.component.scss']
})
export class PageProjectsComponent implements OnInit {


  projects: Project[];
  constructor(private _dataService: DataService, private nav: NavbarService) { }



  ngOnInit() {
    this.nav.show();
    this._dataService
    .getProjects()
    .subscribe((data: Project[]) =>{
      this.projects = data['projects'];
      //console.log(this.projects);
    })

  }
}


