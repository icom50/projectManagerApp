import { Component, OnInit, Input, Inject } from '@angular/core';
import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';

import { User } from '../../../models/users.model';
import { Project, Task } from '../../../models/projects.model';
import { DataService } from '../../../services/data.service';
import { NavbarService } from 'src/app/services/navbar.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-form-edit-task',
  templateUrl: './form-edit-task.component.html',
  styleUrls: ['./form-edit-task.component.scss']
})

export class FormEditTaskComponent implements OnInit {

  project: Project;
  task : Task;
  editTask : FormGroup;
  //task: Task{};

  // @Input("user_id") user_id;
  // @Input("project_id") project_id;
  // @Input("task_id") task_id;

  
  id = "5da98631e2dcd109d6ab35db";
  
  // // task = {assigned : [], checklist: [], comments: [], labels : [], attachments : [], _id : this.task_id, total_time: 0, progression : 0, estimated: 0, priority: "none", status: "", deadline: "", name : "", author_id : "", description : ""}
  // // task;
  constructor(private _dataService: DataService, public dialogRef: MatDialogRef<FormEditTaskComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { 
    // @Input("user_id") user_id // <app-form-create-task [user_id]="id" [project_id]="project._id" [task_id]="project.tasks[]._id">
    // @Input("project_id") project_id 
    // @Input("task_id") task_id 
    
  }

  // fillTask(f){
  //   console.log(f)
  //   for (let key in f.value) {
  //     if (f.value[key] && (key != 'assigned') && (key != 'checklist')) this.task[key] = f.value[key]
  //   }
  // }

  //editTask(f){
    //event.preventDefault();
    //this.fillTask(f)
    //console.log(this.task)
    //this._dataService.getProjectById(this.project_id).subscribe((data:Project) =>{
      //this.project = data['projects'];
      //this.project.tasks.splice(this.project.tasks.findIndex(task => task['_id'] === this.task_id ),1,this.task)
      //this._dataService.putProject(this.project).subscribe()
      //this.goBack()
    //})
    // console.log(f.value)
  ///}

  addAssignedUser(id){
    console.log(id)
    event.preventDefault()
    if (id != "Assign a member" && !(this.checkAssigned(id))){

    this._dataService.getUserById(id).subscribe((data:User)=> {
      console.log(this.task.assigned)
      this.task.assigned.push({...data['users'], user_id: data['users']._id})
      console.log(this.task.assigned)
      })
    }
  }

  checkAssigned(id){
    return this.task.assigned.some((el) => {
      return el['user_id'] === id;
    }); 
  }

  unnasignedUser(id){
    event.preventDefault();
    let index = this.task.assigned.indexOf({user_id : id});
    this.task.assigned.splice(index,1)
    console.log(id)
  }

  // addToCheckList(i: NgForm){
  //   event.preventDefault()
  //   //TODO ajouter si '' ou existe déjà, ne pas
  //   let name = i.value
  //   console.log(i.value)
  //   this.task.checklist.push({name, done: false})
  //   // i.controls.value.reset
  // }

  // removeFromChecklist(i){
  //   event.preventDefault()
  //   this.task.checklist.splice(i,1)
  // }

  // goBack(){
  //   event.preventDefault()
  //   console.log('check function goBack() in form-edit-task.component.ts')
  // }

  // deleteTask(){
  //   event.preventDefault()
  //   this._dataService.getProjectById(this.project_id).subscribe((data:Project) =>{
  //     this.project = data['projects'];
  //     this.project.tasks.splice(this.project.tasks.findIndex(task => task['_id'] === this.task_id ),1)
  //     this._dataService.putProject(this.project).subscribe()
  //     this.goBack()
  //   })
  // }

  ngOnInit() {

    // console.log(this.data.project_id)
    // console.log(this.data.task_id)
    this._dataService.getProjectById(this.data.project_id).subscribe((data:Project) =>{
      this.project = data['projects'];
      console.log(this.project);
    })
    this._dataService.getTaskById(this.data.project_id, this.data.task_id).subscribe((data:Task)=>{
      console.log(data);
      this.task = data;
      this.editTask.setValue(this.task)
    })
    this.editTask = new FormGroup({
      name: new FormControl('',Validators.required),
      estimated: new FormControl(),
      deadline: new FormControl(),
      priority: new FormControl(),
      author_id: new FormControl(),
      description: new FormControl(),
      total_time: new FormControl(),
      status: new FormControl(),
      progression: new FormControl(),
      assigned: new FormControl(),
      attachments: new FormControl(),
      labels: new FormControl(),
      comments: new FormControl(),
      checklist: new FormControl(),
      _id: new FormControl()

    });
  }
}
