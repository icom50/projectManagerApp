import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/projects.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DataService } from '../../../services/data.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-create-project',
  templateUrl: './form-create-project.component.html',
  styleUrls: ['./form-create-project.component.scss']
})
export class FormCreateProjectComponent implements OnInit {

  project : Project
  formCreateProject : FormGroup

  constructor(private dataService : DataService, private router : Router ) { }

  CreateProject(){
    this.project = this.formCreateProject.value;
    this.dataService.postProject(this.project).subscribe((data:Project)=>{
      this.project = data;
      this.router.navigate(['/projects/:id']);
    })
  }

  getErrorMessage(field: string):string{
    const errors = {
      required : "this field is required",
      maxLength : "This field cannot contain data"
    };
    let returnValue;
    Object.keys(this.formCreateProject.controls[field].errors).map(key =>{
      returnValue += errors[key];
    })
    return returnValue;
  }

  ngOnInit() {
    this.formCreateProject = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      description : new FormControl(null,Validators.maxLength(500) ),
      author_id : new FormControl(null, []),
      start_date : new FormControl(null,[])
    })
  }

}
