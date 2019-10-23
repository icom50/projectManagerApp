import { Component, OnInit } from '@angular/core';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-form-create-task',
  templateUrl: './form-create-task.component.html',
  styleUrls: ['./form-create-task.component.scss']
})
export class FormCreateTaskComponent implements OnInit {

  constructor() { }

  getMember(id){
    console.log('get member by id '+id)
    return 'check getMember(id) function ' + (id || 'missing id')
  }
  sendComment(){
    event.preventDefault()
    console.log('send comment')
    this.updateTask()
  }
  updateTask(){
    event.preventDefault()
    console.log('task update')
  }
  addItem(){
    event.preventDefault()
    console.log('add item to checklist')
  }
  addTime(){
    event.preventDefault()
    console.log('add time to the task')
  }
  getTotalTime(){
    return ' check getTotalTime()'
  }
  getUserTime(){
    return 'check getUserTime()'
  }
  ngOnInit() {
  }

}
