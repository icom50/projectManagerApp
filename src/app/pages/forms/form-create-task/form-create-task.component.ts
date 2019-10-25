import { Component, OnInit } from '@angular/core';

import { User } from '../../../models/users.model';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-form-create-task',
  templateUrl: './form-create-task.component.html',
  styleUrls: ['./form-create-task.component.scss']
})
export class FormCreateTaskComponent implements OnInit {
  user: User;
  // form: FormGroup;
  project_id:string;
  task_id: string;
  task: any;
  logged:any;
  constructor(private _dataService: DataService, ) { 

  }

  getMember(id) {
    return 'check getMember(id) function ' + (id || 'missing id')
  }
  getUnassignedMembers(id){
    return 'check getUnassignedMembers(id) function ' + (id || 'missing id')
  }
  sendComment() {
    event.preventDefault()
    console.log('send comment')
    // this.updateTask()
  }
  updateTask(f) {
    event.preventDefault()
    let output = f;
    for (let key in f) {
      console.log(key) 
    }

    // console.log('task update')
    // console.log(f)
  }
  addItem() {
    event.preventDefault()
    console.log('add item to checklist')
  }
  addTime() {
    event.preventDefault()
    console.log('add time to the task')
  }
  getTotalTime() {
    return ' check getTotalTime()'
  }
  getUserTime() {
    return 'check getUserTime()'
  }
  updatePriority(){
    // console.log('updatePriority() to '+ this.form['priority'])
  }
  ngOnInit() {
    this.logged = '5dadbfd634f4a93c8c9936c1'
    this._dataService.getTaskById('5dadaeea6bf9623416eb3fc8','5dadaeea6bf9623416eb3fcb').subscribe((data:any)=>{
      this.task = data;
      console.log(' ------- DATA --------')
      console.log(data)
    })
  }

}
