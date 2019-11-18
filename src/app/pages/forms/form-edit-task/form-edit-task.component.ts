import { Component, OnInit, Input, Inject } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { User } from '../../../models/users.model';
import { Project, Task } from '../../../models/projects.model';
import { DataService } from '../../../services/data.service';
//import { NavbarService } from 'src/app/services/navbar.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-form-edit-task',
  templateUrl: './form-edit-task.component.html',
  styleUrls: ['./form-edit-task.component.scss']
})

export class FormEditTaskComponent implements OnInit {

  project: Project;
  task: Task;
  editTask: FormGroup;
  emails = []
  memberAssigned;
  memberAssignedAll = [];
  tempUser = [];
  faTrash = faTrash;
  addCheckList;
  otherTemp;

  constructor(
    private _dataService: DataService, 
    public dialogRef: MatDialogRef<FormEditTaskComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  onSubmit(){
    console.log(this.project)
    this.task = this.editTask.value;
    this._dataService.putTaskByProject(this.project._id, this.task);
   }

  addAssignedUser(email) {
    //console.log(email)
    //event.preventDefault()
    if (!(this.checkAssigned(email))) {

      this._dataService.getUserByEmail(email).subscribe((data: User) => {
        //console.log(this.task.assigned)
        this.task.assigned.push({ ...data['users'], avatar_url: data['users'].avatar_url })
        //console.log(this.task.assigned)
      })
    }
  }

  checkAssigned(email) {
    return this.task.assigned.some((el) => {
      return el['email'] === email;
    });
  }

  unnasignedUser(id) {
    event.preventDefault();
    let index = this.task.assigned.indexOf({ user_id: id });
    this.task.assigned.splice(index, 1)
    //console.log(id)
  }

  addToCheckList() {
    //console.log(this.addCheckList);
    this.task.checklist.push({name : this.addCheckList, done : false});
    //console.log(this.task.checklist);
    this.addCheckList = '';
  }

  removeFromChecklist(i){
    event.preventDefault()
    this.task.checklist.splice(i,1)
  }


  deleteTask() {
    event.preventDefault()
    this._dataService.deleteTaskByProject(this.project._id, this.task._id)
  }

  ngOnInit() {
    //const id = localStorage.getItem('current_user');
    // console.log(this.data.project_id)
    // console.log(this.data.task_id)
    this._dataService.getProjectById(this.data.project_id).subscribe((data: Project) => {
      this.project = data['projects'];
      //console.log(this.project.users);
      for (let i = 0; i < this.project.users.length; i++) {
        this._dataService.getUserById(this.project.users[i]._id).subscribe((data: User) => {
          // console.log(data);
          this.emails.push(data['users'].email);
          console.log(this.emails);
        });
      }
      //console.log(this.emails);
    })



    this._dataService.getTaskById(this.data.project_id, this.data.task_id).subscribe((data: Task) => {
      this.task = data;
      this.editTask.setValue(this.task)

      //list all members assigned to the task and stock it in temp table
      for (let i = 0; i < this.task.assigned.length; i++) {
        this.tempUser.push(this.task.assigned[i]);
      }

      // loop on each member
      const names = this.tempUser.map(el => {

        //get his data by id
        this._dataService.getUserById(el.user_id).subscribe(data => {

          //push the data in other temp table
          this.memberAssignedAll.push(`${data['users'].firstname} ${data['users'].lastname}`);
          
        });
        return this.memberAssignedAll;
      });
      
      //otherTemp is used to get value outside dataservice
      this.otherTemp = names[0]; 
    })

    this.editTask = new FormGroup({
      name: new FormControl('', Validators.required),
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
      checklist: new FormControl(null),
      _id: new FormControl()

    });
  }
}
