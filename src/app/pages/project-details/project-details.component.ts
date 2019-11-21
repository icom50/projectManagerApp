import { Component, OnInit, Inject } from '@angular/core';
import { Project } from 'src/app/models/projects.model';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavbarService } from 'src/app/services/navbar.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectsDataService } from 'src/app/services/projects-data.service';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  project : Project;
  isPrivate: String;
  formComment : FormGroup;
  commentValue: string;
  faPlus = faPlus;

  constructor(private _dataService : DataService, 
    private fb : FormBuilder, 
    private nav : NavbarService,  
    public dialogRef: MatDialogRef<ProjectDetailsComponent>, 
    @Inject(MAT_DIALOG_DATA) 
    public data: any,
    public _projectData : ProjectsDataService
    ) {
    this.formComment = this.fb.group({
      comment : new FormControl(null, [Validators.maxLength(400)])
    })
   }

  deleteProject()  {
    {
      if (confirm("Are you sur to delete this project")) {
        console.log('project deleted')
        this._dataService.deleteProject(this.data.project_id).subscribe();
      }
      else {
        console.log('project not deleted')
      }
    }
      
   }

  addMembers(){
    console.log("Coucou");
  }

  ngOnInit() {
    this._dataService.getProjectById(this.data.project_id).subscribe((data : Project)=>{
      this.project = data['projects'];
      this.isPrivate = this.project.is_private  ? "the project is in private" : "The project is in public";
    })
  }
}
