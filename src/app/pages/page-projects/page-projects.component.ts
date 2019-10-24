import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Project } from 'src/app/models/projects.model';


@Component({
  selector: 'app-page-projects',
  templateUrl: './page-projects.component.html',
  styleUrls: ['./page-projects.component.scss']
})
export class PageProjectsComponent implements OnInit {

  projects: Project[];
  constructor(private _dataService: DataService) { }

  // SortUp & SortDown
  sortUp = '../../../assets/img/icons/arrowUp.png';
  sortDown = '../../../assets/img/icons/arrowDown.png';

  // Isvisible ?
  isShow = false;
  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  ngOnInit() {
    this._dataService
    .getProjects()
    .subscribe((data: Project[]) =>{
      this.projects = data['projects'];
      console.log(data);
    })

}
  }


