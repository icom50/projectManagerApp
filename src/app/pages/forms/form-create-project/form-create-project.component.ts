import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/projects.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DataService } from '../../../services/data.service'
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-form-create-project',
  templateUrl: './form-create-project.component.html',
  styleUrls: ['./form-create-project.component.scss']
})
export class FormCreateProjectComponent implements OnInit {

  project : Project
  formCreateProject : FormGroup

  constructor(private dataService : DataService, private router : Router, private nav: NavbarService ) { }

  CreateProject(){
    //console.log(this.formCreateProject.value)
    this.project = this.formCreateProject.value;
    this.dataService.postProject(this.project).subscribe((data:Project)=>{
      this.project = data["projects"];
      this.router.navigate([`/project/${this.project._id}`]);
    })
  }

  getErrorMessage(field: string):string{
    const errors = {
      required : "this field is required",
      maxlength : "This field cannot contain more data"
    };
    let returnValue;
    Object.keys(this.formCreateProject.controls[field].errors).map(key =>{
      returnValue += errors[key];
    })
    return returnValue;
  }

  ngOnInit() {
    this.nav.show()
    this.formCreateProject = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      description : new FormControl(null,[Validators.maxLength(500)]),
      author_id : new FormControl(null, [Validators.required]),
      start_date : new FormControl(null,[]),
      deadline : new FormControl(null,[])
    })
  }
}
