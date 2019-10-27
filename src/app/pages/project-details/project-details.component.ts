import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/projects.model';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  project : Project;
  formComment : FormGroup
  commentValue: string;

  constructor(private _dataService : DataService, private fb : FormBuilder) {
    this.formComment = this.fb.group({
      comment : new FormControl(null, [Validators.maxLength(400)])
    })
   }

   addComment(){
     console.log('polo');
     this.formComment.reset();
     
   }


  ngOnInit() {
    const id = "5daec4f318f7f705f803cbe8";
    this._dataService.getProjectById(id).subscribe((data : Project)=>{
      this.project = data['projects'];
      console.log(this.project)
    })
  }

}
