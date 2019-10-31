import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import { User } from '../../../models/users.model';
import { Project } from '../../../models/projects.model';
import { DataService } from '../../../services/data.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-form-create-task',
  templateUrl: './form-create-task.component.html',
  styleUrls: ['./form-create-task.component.scss']
})
export class FormCreateTaskComponent implements OnInit {
  user: User;
  users: User[];
  project: Project;
  newTask = {assigned : [], checklist: []}
  user_id = "5dada94a26a3f42e962c215a";
  project_id = "5db6b138fc2046172f2b0c56";
  constructor(private _dataService: DataService, private nav : NavbarService ) { 
    // @Input("user_id") user_id // <app-form-create-task [user_id]="id" [project_id]="project._id">
    // @Input("project_id") project_id 
  }

   createTask(f){
    event.preventDefault()
    f.value.checklist = this.newTask.checklist
    f.value.assigned = this.newTask.assigned
    // Update the project before saving for not erasing new datas
    console.log(this.project.tasks)
    this._dataService.getProjectById(this.project_id).subscribe((data:Project) =>{
      this.project = data['projects'];
      this.project.tasks.push(f.value)
      this._dataService.putProject(this.project).subscribe()
    })
    

  }
  addAssignedUser(id){
    event.preventDefault()
    if (id != "Assign a member" && !(this.checkAssigned(id))){
    this._dataService.getUserById(id).subscribe((data:User)=> {
      this.newTask.assigned.push({...data['users'], user_id: data['users']._id})
      console.log(this.newTask)
    })}
  }
  checkAssigned(id){
    return this.newTask.assigned.some((el) => {
      return el.user_id === id;
    }); 
  }
  addToCheckList(i: NgForm){
    event.preventDefault()
    let name = i.value
    console.log(i.value)
    this.newTask.checklist.push({name, done: false})
    // i.controls.value.reset
  }
  ngOnInit() {
    this.nav.hide();
    this._dataService.getProjectById(this.project_id).subscribe((data:Project) =>{
      this.project = data['projects'];
      console.log(this.project)
    })
    this._dataService.getUsersByProject(this.project_id).subscribe((data:User[]) =>{
      this.users = data;
      console.log(this.users)
    })
  }
}
