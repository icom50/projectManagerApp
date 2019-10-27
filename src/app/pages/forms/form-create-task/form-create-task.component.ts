import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { User } from '../../../models/users.model';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-form-create-task',
  templateUrl: './form-create-task.component.html',
  styleUrls: ['./form-create-task.component.scss']
})
export class FormCreateTaskComponent implements OnInit {
  user: User;
  form: FormGroup;
  project_id:string;
  task_id: string;
  task: any;
  logged:any;
  constructor(private _dataService: DataService, ) { }

  getMember(id) {
    return 'check getMember(id) function ' + (id || 'missing id')
  }
  getUnassignedMembers(id){
    return 'check getUnassignedMembers(id) function ' + (id || 'missing id')
  }
  sendComment() {
    event.preventDefault()
    console.log('send comment')
    this.updateTask()
  }
  updateTask() {
    event.preventDefault()
    console.log('task update')
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
    console.log('updatePriority() to '+ this.form['priority'])
  }
  showForm(){
    event.preventDefault();
    console.log(this.task)
  }
  ngOnInit() {
    this._dataService.getTaskById('5dadaeea6bf9623416eb3fc8','5dadaeea6bf9623416eb3fcb').subscribe((data:any)=>{
      this.task = data;
      this.form.setValue = data
      console.log(' DATA --------')
      console.log(data)
      console.log(' this.form ----------')
      console.log(this.form)
    })
    this.logged = '5dadbfd634f4a93c8c9936c1'
    this.form = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      author_id: new FormControl(),
      deadline: new FormControl(),
      progression: new FormControl(),
      estimated: new FormControl(),
      priority: new FormControl(),
      labels: new FormGroup({
        name: new FormControl(),
        color: new FormControl(),
        _id: new FormControl()
      }
      ),
      assigned: new FormGroup(
        {
          user_id: new FormControl(),
          spend: new FormControl(),
          _id: new FormControl()
        }
      ),
      checklist: new FormGroup(
        {
          name: new FormControl(),
          done: new FormControl(),
          _id: new FormControl()
        }
      ),
      attachments: new FormGroup(
        {
          name: new FormControl(),
          description: new FormControl(),
          path: new FormControl(),
          author_id: new FormControl(),
          date: new FormControl(),
          _id: new FormControl()
        }
      ),
      comments: new FormGroup({
        author_id: new FormControl(),
        comment: new FormControl(),
        date: new FormControl(),
        _id: new FormControl()
      }
      ),
      status: new FormControl()
    })
  }

}
