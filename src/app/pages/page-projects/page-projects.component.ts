import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Project } from 'src/app/models/projects.model';



@Component({
  selector: 'app-page-projects',
  templateUrl: './page-projects.component.html',
  styleUrls: ['./page-projects.component.scss']
})
export class PageProjectsComponent implements OnInit {


  projects: Project[];
  status: string;

  constructor(private _dataService: DataService) { }



  ngOnInit() {
    this._dataService
    .getProjects()
    .subscribe((data: Project[]) =>{
      this.projects = data['projects'];
      //console.log(this.projects);
    })

  }
}


