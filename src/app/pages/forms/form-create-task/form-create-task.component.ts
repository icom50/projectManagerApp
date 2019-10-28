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
  totalTime: number;
  user_id = "Fake ID"
  constructor(private _dataService: DataService, ) { 

  }

  getMember(id) {
    return 'check getMember(id) function ' + (id || 'missing id')
  }
  getUnassignedMembers(id){
    return 'check getUnassignedMembers(id) function ' + (id || 'missing id')
  }
  sendComment(nc) {
    event.preventDefault()
    console.log(nc)
    this.task.comments.push({comment: nc, author_id: this.user_id})
    // this.updateTask()
  }
  updateTask() {
    event.preventDefault()
    // let output = f;
    // for (let key in f) {
    //   console.log(key) 
    // }
    console.log(this.task)

    // console.log('task update')
    // console.log(f)
  }
  addItem() {
    event.preventDefault()
    console.log('add item to checklist')
  }
  addTime(time) {
    event.preventDefault()
    time = + time
    if (!isNaN(time)) this.task.assigned.map(user => {if (user.user_id === this.user_id) user.spend += time} );
  }
  getTotalTime() {
    this.totalTime = this.task.assigned.reduce((user, tot) => {tot + user.spend},0) || 0
  }
  getUserTime(id) {
    let output =this.task.assigned.reduce((user,next) => { next + user.spend},0 )
    console.log(output)
    return this.task.assigned.map(user => {if (user.user_id === this.user_id) user.spend} )
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
    // this.getTotalTime()
  }

}
