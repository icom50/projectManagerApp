import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/projects.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-edit-project',
  templateUrl: './form-edit-project.component.html',
  styleUrls: ['./form-edit-project.component.scss']
})
export class FormEditProjectComponent implements OnInit {

  project : Project;
  editProject : FormGroup;

  constructor(private _dataService : DataService, private router : Router, private fb : FormBuilder, private route : ActivatedRoute) {

   }

   get f() { return this.editProject.controls; }

   getErrorMessage(field:string): string {
     const errors = {
      required : 'this field is required'
     }
     let returnValue ='';
    Object.keys(this.editProject.controls[field].errors).map(key=>{
      returnValue += `${errors[key]}`;
    })
    return returnValue;
   }

   onSubmit(){
    console.log(this.project)
    this.project = this.editProject.value;
    console.log(this.project)
    this._dataService.putProject(this.project).subscribe((data : Project) => {
      this.project = data;
      //this.router.navigate([`project/details/${this.project['project']._id}/edit`]);
    })
   }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this._dataService.getProjectById(id).subscribe((data : Project)=>{
      this.project = data['projects'];
      console.log(this.project)
    })
    this.editProject = new FormGroup({
      name: new FormControl(),
      description: new FormControl(''),
      git: new FormControl(),
      color: new FormControl(),
      author_id: new FormControl(),
      creation_date: new FormControl(),
      start_date: new FormControl(),
      finish_date: new FormControl(null, [Validators.required]),
      deadline: new FormControl(null, [Validators.maxLength(20)]),
      status: new FormControl(null, [Validators.maxLength(50)]),
      users:new FormControl([]),
      comments: new FormControl([]),
      attachments: new FormControl(),
      ressources: new FormControl([]),
      tasks: new FormControl([]),
      _id: new FormControl(),
      is_private: new FormControl()
    });

    
  }
  
}

