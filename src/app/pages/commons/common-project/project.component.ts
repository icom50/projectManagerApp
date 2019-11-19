import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Project } from 'src/app/models/projects.model';
import { TestBed } from '@angular/core/testing';
import { ProjectsDataService } from 'src/app/services/projects-data.service';
import { ProjectDetailsComponent } from '../../project-details/project-details.component';
import { MatDialog } from '@angular/material/dialog';
import { FormEditProjectComponent } from '../../forms/form-edit-project/form-edit-project.component';



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
  user_id = "5dd3b3277576670bf8387f43";
  user;
  //project_id: Project;

  @Input() project_id: string;

  toggleIsSelected() {
    event.stopPropagation();
    this.isSelected = !this.isSelected;

    this.user.projects.filter(project => {
      if (project._id === this.project._id) project.favorite = this.isSelected
    })
    this._dataService.putUser(this.user).subscribe(data => data)
    //console.log(this.user)

  }

  deleteProject() {
    event.stopPropagation();
    if (confirm("Are you sur to delete this project")) {
      console.log('project deleted')
      this._dataService.deleteProject(this.project_id).subscribe(data => this.projectsData.removeProject(this.project_id));
    }
    else {
      console.log('project not deleted')
    }


  }

  constructor(
    private _dataService: DataService,
    private dialog: MatDialog,
    public projectsData: ProjectsDataService
  ) { }

  openPopupDetails() {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ProjectDetailsComponent, {
      width: '1000px',
      data: {
        project_id: this.project_id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('popup closed');
    })
  }

  openPopupEdit() {
    event.stopPropagation();
    const dialogRef = this.dialog.open(FormEditProjectComponent, {
      width: '1000px',
      data: {
        project_id: this.project_id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('popup closed');
    })
  }

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
