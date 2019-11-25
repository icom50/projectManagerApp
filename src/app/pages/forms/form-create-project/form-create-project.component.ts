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
    this.project = this.formCreateProject.value;
    this.dataService.postProject(this.project).subscribe((data:Project)=>{
      this.project = data["projects"];
      this.dataService.getUserById(this.project.author_id).subscribe(user => {
        user['users'].projects.push({project_id : this.project._id, accepted : true, invitedBy : user['users']._id, tasks : []})
        this.dataService.putUser(user['users']).subscribe()
      })
      // if (this.project.users) this.project.users.map(data => this.dataService.addProjectToUser(this.project, data))
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
    const id = localStorage.getItem('current_user');
    this.formCreateProject = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      description : new FormControl(null,[Validators.maxLength(500)]),
      author_id : new FormControl(id, []),
      start_date : new FormControl(null,[]),
      deadline : new FormControl(null,[])
    })
  }
}
