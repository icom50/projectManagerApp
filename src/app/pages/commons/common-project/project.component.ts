import { Component, OnInit, Output, Input } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Project } from 'src/app/models/projects.model';
import { TestBed } from '@angular/core/testing';
import { ProjectsDataService } from 'src/app/services/projects-data.service';



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {



  isSelected: boolean = false;
  isVisible: boolean = false;

  favNotSelected = '../../../../assets/img/icons/favorite-notSelected.svg';
  favSelected = '../../../../assets/img/icons/favorite-selected.svg';

  projects: Project[];
  project: Project;
  status: string;
  user_id = "5da98631e2dcd109d6ab35db";
  user;
  //project_id: Project;

  @Input() project_id: string;

  toggleIsSelected(){
    this.isSelected = !this.isSelected;

    this.user.projects.filter(project => {
      if (project._id === this.project._id) project.favorite = this.isSelected
    })
    this._dataService.putUser(this.user).subscribe(data=>data)
    //console.log(this.user)

  }

  deleteProject(){
    
      this._dataService.deleteProject(this.project_id).subscribe(data => this.projectsData.refreshProject(this.project_id));
  }

  constructor(private _dataService: DataService, public projectsData: ProjectsDataService) { }

  ngOnInit() {
    this._dataService
      .getProjectById(this.project_id)
      .subscribe((data: Project) => {
        this.project = data['projects'];
        //console.log(this.project.color);
        this._dataService.getUserById(this.user_id).subscribe(data => {
          this.user = data['users']
          this.user.projects.filter(project => {
            if (project._id === this.project._id) this.isSelected = project.favorite || false
          })
        })
      })
    
  }

}
