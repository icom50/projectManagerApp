import { Component, OnInit } from '@angular/core';

import { User } from '../../../models/users.model';
import { Project } from '../../../models/projects.model';
import { DataService } from '../../../services/data.service';

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
  constructor(private _dataService: DataService, ) { 

  }

  createTask(f){
    f.value.checklist = this.newTask.checklist
    f.value.assigned = this.newTask.assigned
    console.log(f.value)
  }
  addAssignedUser(id){
    if (id != "Assign a member"){
    let addedUser
    this._dataService.getUserById(id).subscribe((data:User)=> {
      this.newTask.assigned.push({...data['users'], user_id: data['users']._id})
      console.log(this.newTask)
    })
    console.log(addedUser)}
  }
  checkAssigned(id){
    if (this.newTask) {
      return this.newTask.assigned.reduce((next, current)=> {
        if (next === false) return false
        if (current.user_id === id) return false
        return true
      }, true)
    } else {
      return true
    }
  }
  addToCheckList(name){
    console.log(name)
    this.newTask.checklist.push({name, done: false})
  }
  ngOnInit() {
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
