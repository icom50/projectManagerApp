import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { User } from '../../../models/users.model'
import { DataService } from '../../../services/data.service'

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
  constructor(private _dataService: DataService, ) { }

  getMember(id) {
    console.log('get member by id ' + id)
    return 'check getMember(id) function ' + (id || 'missing id')
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
  ngOnInit() {
    this._dataService.getTaskById(this.project_id,this.task_id).subscribe((data:any)=>{
      this.task = data;
    })
    // this.form = new FormGroup({
    //   name: new FormControl(null),
    //   description: new FormControl(null),
    //   author_id: new FormControl(null),
    //   labels: new FormGroup({
    //     name: new FormControl(null),
    //     color: new FormControl(null),
    //     _id: new FormControl(null)
    //   }
    //   ),
    //   assigned: new FormGroup([
    //     {
    //       user_id: new FormControl(null),
    //       spend: new FormControl(null),
    //       _id: new FormControl(null)
    //     }
    //   ]),
    //   checklist: [
    //     {
    //       name: new FormControl(null),
    //       done: new FormControl(null)n,
    //       _id: new FormControl(null)
    //     }
    //   ],
    //   deadline: new FormControl(null),
    //   progression: new FormControl(null),
    //   estimated: new FormControl(null),
    //   priority: new FormControl(null),
    //   attachments: [
    //     {
    //       name: new FormControl(null),
    //       description: new FormControl(null),
    //       path: new FormControl(null),
    //       author_id: new FormControl(null),
    //       date: new FormControl(null),
    //       _id: new FormControl(null)
    //     }
    //   ],
    //   comments: [{
    //     author_id: new FormControl(null),
    //     comment: new FormControl(null),
    //     date: new FormControl(null),
    //     _id: new FormControl(null)
    //   }
    //   ],
    //   status: new FormControl(null)
    // })
  }

}
