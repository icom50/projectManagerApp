import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/projects.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-edit-project',
  templateUrl: './form-edit-project.component.html',
  styleUrls: ['./form-edit-project.component.scss']
})
export class FormEditProjectComponent implements OnInit {

  project : Project;
  editProject : FormGroup;

  constructor(private _dataService : DataService, private router : Router, private fb : FormBuilder) {
  
   }

  ngOnInit() {
    const id = "5db6e373a7939124125896ba";
    this._dataService.getProjectById(id).subscribe((data : Project)=>{
      this.project = data['projects'];
    })

    this.editProject = this.fb.group({
      status : ['', Validators.required],
      is_private : ['', Validators.required]
    })
  }
}

