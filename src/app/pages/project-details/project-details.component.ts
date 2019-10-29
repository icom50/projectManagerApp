import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/projects.model';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private _dataService : DataService, private fb : FormBuilder, private router : Router) {
    this.formComment = this.fb.group({
      comment : new FormControl(null, [Validators.maxLength(400)])
    })
   }

  deleteProject(id)  {
     this._dataService.deleteProject(id).subscribe((data:Project)=>{
       this.project = data;
       this.router.navigate(['/home'])
     });
     setTimeout(()=>{
      alert('Project deleted');
     },1000)
      
   }

   addComment(){
     this.formComment.reset();
     
   }

  ngOnInit() {
    const id = "5db1853aa88e5d252bb4a749";
    this._dataService.getProjectById(id).subscribe((data : Project)=>{
      this.project = data['projects'];
      this.isPrivate = this.project.is_private  ? "the project is in private" : "The project is in public";
    })
  }
}
